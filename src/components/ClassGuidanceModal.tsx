import React from 'react';
import { X, BookOpen, Compass, CheckCircle2, Target, Users, Clock, Lightbulb, FileSpreadsheet } from 'lucide-react';

interface ClassGuidanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClassGuidanceModal: React.FC<ClassGuidanceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <Compass className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg">
                Panduan Operasional Layanan Bimbingan Klasikal
              </h3>
              <p className="text-xs text-emerald-200">
                Peta Karirku • Pedoman Pelaksanaan Guru BK di Kelas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/50">
          
          {/* Service Profile Metadata */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Topik Layanan</span>
              <span className="font-bold text-slate-800">Identifikasi Pilihan Karir</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Sasaran & Alokasi</span>
              <span className="font-bold text-slate-800">Kelas XI SMK (XI AT 3)</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Fokus Kejuruan</span>
              <span className="font-bold text-slate-800">Agribisnis Ternak & SMK</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Pengembang Media</span>
              <span className="font-bold text-emerald-800">Mahasiswa BK: Rama Abdillah</span>
            </div>
          </div>

          {/* 3 Step Classroom Workflow */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-600" />
              Skenario Pelaksanaan di Kelas (RPL Bimbingan Klasikal):
            </h4>

            <div className="space-y-2.5">
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h5 className="font-bold text-slate-800 text-xs">Tahap Awal / Pembuka (10 Menit)</h5>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Guru BK membuka kelas dengan salam, apersepsi topik karir, membagikan link aplikasi web kepada siswa via HP/Laptop, dan siswa mengisi Identitas di halaman Beranda.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h5 className="font-bold text-slate-800 text-xs">Tahap Inti: Eksplorasi & Pemetaan Diri (30-50 Menit)</h5>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Siswa membaca modul interaktif di menu <strong>Materi</strong> (3 kartu accordion), lalu masuk ke menu <strong>Pemetaan Diri</strong>: menginput 3 bakat, 3 minat, 3 mapel produktif, mencocokkan peluang karir, dan membuat analisis kesenjangan (gap analysis).
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h5 className="font-bold text-slate-800 text-xs">Tahap Penutup & Asesmen (15 Menit)</h5>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Siswa menjawab 4 pertanyaan di menu <strong>Refleksi</strong>, memilih jalur BMW, dan menekan tombol <strong>Simpan & Lihat Ringkasan</strong>. Siswa mencetak/menyimpan PDF LKPD, dan Guru BK langsung memantau serta mengekspor rekap seluruh kelas ke Excel/Google Spreadsheet.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Teacher Pro-Tips */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2">
            <h5 className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-emerald-600" />
              Tips Penggunaan Optimal:
            </h5>
            <ul className="text-xs text-emerald-900 list-disc list-inside space-y-1">
              <li>Aplikasi berjalan optimal di semua browser HP siswa (Android/iOS) maupun laptop sekolah.</li>
              <li>Guru BK dapat membuka <strong>Portal Guru BK</strong> pada laptop/proyektor di depan kelas untuk menampilkan live visualisasi statistik pilihan karir kelas secara interaktif.</li>
              <li>Gunakan fitur <strong>Salin Tabel</strong> atau <strong>Download Excel</strong> untuk merekap Asesmen Proses dan Asesmen Hasil BK.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors"
          >
            Mengerti & Tutup
          </button>
        </div>

      </div>

    </div>
  );
};
