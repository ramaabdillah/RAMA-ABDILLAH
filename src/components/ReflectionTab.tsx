import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  Save, 
  CheckCircle2, 
  HelpCircle, 
  Briefcase, 
  GraduationCap, 
  Rocket, 
  FileCheck, 
  UploadCloud, 
  Layers 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReflectionData, SelfMappingData, StudentProfile, CareerPathType } from '../types';

interface ReflectionTabProps {
  reflection: ReflectionData;
  setReflection: React.Dispatch<React.SetStateAction<ReflectionData>>;
  mapping: SelfMappingData;
  student: StudentProfile;
  onBackToMapping: () => void;
  onSaveAndShowSummary: () => void;
  isSaving: boolean;
}

export const ReflectionTab: React.FC<ReflectionTabProps> = ({
  reflection,
  setReflection,
  mapping,
  student,
  onBackToMapping,
  onSaveAndShowSummary,
  isSaving
}) => {
  const handleInputChange = (field: keyof ReflectionData, value: string) => {
    setReflection(prev => ({ ...prev, [field]: value }));
  };

  const handleChoosePath = (path: CareerPathType) => {
    setReflection(prev => ({ ...prev, chosenPath: path }));
  };

  const isFormValid =
    reflection.q1.trim().length > 3 &&
    reflection.q2.trim().length > 3 &&
    reflection.q3.trim().length > 3 &&
    reflection.q4.trim().length > 3;

  const handleSaveClick = () => {
    if (!isFormValid) return;
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn(e);
    }
    onSaveAndShowSummary();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-800 text-white p-6 sm:p-8 rounded-3xl shadow-md space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-semibold backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Tahap Akhir Asesmen BK</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
          Lembar Refleksi Pilihan Karir & Cita-Cita
        </h2>
        <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-3xl">
          Jawablah 4 pertanyaan reflektif di bawah ini dengan jujur dan sungguh-sungguh berdasarkan hasil pemetaan diri yang telah kamu lakukan. Hasil ini akan direkap sebagai bukti asesmen layanan bimbingan klasikal.
        </p>
      </div>

      {/* Selected Career Quick Reminder Pills */}
      {mapping.selectedCareers.length > 0 && (
        <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-emerald-950">Profesi yang Telah Kamu Pilih:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {mapping.selectedCareers.map((c, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-white text-emerald-800 font-bold text-xs rounded-lg border border-emerald-200 shadow-2xs">
                    ★ {c.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <span className="text-[11px] text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full font-semibold">
            Gunakan sebagai acuan jawabanmu
          </span>
        </div>
      )}

      {/* 4 Reflective Questions Form */}
      <div className="space-y-6">
        
        {/* Question 1 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0">
              1
            </div>
            <div className="space-y-1">
              <label htmlFor="ref-q1" className="font-display font-bold text-slate-800 text-sm sm:text-base block">
                Potensi diri (kemampuan, bakat, minat) apa yang paling menonjol dari hasil pemetaan diri kalian? <span className="text-rose-500">*</span>
              </label>
              <p className="text-xs text-slate-500">
                Sebutkan kemampuan dan minat yang paling kamu banggakan dan kuasai dengan baik.
              </p>
            </div>
          </div>
          <textarea
            id="ref-q1"
            rows={3}
            value={reflection.q1}
            onChange={(e) => handleInputChange('q1', e.target.value)}
            placeholder="Tuliskan potensi yang paling menonjol pada dirimu..."
            className="w-full p-4 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs sm:text-sm bg-slate-50/50 focus:bg-white transition-all outline-hidden resize-y"
          />
        </div>

        {/* Question 2 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm shrink-0">
              2
            </div>
            <div className="space-y-1">
              <label htmlFor="ref-q2" className="font-display font-bold text-slate-800 text-sm sm:text-base block">
                Apakah potensi diri yang kalian miliki sudah sesuai dengan peluang karir yang kalian inginkan? Mengapa? <span className="text-rose-500">*</span>
              </label>
              <p className="text-xs text-slate-500">
                Jelaskan hubungan antara keahlian yang kamu miliki dengan profesi yang kamu tuju.
              </p>
            </div>
          </div>
          <textarea
            id="ref-q2"
            rows={3}
            value={reflection.q2}
            onChange={(e) => handleInputChange('q2', e.target.value)}
            placeholder="Jelaskan alasan kecocokan potensi dirimu dengan pilihan karirmu..."
            className="w-full p-4 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-xs sm:text-sm bg-slate-50/50 focus:bg-white transition-all outline-hidden resize-y"
          />
        </div>

        {/* Question 3 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm shrink-0">
              3
            </div>
            <div className="space-y-1">
              <label htmlFor="ref-q3" className="font-display font-bold text-slate-800 text-sm sm:text-base block">
                Dari beberapa pilihan karir yang sudah dicocokkan, karir mana yang paling sesuai dengan potensi diri kalian? <span className="text-rose-500">*</span>
              </label>
              <p className="text-xs text-slate-500">
                Tentukan 1 profesi spesifik yang paling pas dan realistis untuk kamu capai.
              </p>
            </div>
          </div>
          <textarea
            id="ref-q3"
            rows={3}
            value={reflection.q3}
            onChange={(e) => handleInputChange('q3', e.target.value)}
            placeholder="Tuliskan karir yang paling sesuai dengan dirimu..."
            className="w-full p-4 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 text-xs sm:text-sm bg-slate-50/50 focus:bg-white transition-all outline-hidden resize-y"
          />
        </div>

        {/* Question 4: Cita-Cita & Arah Karir Utama */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm shrink-0">
              4
            </div>
            <div className="space-y-1">
              <label htmlFor="ref-q4" className="font-display font-bold text-slate-800 text-sm sm:text-base block">
                Jika harus memilih satu arah karir atau cita-cita sekarang, apa yang akan kalian pilih dan apa alasannya? <span className="text-rose-500">*</span>
              </label>
              <p className="text-xs text-slate-500">
                Pilih jalur utamamu (Bekerja, Kuliah, atau Wirausaha) dan tuliskan komitmen alasanmu.
              </p>
            </div>
          </div>

          {/* BMW Selection Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <button
              type="button"
              id="btn-choose-bekerja"
              onClick={() => handleChoosePath('Bekerja')}
              className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                reflection.chosenPath === 'Bekerja'
                  ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300 font-bold text-emerald-900 shadow-xs'
                  : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className={`p-2 rounded-lg ${reflection.chosenPath === 'Bekerja' ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-600 border border-slate-200'}`}>
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold">Bekerja Langsung</span>
                <span className="block text-[10px] text-slate-500">Dunia Kerja & Industri</span>
              </div>
            </button>

            <button
              type="button"
              id="btn-choose-kuliah"
              onClick={() => handleChoosePath('Kuliah')}
              className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                reflection.chosenPath === 'Kuliah'
                  ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-300 font-bold text-blue-900 shadow-xs'
                  : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className={`p-2 rounded-lg ${reflection.chosenPath === 'Kuliah' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-slate-200'}`}>
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold">Melanjutkan Kuliah</span>
                <span className="block text-[10px] text-slate-500">D3 / D4 / S1 Spesialis</span>
              </div>
            </button>

            <button
              type="button"
              id="btn-choose-wirausaha"
              onClick={() => handleChoosePath('Wirausaha')}
              className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                reflection.chosenPath === 'Wirausaha'
                  ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300 font-bold text-amber-900 shadow-xs'
                  : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className={`p-2 rounded-lg ${reflection.chosenPath === 'Wirausaha' ? 'bg-amber-500 text-white' : 'bg-white text-amber-600 border border-slate-200'}`}>
                <Rocket className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold">Wirausaha Mandiri</span>
                <span className="block text-[10px] text-slate-500">Membangun Bisnis Sendiri</span>
              </div>
            </button>
          </div>

          <textarea
            id="ref-q4"
            rows={4}
            value={reflection.q4}
            onChange={(e) => handleInputChange('q4', e.target.value)}
            placeholder="Tuliskan keputusan cita-citamu dan alasan mendalam mengapa kamu memilihnya..."
            className="w-full p-4 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-xs sm:text-sm bg-slate-50/50 focus:bg-white transition-all outline-hidden resize-y"
          />
        </div>

      </div>

      {/* Action Footer */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          id="btn-back-to-mapping"
          onClick={onBackToMapping}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-colors order-2 sm:order-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Pemetaan Diri</span>
        </button>

        <button
          id="btn-save-summary"
          disabled={!isFormValid || isSaving}
          onClick={handleSaveClick}
          className={`inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-base transition-all shadow-md order-1 sm:order-2 ${
            isFormValid && !isSaving
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-700/25 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <FileCheck className="w-5 h-5" />
          <span>{isSaving ? 'Menyimpan ke Cloud...' : 'Simpan & Lihat Ringkasan Asesmen'}</span>
        </button>
      </div>

    </div>
  );
};
