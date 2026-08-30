import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeTab } from './components/HomeTab';
import { MaterialsTab } from './components/MaterialsTab';
import { SelfMappingTab } from './components/SelfMappingTab';
import { ReflectionTab } from './components/ReflectionTab';
import { SummaryResultModal } from './components/SummaryResultModal';
import { TeacherDashboardModal } from './components/TeacherDashboardModal';
import { TeacherLoginModal } from './components/TeacherLoginModal';
import { ShareStudentModal } from './components/ShareStudentModal';
import { ClassGuidanceModal } from './components/ClassGuidanceModal';
import { 
  StudentProfile, 
  SelfMappingData, 
  ReflectionData, 
  AssessmentSubmission 
} from './types';
import { 
  StorageService, 
  INITIAL_STUDENT_PROFILE, 
  INITIAL_MAPPING_DATA, 
  INITIAL_REFLECTION_DATA, 
  subscribeToSubmissions 
} from './services/storageService';
import { Compass, Sparkles, Heart, School, HelpCircle, Lock, QrCode } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'materials' | 'mapping' | 'reflection'>('home');
  const [mappingStep, setMappingStep] = useState<number>(1);

  // Core Data States
  const [student, setStudent] = useState<StudentProfile>(() => {
    const draft = StorageService.getCurrentDraft();
    return draft?.student || INITIAL_STUDENT_PROFILE;
  });

  const [mapping, setMapping] = useState<SelfMappingData>(() => {
    const draft = StorageService.getCurrentDraft();
    return draft?.mapping || INITIAL_MAPPING_DATA;
  });

  const [reflection, setReflection] = useState<ReflectionData>(() => {
    const draft = StorageService.getCurrentDraft();
    return draft?.reflection || INITIAL_REFLECTION_DATA;
  });

  // Modal & Global Submissions States
  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>(() => StorageService.getSubmissions());
  const [activeSubmissionResult, setActiveSubmissionResult] = useState<AssessmentSubmission | null>(null);
  
  // Teacher Authentication & Portal States
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('peta_karirku_teacher_auth') === 'true';
    }
    return false;
  });
  const [isTeacherLoginOpen, setIsTeacherLoginOpen] = useState<boolean>(false);
  const [isTeacherDashboardOpen, setIsTeacherDashboardOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isGuidanceOpen, setIsGuidanceOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Read URL query parameters on initial mount (e.g. ?kelas=XI+AT+3)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const classParam = params.get('kelas') || params.get('class');
        if (classParam) {
          setStudent(prev => ({
            ...prev,
            className: classParam
          }));
        }
      } catch (err) {
        console.error('Error parsing URL params:', err);
      }
    }
  }, []);

  // Sync with Cloud & Local storage subscriptions
  useEffect(() => {
    const unsubscribe = subscribeToSubmissions(() => {
      setSubmissions(StorageService.getSubmissions());
    });
    return () => unsubscribe();
  }, []);

  // Save current progress to session draft automatically
  useEffect(() => {
    StorageService.saveCurrentDraft({
      student,
      mapping,
      reflection,
      activeTab,
      mappingStep
    });
  }, [student, mapping, reflection, activeTab, mappingStep]);

  // Gatekeeper for opening teacher dashboard
  const handleTriggerTeacherPortal = () => {
    if (isTeacherAuthenticated) {
      setIsTeacherDashboardOpen(true);
    } else {
      setIsTeacherLoginOpen(true);
    }
  };

  const handleTeacherLoginSuccess = () => {
    setIsTeacherAuthenticated(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('peta_karirku_teacher_auth', 'true');
    }
    setIsTeacherLoginOpen(false);
    setIsTeacherDashboardOpen(true);
  };

  const handleTeacherLogout = () => {
    setIsTeacherAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('peta_karirku_teacher_auth');
    }
    setIsTeacherDashboardOpen(false);
  };

  // Handle saving reflection and generating official submission
  const handleSaveAndShowSummary = async () => {
    setIsSaving(true);
    try {
      const saved = await StorageService.saveSubmission({
        student: {
          ...student,
          name: student.name || 'Siswa SMK',
          className: student.className || 'XI AT 3',
          school: student.school || 'SMK N 1 Nanggulan'
        },
        mapping,
        reflection
      });
      setActiveSubmissionResult(saved);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStartFromHome = () => {
    setActiveTab('materials');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToMapping = () => {
    setActiveTab('mapping');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToReflection = () => {
    setActiveTab('reflection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Top Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        student={student}
        submissionsCount={submissions.length}
        isTeacherAuthenticated={isTeacherAuthenticated}
        onOpenTeacherDashboard={handleTriggerTeacherPortal}
        onOpenGuidance={() => setIsGuidanceOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      {/* Main App Content View Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && (
          <HomeTab
            onStart={handleStartFromHome}
            onGoToMapping={handleGoToMapping}
            student={student}
            setStudent={setStudent}
            onOpenShareModal={() => setIsShareModalOpen(true)}
          />
        )}

        {activeTab === 'materials' && (
          <MaterialsTab
            onGoToMapping={handleGoToMapping}
          />
        )}

        {activeTab === 'mapping' && (
          <SelfMappingTab
            mapping={mapping}
            setMapping={setMapping}
            student={student}
            onGoToReflection={handleGoToReflection}
            onBackToMaterials={() => setActiveTab('materials')}
            step={mappingStep}
            setStep={setMappingStep}
          />
        )}

        {activeTab === 'reflection' && (
          <ReflectionTab
            reflection={reflection}
            setReflection={setReflection}
            mapping={mapping}
            student={student}
            onBackToMapping={() => setActiveTab('mapping')}
            onSaveAndShowSummary={handleSaveAndShowSummary}
            isSaving={isSaving}
          />
        )}
      </main>

      {/* Footer Branding & Copyright (No Print) */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px]">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-slate-700">Peta Karirku • BK SMK</span>
            </div>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="text-slate-600 font-medium">
              Dibuat oleh <strong className="text-emerald-800 font-bold">Mahasiswa BK : Rama Abdillah</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="text-emerald-700 hover:underline font-semibold inline-flex items-center gap-1"
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-600" />
              <span>Barcode Siswa</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setIsGuidanceOpen(true)}
              className="text-emerald-700 hover:underline font-medium"
            >
              Panduan RPL BK
            </button>
            <span>•</span>
            <button
              onClick={handleTriggerTeacherPortal}
              className="text-emerald-700 hover:underline font-medium inline-flex items-center gap-1"
            >
              {!isTeacherAuthenticated && <Lock className="w-3 h-3 text-amber-600" />}
              <span>Portal Guru ({submissions.length})</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Summary Result / LKPD Certificate Modal */}
      {activeSubmissionResult && (
        <SummaryResultModal
          submission={activeSubmissionResult}
          onClose={() => setActiveSubmissionResult(null)}
          onEditAgain={() => {
            setActiveSubmissionResult(null);
            setActiveTab('reflection');
          }}
        />
      )}

      {/* Teacher Login Security Gate Modal */}
      <TeacherLoginModal
        isOpen={isTeacherLoginOpen}
        onClose={() => setIsTeacherLoginOpen(false)}
        onLoginSuccess={handleTeacherLoginSuccess}
      />

      {/* Teacher Dashboard & Google Spreadsheet Hub Modal */}
      <TeacherDashboardModal
        isOpen={isTeacherDashboardOpen}
        onClose={() => setIsTeacherDashboardOpen(false)}
        submissions={submissions}
        onViewStudentSubmission={(sub) => {
          setIsTeacherDashboardOpen(false);
          setActiveSubmissionResult(sub);
        }}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onLogout={handleTeacherLogout}
      />

      {/* Barcode & Shareable Link Modal for Students */}
      <ShareStudentModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        defaultClass={student.className || 'XI AT 3'}
      />

      {/* Class Operational Guidance Modal */}
      <ClassGuidanceModal
        isOpen={isGuidanceOpen}
        onClose={() => setIsGuidanceOpen(false)}
      />

    </div>
  );
}
