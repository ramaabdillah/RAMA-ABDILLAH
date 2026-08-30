import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  Compass, 
  Layers, 
  Briefcase, 
  BookOpen, 
  Flame, 
  Heart, 
  Target, 
  GraduationCap, 
  School, 
  Calendar, 
  User, 
  FileText 
} from 'lucide-react';
import { AssessmentSubmission } from '../types';

interface SummaryResultModalProps {
  submission: AssessmentSubmission;
  onClose: () => void;
  onEditAgain: () => void;
}

export const SummaryResultModal: React.FC<SummaryResultModalProps> = ({
  submission,
  onClose,
  onEditAgain
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const p = submission.student;
  const m = submission.mapping;
  const r = submission.reflection;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Modal Bar (No Print) */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between no-print shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <FileText className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg">
                Lembar Hasil Asesmen Pemetaan Karir (LKPD BK)
              </h3>
              <p className="text-xs text-emerald-200">
                Peta Karirku • Layanan Bimbingan Klasikal SMK
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-print-summary"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-emerald-900 hover:bg-emerald-50 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4 text-emerald-700" />
              <span>Cetak / Simpan PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Container */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-slate-50/50" ref={printRef}>
          
          {/* Document Header (Formal School LKPD Style) */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs print-shadow-none print-break-inside-avoid space-y-6">
            
            {/* Header Title with Official Header Style */}
            <div className="text-center border-b-2 border-emerald-600 pb-4 space-y-1">
              <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-widest">
                <Compass className="w-4 h-4" />
                <span>Layanan Bimbingan dan Konseling Klasikal</span>
              </div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                LEMBAR KERJA PESERTA DIDIK (LKPD) PETA KARIRKU
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Topik: "Identifikasi Pilihan Karir atau Cita-Cita yang Sesuai dengan Potensi Diri"
              </p>
            </div>

            {/* Student Identity Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Nama Lengkap</span>
                <span className="font-bold text-slate-800 text-sm">{p.name || '-'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Kelas / No. Absen</span>
                <span className="font-bold text-slate-800 text-sm">{p.className || 'XI'} ({p.nisn || '-'})</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Kompetensi Keahlian</span>
                <span className="font-bold text-slate-800">{p.major || m.customMajor || '-'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Sekolah / Tanggal</span>
                <span className="font-bold text-slate-800">
                  {p.school || 'SMK'} • {new Date(submission.createdAt).toLocaleDateString('id-ID')}
                </span>
              </div>
            </div>

            {/* SECTION 1: HASIL PEMETAAN POTENSI DIRI */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5 text-sm font-bold text-emerald-800">
                <Flame className="w-4 h-4 text-emerald-600" />
                <span>I. Hasil Pemetaan Potensi Diri</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                
                {/* 3 Bakat */}
                <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100 space-y-1.5">
                  <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    3 Kemampuan / Bakat:
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 text-slate-700">
                    {m.potentials.map((pt, idx) => (
                      <li key={idx} className="font-medium">{pt || '-'}</li>
                    ))}
                  </ol>
                </div>

                {/* 3 Minat */}
                <div className="bg-rose-50/60 p-3.5 rounded-xl border border-rose-100 space-y-1.5">
                  <h4 className="font-bold text-rose-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                    3 Minat yang Disukai:
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 text-slate-700">
                    {m.interests.map((it, idx) => (
                      <li key={idx} className="font-medium">{it || '-'}</li>
                    ))}
                  </ol>
                </div>

                {/* 3 Mapel */}
                <div className="bg-teal-50/60 p-3.5 rounded-xl border border-teal-100 space-y-1.5">
                  <h4 className="font-bold text-teal-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                    3 Mapel Produktif Unggulan:
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 text-slate-700">
                    {m.productiveSubjects.map((sb, idx) => (
                      <li key={idx} className="font-medium">{sb || '-'}</li>
                    ))}
                  </ol>
                </div>

              </div>
            </div>

            {/* SECTION 2: PROFESI PILIHAN & GAP ANALYSIS */}
            <div className="space-y-3 print-break-inside-avoid">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5 text-sm font-bold text-teal-800">
                <Target className="w-4 h-4 text-teal-600" />
                <span>II. Pencocokan Profesi & Analisis Kesenjangan (Gap Analysis)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Profesi Terpilih */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                  <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wide">
                    Profesi Pilihan Siswa:
                  </h4>
                  <div className="space-y-2">
                    {m.selectedCareers.map((c, idx) => (
                      <div key={idx} className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-emerald-900">{c.title}</span>
                          <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold">
                            {c.sector}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-snug">{c.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gap Analysis */}
                <div className="p-4 bg-cyan-50/50 rounded-xl border border-cyan-200/80 space-y-2 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-cyan-900 uppercase tracking-wide">
                      Rencana Pengembangan Kesiapan Diri:
                    </h4>
                    <p className="text-xs text-slate-700 mt-2 leading-relaxed bg-white p-3 rounded-lg border border-cyan-100 italic">
                      "{m.gapAnalysis || 'Belum diisi'}"
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-[11px] font-bold text-cyan-900">
                    <span>Arah Jalur Masa Depan:</span>
                    <span className="px-2.5 py-0.5 bg-cyan-600 text-white rounded-full text-xs">
                      {r.chosenPath || 'Bekerja / Kuliah / Wirausaha'}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* SECTION 3: HASIL JAWABAN REFLEKSI BK */}
            <div className="space-y-3 print-break-inside-avoid">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5 text-sm font-bold text-cyan-800">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                <span>III. Refleksi & Komitmen Cita-Cita Siswa</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800 mb-1">
                    1. Potensi diri yang paling menonjol:
                  </p>
                  <p className="text-slate-700 bg-white p-2 rounded-lg border border-slate-100">
                    {r.q1}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800 mb-1">
                    2. Kesesuaian potensi diri dengan peluang karir & alasan:
                  </p>
                  <p className="text-slate-700 bg-white p-2 rounded-lg border border-slate-100">
                    {r.q2}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800 mb-1">
                    3. Karir yang paling sesuai dari hasil pemetaan:
                  </p>
                  <p className="text-slate-700 bg-white p-2 rounded-lg border border-slate-100">
                    {r.q3}
                  </p>
                </div>

                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
                  <p className="font-bold text-emerald-950 mb-1">
                    4. Pilihan satu arah karir/cita-cita sekarang dan alasannya:
                  </p>
                  <p className="text-slate-800 bg-white p-2 rounded-lg border border-emerald-100 font-medium">
                    {r.q4}
                  </p>
                </div>
              </div>
            </div>

            {/* Signature Block for LKPD */}
            <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-xs text-slate-700 print-break-inside-avoid">
              <div className="text-center space-y-12">
                <p>Mengetahui,<br /><span className="font-bold">Guru Bimbingan dan Konseling</span></p>
                <div className="border-t border-slate-400 pt-1 w-44 mx-auto">
                  <span className="font-bold text-slate-800">Guru BK SMK</span>
                  <p className="text-[10px] text-slate-500">NIP. ..................................</p>
                </div>
              </div>

              <div className="text-center space-y-12">
                <p>Nanggulan, {new Date(submission.createdAt).toLocaleDateString('id-ID')}<br /><span className="font-bold">Peserta Didik</span></p>
                <div className="border-t border-slate-400 pt-1 w-44 mx-auto">
                  <span className="font-bold text-slate-800">{p.name || 'Siswa'}</span>
                  <p className="text-[10px] text-slate-500">NISN. {p.nisn || '...................'}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Sync Status Info Footer */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-900 no-print">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Data asesmen telah tersimpan di sistem & siap direkap ke spreadsheet Guru BK.</span>
            </div>
            <button
              onClick={onEditAgain}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
            >
              Ubah Jawaban
            </button>
          </div>

        </div>

        {/* Bottom Actions Bar (No Print) */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3 no-print shrink-0">
          <button
            onClick={onEditAgain}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            ← Koreksi / Edit Jawaban
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak LKPD Sekarang</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs sm:text-sm transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
