import React from 'react';
import { ArrowRight, Compass, Sparkles, BookOpen, Target, CheckCircle2, UserCheck, ShieldCheck, HeartHandshake, QrCode } from 'lucide-react';
import { StudentProfile } from '../types';

interface HomeTabProps {
  onStart: () => void;
  onGoToMapping: () => void;
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onOpenShareModal?: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onStart,
  onGoToMapping,
  student,
  setStudent,
  onOpenShareModal
}) => {
  const handleInputChange = (field: keyof StudentProfile, value: string) => {
    setStudent(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Greeting Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white p-6 sm:p-10 shadow-lg shadow-emerald-900/10">
        
        {/* Subtle background glow decorative elements */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 -top-12 w-48 h-48 bg-emerald-400/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-emerald-100 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Layanan Bimbingan Klasikal BK SMK • Kelas XI</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/40 backdrop-blur-md border border-emerald-300/30 text-amber-200 text-xs font-bold shadow-xs">
              <span>👨‍🏫 Dibuat oleh Mahasiswa BK : Rama Abdillah</span>
            </div>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Peta Karirku – Temukan Arah Karir yang Sesuai untuk Kamu
          </h1>

          <p className="text-emerald-50 text-base sm:text-lg leading-relaxed font-normal">
            Halo Sobat SMK! Selamat datang di aplikasi <strong>Peta Karirku</strong>. Layanan bimbingan klasikal hari ini dirancang khusus untuk membantumu <span className="text-amber-200 font-semibold">mengenal potensi diri</span> (kemampuan, bakat, minat) dan mengaitkannya secara tepat dengan <span className="text-amber-200 font-semibold">pilihan karir atau cita-cita masa depanmu</span> setelah lulus nanti.
          </p>

          {/* Action Button Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              id="btn-start-home"
              onClick={onStart}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-2xl font-bold text-base shadow-md shadow-emerald-950/20 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Mulai Pelajari Materi</span>
              <ArrowRight className="w-5 h-5 text-emerald-600" />
            </button>

            <button
              id="btn-direct-mapping"
              onClick={onGoToMapping}
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-emerald-500/25 hover:bg-emerald-500/35 border border-white/30 text-white rounded-2xl font-semibold text-sm backdrop-blur-sm transition-all duration-200"
            >
              <UserCheck className="w-4 h-4 text-emerald-200" />
              <span>Langsung ke Pemetaan Diri</span>
            </button>

            {onOpenShareModal && (
              <button
                id="btn-home-share-barcode"
                onClick={onOpenShareModal}
                className="inline-flex items-center gap-2 px-4 py-3.5 bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/40 text-amber-100 rounded-2xl font-semibold text-sm backdrop-blur-sm transition-all duration-200"
                title="Tampilkan barcode untuk di-scan siswa sekelas"
              >
                <QrCode className="w-4 h-4 text-amber-300" />
                <span>Barcode Akses Siswa</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Identity Box & Quick Setup */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Student Profile Card (Left 2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-800 text-lg">
                  Identitas Siswa
                </h3>
                <p className="text-xs text-slate-500">
                  Lengkapi data dirimu agar rekap hasil asesmen tersimpan rapi untuk Guru BK
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
              Wajib Diisi
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label htmlFor="student-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                Nama Lengkap Siswa <span className="text-rose-500">*</span>
              </label>
              <input
                id="student-name"
                type="text"
                value={student.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Contoh: Ahmad Faiz Pratama"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm outline-hidden transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="student-nisn" className="block text-xs font-bold text-slate-700 mb-1.5">
                NISN / No. Absen <span className="text-rose-500">*</span>
              </label>
              <input
                id="student-nisn"
                type="text"
                value={student.nisn}
                onChange={(e) => handleInputChange('nisn', e.target.value)}
                placeholder="Contoh: 0071238910 / No. 04"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm outline-hidden transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="student-class" className="block text-xs font-bold text-slate-700">
                  Kelas <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Otomatis: XI AT 3
                </span>
              </div>
              <input
                id="student-class"
                type="text"
                value={student.className || 'XI AT 3'}
                onChange={(e) => handleInputChange('className', e.target.value)}
                placeholder="XI AT 3"
                className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm font-semibold text-emerald-900 outline-hidden transition-all bg-emerald-50/30 focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="student-major" className="block text-xs font-bold text-slate-700 mb-1.5">
                Kompetensi Keahlian / Jurusan
              </label>
              <input
                id="student-major"
                type="text"
                value={student.major}
                onChange={(e) => handleInputChange('major', e.target.value)}
                placeholder="Contoh: Agribisnis Ternak (ATR)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm outline-hidden transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="student-school" className="block text-xs font-bold text-slate-700 mb-1.5">
                Asal Sekolah
              </label>
              <input
                id="student-school"
                type="text"
                value={student.school}
                onChange={(e) => handleInputChange('school', e.target.value)}
                placeholder="Contoh: SMK N 1 Nanggulan"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm outline-hidden transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Learning Journey Roadmap (Right Column) */}
        <div className="bg-gradient-to-b from-slate-50 to-emerald-50/40 rounded-2xl p-6 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="font-display font-bold text-slate-800 text-base flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-600" />
              Alur Layanan Hari Ini
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Materi & Wawasan Karir</h5>
                  <p className="text-[11px] text-slate-500">Pahami konsep potensi diri, faktor penentu, dan 3 opsi BMW.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Pemetaan Diri (3 Langkah)</h5>
                  <p className="text-[11px] text-slate-500">Input bakat, minat, mapel produktif, dan pencocokan profesi.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Refleksi & Lembar Kerja</h5>
                  <p className="text-[11px] text-slate-500">Jawab 4 refleksi, simpan, download PDF, dan rekap otomatis.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-emerald-100/80">
            <div className="flex items-center gap-2 text-[11px] text-emerald-800 bg-emerald-100/60 p-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Data otomatis tersimpan & terhubung ke Spreadsheet Guru BK secara real-time.</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3 Core Highlights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all group">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-800 text-base mb-1">Materi Interaktif</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Eksplorasi modul ringkas seputar arti penting kenal diri, faktor lingkungan, dan arah masa depan SMK.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all group">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 group-hover:bg-teal-600 group-hover:text-white transition-colors">
            <UserCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-800 text-base mb-1">Pencocokan Profesi</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Sistem otomatis mencocokkan bakat, minat, dan mapel produktifmu dengan ragam profesi agribisnis dan industri.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all group">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-800 text-base mb-1">Asesmen & Refleksi BK</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Rangkum keputusan cita-citamu, lakukan gap analysis pengembangan diri, dan cetak rapor asesmen mandiri.
          </p>
        </div>
      </div>
    </div>
  );
};
