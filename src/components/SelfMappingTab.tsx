import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Check, 
  CheckCircle2, 
  Plus, 
  HelpCircle, 
  Beef, 
  Stethoscope, 
  UtensilsCrossed, 
  Building2, 
  Users, 
  FlaskConical, 
  GraduationCap, 
  Share2, 
  Code, 
  Wrench, 
  ChefHat, 
  Calculator, 
  Briefcase, 
  Flame, 
  Heart, 
  BookOpen, 
  Target, 
  Lightbulb, 
  Layers, 
  AlertCircle 
} from 'lucide-react';
import { SelfMappingData, CareerItem, StudentProfile } from '../types';
import { 
  matchCareers, 
  PRESET_PRODUCTIVE_SUBJECTS, 
  COMMON_POTENTIALS, 
  COMMON_INTERESTS, 
  CAREER_DATABASE 
} from '../data/careerDatabase';

interface SelfMappingTabProps {
  mapping: SelfMappingData;
  setMapping: React.Dispatch<React.SetStateAction<SelfMappingData>>;
  student: StudentProfile;
  onGoToReflection: () => void;
  onBackToMaterials: () => void;
  step: number;
  setStep: (step: number) => void;
}

export const SelfMappingTab: React.FC<SelfMappingTabProps> = ({
  mapping,
  setMapping,
  student,
  onGoToReflection,
  onBackToMaterials,
  step,
  setStep
}) => {
  // Preset selector mode
  const [selectedSubjectCategory, setSelectedSubjectCategory] = useState<string>('ATR');

  // Trigger matching whenever step 1 inputs change or when entering step 2
  useEffect(() => {
    const matched = matchCareers(
      mapping.potentials,
      mapping.interests,
      mapping.productiveSubjects,
      student.major || mapping.customMajor
    );
    setMapping(prev => ({ ...prev, matchedCareers: matched }));
  }, [mapping.potentials, mapping.interests, mapping.productiveSubjects, student.major, mapping.customMajor]);

  const handlePotentialChange = (index: number, value: string) => {
    const next: [string, string, string] = [mapping.potentials[0], mapping.potentials[1], mapping.potentials[2]];
    next[index] = value;
    setMapping(prev => ({ ...prev, potentials: next }));
  };

  const handleInterestChange = (index: number, value: string) => {
    const next: [string, string, string] = [mapping.interests[0], mapping.interests[1], mapping.interests[2]];
    next[index] = value;
    setMapping(prev => ({ ...prev, interests: next }));
  };

  const handleSubjectChange = (index: number, value: string) => {
    const next: [string, string, string] = [mapping.productiveSubjects[0], mapping.productiveSubjects[1], mapping.productiveSubjects[2]];
    next[index] = value;
    setMapping(prev => ({ ...prev, productiveSubjects: next }));
  };

  const toggleSelectCareer = (career: CareerItem) => {
    const exists = mapping.selectedCareers.some(c => c.id === career.id);
    if (exists) {
      setMapping(prev => ({
        ...prev,
        selectedCareers: prev.selectedCareers.filter(c => c.id !== career.id)
      }));
    } else {
      if (mapping.selectedCareers.length >= 2) {
        // Max 2 selected
        const next = [mapping.selectedCareers[1], career];
        setMapping(prev => ({ ...prev, selectedCareers: next }));
      } else {
        setMapping(prev => ({
          ...prev,
          selectedCareers: [...prev.selectedCareers, career]
        }));
      }
    }
  };

  const renderCareerIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-emerald-600" };
    switch (iconName) {
      case 'Beef': return <Beef {...props} />;
      case 'Stethoscope': return <Stethoscope {...props} className="w-5 h-5 text-teal-600" />;
      case 'UtensilsCrossed': return <UtensilsCrossed {...props} className="w-5 h-5 text-amber-600" />;
      case 'Building2': return <Building2 {...props} className="w-5 h-5 text-blue-600" />;
      case 'Users': return <Users {...props} className="w-5 h-5 text-indigo-600" />;
      case 'FlaskConical': return <FlaskConical {...props} className="w-5 h-5 text-purple-600" />;
      case 'GraduationCap': return <GraduationCap {...props} className="w-5 h-5 text-violet-600" />;
      case 'Share2': return <Share2 {...props} className="w-5 h-5 text-rose-600" />;
      case 'Code': return <Code {...props} className="w-5 h-5 text-cyan-600" />;
      case 'Wrench': return <Wrench {...props} className="w-5 h-5 text-amber-600" />;
      case 'ChefHat': return <ChefHat {...props} className="w-5 h-5 text-orange-600" />;
      case 'Calculator': return <Calculator {...props} className="w-5 h-5 text-emerald-600" />;
      default: return <Briefcase {...props} />;
    }
  };

  // Step 1 Validation
  const isStep1Valid = 
    mapping.potentials.some(p => p.trim().length > 0) &&
    mapping.interests.some(i => i.trim().length > 0) &&
    mapping.productiveSubjects.some(s => s.trim().length > 0);

  // Step 2 Validation
  const isStep2Valid = mapping.selectedCareers.length > 0;

  // Step 3 Validation
  const isStep3Valid = mapping.gapAnalysis.trim().length > 5;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Wizard Steps Indicator */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between max-w-2xl mx-auto relative">
          
          {/* Step connecting bar */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-100 -z-0">
            <div 
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
            />
          </div>

          {/* Step 1 */}
          <button
            onClick={() => setStep(1)}
            className="relative z-10 flex flex-col items-center gap-1.5 focus:outline-hidden group"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              step === 1 
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-sm'
                : step > 1 
                ? 'bg-emerald-500 text-white' 
                : 'bg-slate-200 text-slate-600'
            }`}>
              {step > 1 ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <span className={`text-xs font-semibold ${step === 1 ? 'text-emerald-700' : 'text-slate-500'}`}>
              Input Potensi Diri
            </span>
          </button>

          {/* Step 2 */}
          <button
            onClick={() => { if (isStep1Valid) setStep(2); }}
            className="relative z-10 flex flex-col items-center gap-1.5 focus:outline-hidden group"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              step === 2 
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-sm'
                : step > 2 
                ? 'bg-emerald-500 text-white' 
                : 'bg-slate-200 text-slate-600'
            }`}>
              {step > 2 ? <Check className="w-5 h-5" /> : '2'}
            </div>
            <span className={`text-xs font-semibold ${step === 2 ? 'text-emerald-700' : 'text-slate-500'}`}>
              Pencocokan Profesi
            </span>
          </button>

          {/* Step 3 */}
          <button
            onClick={() => { if (isStep1Valid && isStep2Valid) setStep(3); }}
            className="relative z-10 flex flex-col items-center gap-1.5 focus:outline-hidden group"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              step === 3 
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-sm'
                : 'bg-slate-200 text-slate-600'
            }`}>
              3
            </div>
            <span className={`text-xs font-semibold ${step === 3 ? 'text-emerald-700' : 'text-slate-500'}`}>
              Analisis Kesenjangan
            </span>
          </button>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: INPUT POTENSI DIRI */}
      {/* ========================================================================= */}
      {step === 1 && (
        <div className="space-y-6">
          
          <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white p-6 sm:p-7 rounded-2xl shadow-xs">
            <h3 className="font-display text-xl sm:text-2xl font-bold">
              Langkah 1: Kenali dan Input Potensi Dirimu
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1">
              Isi 3 bakat/kemampuan menonjol, 3 minat yang paling kamu sukai, dan 3 mata pelajaran produktif dengan nilai terbaikmu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Box 1: 3 Kemampuan / Bakat */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                      3 Kemampuan / Bakat
                    </h4>
                    <p className="text-[11px] text-slate-500">Hal yang paling kamu kuasai</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md">
                  Wajib 3
                </span>
              </div>

              <div className="space-y-3">
                {[0, 1, 2].map((idx) => (
                  <div key={idx} className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                      <span>Bakat #{idx + 1}</span>
                    </label>
                    <input
                      type="text"
                      id={`input-potential-${idx}`}
                      value={mapping.potentials[idx]}
                      onChange={(e) => handlePotentialChange(idx, e.target.value)}
                      placeholder={
                        idx === 0 ? 'Contoh: Telaten merawat hewan ternak' :
                        idx === 1 ? 'Contoh: Komunikasi & negosiasi' :
                        'Contoh: Meracik pakan fermentasi'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs sm:text-sm bg-slate-50/60 focus:bg-white transition-all outline-hidden"
                    />
                  </div>
                ))}
              </div>

              {/* Suggestions chips */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-[11px] text-slate-500 font-medium mb-1.5 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3 text-amber-500" />
                  <span>Contoh pilihan cepat (klik untuk isi):</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_POTENTIALS.slice(0, 4).map((cp, cIdx) => (
                    <button
                      key={cIdx}
                      type="button"
                      onClick={() => {
                        const emptyIdx = mapping.potentials.findIndex(p => !p.trim());
                        if (emptyIdx !== -1) handlePotentialChange(emptyIdx, cp);
                        else handlePotentialChange(0, cp);
                      }}
                      className="text-[10px] px-2 py-1 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-600 rounded-md border border-slate-200/80 transition-colors text-left"
                    >
                      + {cp}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Box 2: 3 Minat yang Disukai */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                      3 Minat yang Disukai
                    </h4>
                    <p className="text-[11px] text-slate-500">Hal yang kamu gemari</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-50 text-rose-700 rounded-md">
                  Wajib 3
                </span>
              </div>

              <div className="space-y-3">
                {[0, 1, 2].map((idx) => (
                  <div key={idx} className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                      <span>Minat #{idx + 1}</span>
                    </label>
                    <input
                      type="text"
                      id={`input-interest-${idx}`}
                      value={mapping.interests[idx]}
                      onChange={(e) => handleInterestChange(idx, e.target.value)}
                      placeholder={
                        idx === 0 ? 'Contoh: Beternak ruminansia modern' :
                        idx === 1 ? 'Contoh: Membuka usaha breeding kambing' :
                        'Contoh: Kesehatan hewan & kedokteran'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-xs sm:text-sm bg-slate-50/60 focus:bg-white transition-all outline-hidden"
                    />
                  </div>
                ))}
              </div>

              {/* Suggestions chips */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-[11px] text-slate-500 font-medium mb-1.5 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3 text-amber-500" />
                  <span>Contoh pilihan cepat (klik untuk isi):</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_INTERESTS.slice(0, 4).map((ci, cIdx) => (
                    <button
                      key={cIdx}
                      type="button"
                      onClick={() => {
                        const emptyIdx = mapping.interests.findIndex(i => !i.trim());
                        if (emptyIdx !== -1) handleInterestChange(emptyIdx, ci);
                        else handleInterestChange(0, ci);
                      }}
                      className="text-[10px] px-2 py-1 bg-slate-100 hover:bg-rose-100 hover:text-rose-800 text-slate-600 rounded-md border border-slate-200/80 transition-colors text-left"
                    >
                      + {ci}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Box 3: 3 Mapel Produktif Terbaik */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                      3 Mapel Produktif
                    </h4>
                    <p className="text-[11px] text-slate-500">Mata pelajaran nilai terbaik</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-teal-50 text-teal-700 rounded-md">
                  Fleksibel
                </span>
              </div>

              {/* Jurusan Preset Selector */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-500">
                  Preset Jurusan (Pilih untuk opsi cepat):
                </label>
                <select
                  value={selectedSubjectCategory}
                  onChange={(e) => setSelectedSubjectCategory(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-hidden"
                >
                  <option value="ATR">Agribisnis Ternak Ruminansia / Unggas (ATR/ATU)</option>
                  <option value="TKJ_RPL">TKJ / RPL / Rekayasa Perangkat Lunak</option>
                  <option value="OTOMOTIF">Teknik Kendaraan Ringan (Otomotif)</option>
                  <option value="BISNIS">Bisnis Daring & Pemasaran / Manajemen</option>
                  <option value="TATA_BOGA">Tata Boga / Kuliner</option>
                </select>
              </div>

              <div className="space-y-3 pt-1">
                {[0, 1, 2].map((idx) => (
                  <div key={idx} className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                      <span>Mapel #{idx + 1}</span>
                    </label>
                    <input
                      type="text"
                      id={`input-subject-${idx}`}
                      value={mapping.productiveSubjects[idx]}
                      onChange={(e) => handleSubjectChange(idx, e.target.value)}
                      placeholder="Ketik mapel produktifmu..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-xs sm:text-sm bg-slate-50/60 focus:bg-white transition-all outline-hidden"
                    />
                  </div>
                ))}
              </div>

              {/* Quick Presets based on selected department */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-[11px] text-slate-500 font-medium mb-1.5 flex items-center gap-1">
                  <Plus className="w-3 h-3 text-teal-600" />
                  <span>Pilih dari kurikulum jurusan:</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(PRESET_PRODUCTIVE_SUBJECTS[selectedSubjectCategory as keyof typeof PRESET_PRODUCTIVE_SUBJECTS] || []).slice(0, 3).map((sub, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => {
                        const emptyIdx = mapping.productiveSubjects.findIndex(s => !s.trim());
                        if (emptyIdx !== -1) handleSubjectChange(emptyIdx, sub);
                        else handleSubjectChange(0, sub);
                      }}
                      className="text-[10px] px-2 py-1 bg-slate-100 hover:bg-teal-100 hover:text-teal-800 text-slate-600 rounded-md border border-slate-200/80 transition-colors text-left"
                    >
                      + {sub}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Navigation Step 1 */}
          <div className="flex items-center justify-between pt-4">
            <button
              id="btn-back-step1"
              onClick={onBackToMaterials}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Materi</span>
            </button>

            <button
              id="btn-next-to-step2"
              disabled={!isStep1Valid}
              onClick={() => setStep(2)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md ${
                isStep1Valid
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-700/20 hover:shadow-lg transform hover:-translate-y-0.5'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <span>Lanjut ke Pencocokan Profesi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: PENCOCOKAN DENGAN PELUANG KARIR */}
      {/* ========================================================================= */}
      {step === 2 && (
        <div className="space-y-6">
          
          <div className="bg-gradient-to-r from-teal-700 to-cyan-700 text-white p-6 sm:p-7 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  Langkah 2: Pencocokan dengan Peluang Karir
                </h3>
                <p className="text-teal-100 text-xs sm:text-sm mt-1">
                  Berdasarkan input potensimu, berikut 5-8 peluang karir yang paling cocok. <span className="text-amber-200 font-bold underline">Pilih 1 atau 2 profesi</span> yang paling menarik minatmu!
                </p>
              </div>
              <div className="px-3.5 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/30">
                Terpilih: {mapping.selectedCareers.length} / 2 Profesi
              </div>
            </div>
          </div>

          {/* Matched Careers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {mapping.matchedCareers.map((career) => {
              const isSelected = mapping.selectedCareers.some(c => c.id === career.id);
              return (
                <div
                  key={career.id}
                  id={`career-card-${career.id}`}
                  onClick={() => toggleSelectCareer(career)}
                  className={`cursor-pointer rounded-2xl p-5 sm:p-6 border transition-all duration-200 relative flex flex-col justify-between select-none ${
                    isSelected
                      ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-400/50 shadow-md'
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-xs'
                  }`}
                >
                  
                  {/* Selected Indicator Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-emerald-600 text-white shadow-xs' 
                        : 'border-2 border-slate-300 bg-white hover:border-emerald-400'
                    }`}>
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="space-y-3 pr-8">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                        {renderCareerIcon(career.iconName)}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          {career.sector}
                        </span>
                        <h4 className="font-display font-bold text-slate-800 text-base sm:text-lg leading-snug">
                          {career.title}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {career.description}
                    </p>

                    {/* Matched Reasons Tags */}
                    {career.matchReasons && career.matchReasons.length > 0 && (
                      <div className="bg-slate-100/80 p-2.5 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          Alasan Cocok dengan Potensimu:
                        </span>
                        <ul className="text-[11px] text-slate-600 list-disc list-inside space-y-0.5">
                          {career.matchReasons.map((r, rIdx) => (
                            <li key={rIdx} className="truncate">{r}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Skills Required */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        Keahlian Kunci:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {career.requiredSkills.map((sk, sIdx) => (
                          <span 
                            key={sIdx}
                            className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200/60"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Stats & BMW Paths */}
                  <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between flex-wrap gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-500">Jalur:</span>
                      {career.suitablePaths.map((p, pIdx) => (
                        <span 
                          key={pIdx}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            p === 'Bekerja' ? 'bg-emerald-100 text-emerald-800' :
                            p === 'Kuliah' ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    <span className="text-[11px] font-semibold text-slate-700">
                      {career.salaryOrIncomeEstimate}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Prompt if no career selected */}
          {mapping.selectedCareers.length === 0 && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-2.5 text-amber-900 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Silakan klik pada 1 atau 2 kartu profesi di atas untuk memilih profesi idamanmu sebelum lanjut ke Langkah 3.</span>
            </div>
          )}

          {/* Navigation Step 2 */}
          <div className="flex items-center justify-between pt-4">
            <button
              id="btn-back-step2"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Langkah 1</span>
            </button>

            <button
              id="btn-next-to-step3"
              disabled={!isStep2Valid}
              onClick={() => setStep(3)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md ${
                isStep2Valid
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-700/20 hover:shadow-lg transform hover:-translate-y-0.5'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <span>Lanjut ke Analisis Kesenjangan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: ANALISIS KESENJANGAN (GAP ANALYSIS) & VISUAL ROADMAP */}
      {/* ========================================================================= */}
      {step === 3 && (
        <div className="space-y-6">
          
          <div className="bg-gradient-to-r from-cyan-800 via-teal-700 to-emerald-700 text-white p-6 sm:p-7 rounded-2xl shadow-xs">
            <h3 className="font-display text-xl sm:text-2xl font-bold">
              Langkah 3: Analisis Kesenjangan (Gap Analysis)
            </h3>
            <p className="text-cyan-100 text-xs sm:text-sm mt-1">
              Evaluasi kesiapanmu: identifikasi apa saja skill, pengetahuan, atau sertifikasi yang masih perlu kamu kembangkan agar siap meraih profesi pilihanmu.
            </p>
          </div>

          {/* Visual Summary Card: Potensi -> Profesi -> Kesiapan */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <h4 className="font-display font-bold text-slate-800 text-base flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              Peta Visual Ringkasan Pemetaan Dirimu
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              
              {/* Box 1: Potensi Diri */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <Flame className="w-4 h-4 text-emerald-600" />
                  <span>1. Potensi Diri Kamu</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <p className="font-semibold text-emerald-950">Bakat & Kemampuan:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600">
                    {mapping.potentials.filter(Boolean).map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                  <p className="font-semibold text-emerald-950 pt-1">Minat Utama:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600">
                    {mapping.interests.filter(Boolean).map((int, i) => <li key={i}>{int}</li>)}
                  </ul>
                </div>
              </div>

              {/* Box 2: Profesi Pilihan */}
              <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-800">
                  <Target className="w-4 h-4 text-teal-600" />
                  <span>2. Profesi Pilihan</span>
                </div>
                <div className="space-y-2">
                  {mapping.selectedCareers.map((c, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white border border-teal-100 shadow-2xs">
                      <h5 className="font-bold text-xs text-slate-800">{c.title}</h5>
                      <p className="text-[10px] text-slate-500 truncate">{c.sector}</p>
                      <div className="flex gap-1 mt-1">
                        {c.suitablePaths.map((p, pIdx) => (
                          <span key={pIdx} className="text-[9px] px-1.5 py-0.2 bg-teal-100 text-teal-800 rounded font-semibold">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 3: Gap Analysis Preview */}
              <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-800">
                  <Sparkles className="w-4 h-4 text-cyan-600" />
                  <span>3. Hal yang Perlu Dikembangkan</span>
                </div>
                <p className="text-xs text-slate-600 italic">
                  {mapping.gapAnalysis || '(Tuliskan rencana pengembangan dirimu di kolom bawah)'}
                </p>
              </div>

            </div>
          </div>

          {/* Gap Analysis Form Input */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <label htmlFor="input-gap-analysis" className="font-display font-bold text-slate-800 text-base block">
                  Menurutmu, apa yang masih perlu kamu kembangkan agar lebih siap menuju profesi pilihanmu? <span className="text-rose-500">*</span>
                </label>
                <p className="text-xs text-slate-500">
                  Contoh: Meningkatkan kemampuan formulasi pakan konsentrat, belajar pembukuan modal usaha, memperkuat nilai rapor untuk SNBP, atau melatih mental berbicara di depan umum.
                </p>
              </div>
            </div>

            <textarea
              id="input-gap-analysis"
              rows={4}
              value={mapping.gapAnalysis}
              onChange={(e) => setMapping(prev => ({ ...prev, gapAnalysis: e.target.value }))}
              placeholder="Tuliskan hal-hal yang perlu kamu kembangkan dan persiapkan di sini..."
              className="w-full p-4 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs sm:text-sm bg-slate-50/50 focus:bg-white transition-all outline-hidden resize-y"
            />
          </div>

          {/* Navigation Step 3 */}
          <div className="flex items-center justify-between pt-4">
            <button
              id="btn-back-step3"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Langkah 2</span>
            </button>

            <button
              id="btn-next-to-reflection"
              disabled={!isStep3Valid}
              onClick={onGoToReflection}
              className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md ${
                isStep3Valid
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-700/20 hover:shadow-lg transform hover:-translate-y-0.5'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <span>Lanjut ke Menu Refleksi & Asesmen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
