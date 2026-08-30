import React from 'react';
import { Compass, BookOpen, UserCheck, Sparkles, LayoutDashboard, HelpCircle, School, QrCode, Lock } from 'lucide-react';
import { StudentProfile } from '../types';

interface NavbarProps {
  activeTab: 'home' | 'materials' | 'mapping' | 'reflection';
  setActiveTab: (tab: 'home' | 'materials' | 'mapping' | 'reflection') => void;
  student: StudentProfile;
  submissionsCount: number;
  isTeacherAuthenticated?: boolean;
  onOpenTeacherDashboard: () => void;
  onOpenGuidance: () => void;
  onOpenShareModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  student,
  submissionsCount,
  isTeacherAuthenticated = false,
  onOpenTeacherDashboard,
  onOpenGuidance,
  onOpenShareModal
}) => {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Compass, badge: null },
    { id: 'materials', label: 'Materi BK', icon: BookOpen, badge: '3 Modul' },
    { id: 'mapping', label: 'Pemetaan Diri', icon: UserCheck, badge: 'Inti' },
    { id: 'reflection', label: 'Refleksi', icon: Sparkles, badge: 'Asesmen' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Logo & School Branding */}
          <div 
            id="brand-header"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-200 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-800 group-hover:text-emerald-700 transition-colors">
                  Peta Karirku
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full">
                  BK SMK
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                Bimbingan Klasikal • Identifikasi Karir & Cita-Cita
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/70" aria-label="Navigasi Utama">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 select-none ${
                    isActive
                      ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Student Profile Quick Badge */}
            {student.name && (
              <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-emerald-50/80 border border-emerald-200/60 rounded-lg text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-semibold text-emerald-900 truncate max-w-[130px]">
                  {student.name}
                </span>
                <span className="text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded font-mono text-[10px]">
                  {student.className || 'XI'}
                </span>
              </div>
            )}

            {/* Guidance Button */}
            <button
              id="btn-guidance"
              onClick={onOpenGuidance}
              title="Panduan Layanan BK"
              className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors border border-transparent hover:border-emerald-200"
            >
              <HelpCircle className="w-5 h-5" />
            </button>

            {/* Share / Barcode Siswa Button */}
            <button
              id="btn-nav-share-barcode"
              onClick={onOpenShareModal}
              title="Tampilkan Barcode & Link untuk Siswa"
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-2xs"
            >
              <QrCode className="w-4 h-4 text-emerald-600" />
              <span className="hidden md:inline">Barcode Siswa</span>
            </button>

            {/* Teacher Dashboard Trigger */}
            <button
              id="btn-teacher-dashboard"
              onClick={onOpenTeacherDashboard}
              title={isTeacherAuthenticated ? 'Buka Portal Guru BK (Terautentikasi)' : 'Akses Terbatas: Login Guru BK'}
              className="flex items-center gap-2 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs shadow-emerald-700/20 transition-all duration-200 active:scale-95"
            >
              {isTeacherAuthenticated ? (
                <LayoutDashboard className="w-4 h-4 text-emerald-100" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-amber-300" />
              )}
              <span className="hidden sm:inline">Portal Guru BK</span>
              <span className="sm:hidden">Guru BK</span>
              {submissionsCount > 0 && (
                <span className="bg-emerald-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {submissionsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-slate-100 gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 flex flex-col items-center py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50/80 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
