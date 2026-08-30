import React, { useState } from 'react';
import { 
  ChevronDown, 
  ArrowRight, 
  Sparkles, 
  Brain, 
  Flame, 
  Heart, 
  UserCheck, 
  Home, 
  GraduationCap, 
  TrendingUp, 
  Briefcase, 
  BookOpen, 
  Rocket, 
  Compass, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import { LEARNING_MATERIALS, MaterialSection } from '../data/learningMaterials';

interface MaterialsTabProps {
  onGoToMapping: () => void;
}

export const MaterialsTab: React.FC<MaterialsTabProps> = ({ onGoToMapping }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'kenal-diri': true,
    'faktor-pengaruh': true,
    'arah-kelulusan': true
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getPointIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5 text-emerald-600" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-500" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-500" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-blue-600" />;
      case 'Home': return <Home className="w-5 h-5 text-purple-600" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-teal-600" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-indigo-600" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-emerald-600" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-blue-600" />;
      case 'Rocket': return <Rocket className="w-6 h-6 text-amber-500" />;
      default: return <Sparkles className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-semibold backdrop-blur-sm">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Modul Bimbingan Klasikal</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Materi: Identifikasi Pilihan Karir & Cita-Cita
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Klik dan pelajari 3 pokok materi di bawah ini sebelum kamu mengisi lembar pemetaan diri. Pahami potensimu untuk masa depan yang gemilang!
          </p>
        </div>
      </div>

      {/* Accordion / Cards List */}
      <div className="space-y-5">
        {LEARNING_MATERIALS.map((section, idx) => {
          const isOpen = !!openSections[section.id];
          return (
            <div
              key={section.id}
              id={`card-material-${section.id}`}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all duration-200"
            >
              {/* Card Header (Clickable Accordion) */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 bg-white hover:bg-slate-50/80 transition-colors focus:outline-hidden"
              >
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-bold text-slate-800 text-base sm:text-lg">
                        {section.title}
                      </h3>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {section.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      {section.subtitle}
                    </p>
                  </div>
                </div>

                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-emerald-100 text-emerald-700' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Card Body */}
              {isOpen && (
                <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-slate-100 space-y-6">
                  
                  {/* Summary Callout */}
                  <div className="bg-emerald-50/70 border-l-4 border-emerald-500 p-4 rounded-r-xl">
                    <p className="text-sm text-emerald-900 font-medium">
                      {section.summary}
                    </p>
                  </div>

                  {/* Section Content Logic */}
                  {section.id === 'arah-kelulusan' ? (
                    /* Specialized BMW 3 Cards Grid */
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {section.content.heading}
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {section.content.points.map((pt, pIdx) => (
                          <div 
                            key={pIdx}
                            className="bg-gradient-to-b from-white to-slate-50/70 p-5 rounded-xl border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
                          >
                            <div className="space-y-3">
                              <div className="w-12 h-12 rounded-xl bg-slate-100/90 flex items-center justify-center">
                                {getPointIcon(pt.icon)}
                              </div>
                              <h5 className="font-bold text-slate-800 text-sm sm:text-base">
                                {pt.title}
                              </h5>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {pt.desc}
                              </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Pilihan Valid Lulusan SMK</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Standard Cards / Points Grid */
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {section.content.heading}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {section.content.points.map((pt, pIdx) => (
                          <div 
                            key={pIdx} 
                            className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-start gap-3 hover:bg-white hover:shadow-xs transition-all"
                          >
                            <div className="p-2 rounded-lg bg-white shadow-xs shrink-0 mt-0.5 border border-slate-100">
                              {getPointIcon(pt.icon)}
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-800 text-xs sm:text-sm">
                                {pt.title}
                              </h5>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {pt.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Takeaway Box */}
                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-xl border border-teal-100/80">
                    <p className="text-xs sm:text-sm font-semibold text-teal-900 leading-relaxed">
                      {section.content.takeaway}
                    </p>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Footer to Next Menu */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-display font-bold text-slate-800 text-base">
            Sudah Paham dengan Materinya?
          </h4>
          <p className="text-xs text-slate-500">
            Ayo mulai identifikasi bakat, minat, dan mata pelajaran terbaikmu di fitur Pemetaan Diri!
          </p>
        </div>

        <button
          id="btn-next-to-mapping"
          onClick={onGoToMapping}
          className="inline-flex items-center gap-2.5 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          <span>Lanjut ke Pemetaan Diri</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
