import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Share2, 
  FileSpreadsheet, 
  Search, 
  Filter, 
  Trash2, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle2, 
  Eye, 
  BarChart3, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Rocket, 
  HelpCircle, 
  Sparkles, 
  Settings, 
  Database, 
  Send 
} from 'lucide-react';
import { AssessmentSubmission, AppSettings } from '../types';
import { 
  downloadSpreadsheetFile, 
  copySpreadsheetToClipboard, 
  GOOGLE_APPS_SCRIPT_SAMPLE, 
  sendToGoogleSheetWebhook 
} from '../services/spreadsheetService';
import { StorageService } from '../services/storageService';

interface TeacherDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: AssessmentSubmission[];
  onViewStudentSubmission: (sub: AssessmentSubmission) => void;
  onOpenShareModal?: () => void;
  onLogout?: () => void;
}

export const TeacherDashboardModal: React.FC<TeacherDashboardModalProps> = ({
  isOpen,
  onClose,
  submissions,
  onViewStudentSubmission,
  onOpenShareModal,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'submissions' | 'spreadsheet-sync' | 'analytics'>('submissions');
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('ALL');
  const [pathFilter, setPathFilter] = useState('ALL');
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedClipboard, setCopiedClipboard] = useState(false);
  const [webhookUrlInput, setWebhookUrlInput] = useState('');
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState<string | null>(null);

  const settings = StorageService.getSettings();

  useEffect(() => {
    setWebhookUrlInput(settings.googleSheetWebhookUrl || '');
  }, [settings.googleSheetWebhookUrl]);

  if (!isOpen) return null;

  // Filter Submissions
  const filteredSubmissions = submissions.filter(s => {
    const matchesSearch = 
      s.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.student.nisn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.student.major && s.student.major.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesClass = classFilter === 'ALL' || s.student.className === classFilter;
    const matchesPath = pathFilter === 'ALL' || s.reflection.chosenPath === pathFilter;

    return matchesSearch && matchesClass && matchesPath;
  });

  // Calculate Statistics
  const totalStudents = submissions.length;
  const bekerjaCount = submissions.filter(s => s.reflection.chosenPath === 'Bekerja').length;
  const kuliahCount = submissions.filter(s => s.reflection.chosenPath === 'Kuliah').length;
  const wirausahaCount = submissions.filter(s => s.reflection.chosenPath === 'Wirausaha').length;

  const handleSaveWebhook = () => {
    StorageService.saveSettings({
      ...settings,
      googleSheetWebhookUrl: webhookUrlInput.trim()
    });
    setWebhookStatus('URL Webhook berhasil disimpan! Semua data baru akan otomatis tersinkron ke Spreadsheet.');
    setTimeout(() => setWebhookStatus(null), 4000);
  };

  const handleTestWebhook = async () => {
    if (!webhookUrlInput.trim()) {
      setWebhookStatus('Silakan masukkan URL Webhook terlebih dahulu');
      return;
    }
    setIsTestingWebhook(true);
    if (submissions.length > 0) {
      const res = await sendToGoogleSheetWebhook(submissions[0], webhookUrlInput.trim());
      setWebhookStatus(res.success ? '✅ Berhasil terhubung! Data uji coba berhasil dikirim ke Google Sheet.' : `❌ ${res.message}`);
    } else {
      setWebhookStatus('⚠️ Belum ada data siswa untuk diuji. Coba buat 1 data terlebih dahulu.');
    }
    setIsTestingWebhook(false);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_SAMPLE).then(() => {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2500);
    });
  };

  const handleCopySpreadsheetTable = async () => {
    const ok = await copySpreadsheetToClipboard(submissions);
    if (ok) {
      setCopiedClipboard(true);
      setTimeout(() => setCopiedClipboard(false), 3000);
    }
  };

  const uniqueClasses = Array.from(new Set(submissions.map(s => s.student.className).filter(Boolean)));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg sm:text-xl">
                  Portal Guru BK & Spreadsheet Hub
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 border border-white/20 text-[11px] font-semibold text-emerald-100">
                  Real-Time Sync
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                Rekapitulasi Asesmen Klasikal, Ekspor Excel, dan Sinkronisasi Otomatis Google Sheets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenShareModal && (
              <button
                id="btn-teacher-open-share"
                onClick={onOpenShareModal}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl text-xs font-bold text-white transition-colors"
                title="Tampilkan Barcode & Link Akses Siswa"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Bagikan Barcode Siswa</span>
              </button>
            )}

            {onLogout && (
              <button
                id="btn-teacher-logout"
                onClick={onLogout}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-300/30 rounded-xl text-xs font-semibold text-rose-100 transition-colors"
                title="Keluar dari Portal Guru"
              >
                <span>Keluar</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation in Modal */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 bg-slate-50 shrink-0">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'submissions'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Data Siswa Terkumpul ({submissions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('spreadsheet-sync')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'spreadsheet-sync'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Konektor Google Sheets</span>
            {settings.googleSheetWebhookUrl && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'analytics'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analisis & Grafik Pilihan</span>
          </button>
        </div>

        {/* Scrollable Tab Content Area */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 bg-slate-50/50">
          
          {/* TAB 1: SUBMISSIONS LIST */}
          {activeTab === 'submissions' && (
            <div className="space-y-5">
              
              {/* Quick Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                
                {/* Search & Filter */}
                <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
                  <div className="relative flex-1 min-w-[180px]">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari nama siswa atau NISN..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  {/* Class Filter */}
                  <select
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-hidden"
                  >
                    <option value="ALL">Semua Kelas</option>
                    {uniqueClasses.map((cls, idx) => (
                      <option key={idx} value={cls}>{cls}</option>
                    ))}
                  </select>

                  {/* BMW Path Filter */}
                  <select
                    value={pathFilter}
                    onChange={(e) => setPathFilter(e.target.value)}
                    className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-hidden"
                  >
                    <option value="ALL">Semua Jalur (BMW)</option>
                    <option value="Bekerja">Bekerja</option>
                    <option value="Kuliah">Kuliah</option>
                    <option value="Wirausaha">Wirausaha</option>
                  </select>
                </div>

                {/* Export Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => downloadSpreadsheetFile(submissions, classFilter !== 'ALL' ? classFilter : 'Rekap_Kelas')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Excel (.csv)</span>
                  </button>

                  <button
                    onClick={handleCopySpreadsheetTable}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-xs shadow-xs transition-colors"
                  >
                    {copiedClipboard ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedClipboard ? 'Tersalin!' : 'Salin Tabel (Paste ke Sheets)'}</span>
                  </button>
                </div>

              </div>

              {/* Submissions Table / Cards */}
              {filteredSubmissions.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-700 text-base">Belum Ada Data yang Cocok</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Belum ada siswa yang mengisi atau kriteria pencarian tidak ditemukan. Klik tombol di bawah untuk memuat data sampel jika ingin melihat simulasi.
                  </p>
                  <button
                    onClick={() => StorageService.resetToDemoData()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Muat Data Sampel Kelas XI AT 3</span>
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100/90 text-slate-600 font-bold border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4">No</th>
                          <th className="py-3 px-4">Nama Siswa</th>
                          <th className="py-3 px-4">Kelas & NISN</th>
                          <th className="py-3 px-4">Profesi Pilihan</th>
                          <th className="py-3 px-4">Arah (BMW)</th>
                          <th className="py-3 px-4">Waktu Submit</th>
                          <th className="py-3 px-4 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {filteredSubmissions.map((sub, idx) => (
                          <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 font-mono font-semibold text-slate-500">
                              {idx + 1}
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-bold text-slate-900 block">{sub.student.name || 'Tanpa Nama'}</span>
                              <span className="text-[10px] text-slate-500 truncate block max-w-[160px]">
                                {sub.student.major || sub.mapping.customMajor}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-semibold text-slate-800 block">{sub.student.className}</span>
                              <span className="text-[10px] text-slate-500">{sub.student.nisn || '-'}</span>
                            </td>
                            <td className="py-3 px-4 max-w-[200px]">
                              <div className="flex flex-wrap gap-1">
                                {sub.mapping.selectedCareers.map((c, cIdx) => (
                                  <span key={cIdx} className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-semibold text-[10px] border border-emerald-100">
                                    {c.title}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] inline-flex items-center gap-1 ${
                                sub.reflection.chosenPath === 'Bekerja' ? 'bg-emerald-100 text-emerald-800' :
                                sub.reflection.chosenPath === 'Kuliah' ? 'bg-blue-100 text-blue-800' :
                                sub.reflection.chosenPath === 'Wirausaha' ? 'bg-amber-100 text-amber-800' :
                                'bg-slate-100 text-slate-600'
                              }`}>
                                {sub.reflection.chosenPath === 'Bekerja' && <Briefcase className="w-3 h-3" />}
                                {sub.reflection.chosenPath === 'Kuliah' && <GraduationCap className="w-3 h-3" />}
                                {sub.reflection.chosenPath === 'Wirausaha' && <Rocket className="w-3 h-3" />}
                                {sub.reflection.chosenPath || '-'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                              {new Date(sub.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} • {new Date(sub.createdAt).toLocaleDateString('id-ID')}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => onViewStudentSubmission(sub)}
                                  title="Lihat LKPD Lengkap"
                                  className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => StorageService.deleteSubmission(sub.id)}
                                  title="Hapus"
                                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Bottom Helpers */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Total Data Terfilter: <strong>{filteredSubmissions.length}</strong> siswa</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => StorageService.resetToDemoData()}
                    className="text-emerald-700 hover:underline font-semibold"
                  >
                    Muat Ulang Contoh Data
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => {
                      if (confirm('Yakin ingin mengosongkan seluruh data rekapan siswa?')) {
                        StorageService.clearAllSubmissions();
                      }
                    }}
                    className="text-rose-600 hover:underline"
                  >
                    Kosongkan Semua Data
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: GOOGLE SPREADSHEET LIVE CONNECTOR */}
          {activeTab === 'spreadsheet-sync' && (
            <div className="space-y-6">
              
              <div className="bg-emerald-50/80 border border-emerald-200 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 text-sm sm:text-base">
                      Integrasi Otomatis Google Spreadsheet Real-Time
                    </h4>
                    <p className="text-xs text-emerald-800">
                      Hubungkan aplikasi ini dengan Google Spreadsheet milik Guru BK sehingga setiap kali siswa menekan "Simpan Refleksi", datanya langsung otomatis tertulis baris demi baris di Google Sheets secara real-time!
                    </p>
                  </div>
                </div>

                {/* Webhook Input Row */}
                <div className="pt-2 space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    URL Google Apps Script Webhook:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      value={webhookUrlInput}
                      onChange={(e) => setWebhookUrlInput(e.target.value)}
                      placeholder="https://script.google.com/macros/s/.../exec"
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs bg-white outline-hidden"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveWebhook}
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors whitespace-nowrap"
                      >
                        Simpan Webhook
                      </button>
                      <button
                        onClick={handleTestWebhook}
                        disabled={isTestingWebhook}
                        className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-xl transition-colors whitespace-nowrap"
                      >
                        {isTestingWebhook ? 'Menguji...' : 'Uji Kirim'}
                      </button>
                    </div>
                  </div>

                  {webhookStatus && (
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium">
                      {webhookStatus}
                    </div>
                  )}
                </div>
              </div>

              {/* Step-by-step Setup Guide */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
                <h4 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Cara Cepat 1 Menit Menghubungkan Google Sheet:
                </h4>

                <ol className="list-decimal list-inside space-y-3 text-xs text-slate-600 leading-relaxed">
                  <li>
                    Buka Google Spreadsheet baru di <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold underline inline-flex items-center gap-1">sheets.new <ExternalLink className="w-3 h-3" /></a>
                  </li>
                  <li>
                    Klik menu <strong>Extensions (Ekstensi)</strong> ➔ pilih <strong>Apps Script</strong>.
                  </li>
                  <li>
                    Hapus kode bawaan, lalu <strong>salin dan tempel kode script</strong> di bawah ini.
                  </li>
                  <li>
                    Klik tombol <strong>Deploy (Terapkan)</strong> ➔ <strong>New Deployment (Penerapan Baru)</strong> ➔ Pilih jenis <strong>Web App (Aplikasi Web)</strong>.
                  </li>
                  <li>
                    Setelan akses: Ubah <em>Who has access (Siapa yang memiliki akses)</em> menjadi <strong>"Anyone" (Siapa saja)</strong> ➔ klik <strong>Deploy</strong>.
                  </li>
                  <li>
                    Salin <strong>Web App URL</strong> yang dihasilkan dan tempelkan ke kolom URL Webhook di atas. Selesai!
                  </li>
                </ol>

                {/* Code Snippet Box */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                      Kode Apps Script (Tinggal Salin):
                    </span>
                    <button
                      onClick={handleCopyScript}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                    >
                      {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedScript ? 'Tersalin ke Clipboard!' : 'Salin Kode Script'}</span>
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-900 text-emerald-300 rounded-xl text-[11px] font-mono overflow-x-auto max-h-56">
                    {GOOGLE_APPS_SCRIPT_SAMPLE}
                  </pre>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: ANALYTICS & STATS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              
              {/* Stat Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs text-slate-500 font-bold block">Total Responden Siswa</span>
                  <span className="text-2xl sm:text-3xl font-display font-bold text-slate-800">{totalStudents}</span>
                  <span className="text-[11px] text-emerald-600 block mt-1">Siswa telah asesmen</span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-800 font-bold">Jalur Bekerja</span>
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-display font-bold text-emerald-900">{bekerjaCount}</span>
                  <span className="text-[11px] text-emerald-700 block mt-1">
                    {totalStudents > 0 ? Math.round((bekerjaCount / totalStudents) * 100) : 0}% dari kelas
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-800 font-bold">Jalur Kuliah</span>
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-display font-bold text-blue-900">{kuliahCount}</span>
                  <span className="text-[11px] text-blue-700 block mt-1">
                    {totalStudents > 0 ? Math.round((kuliahCount / totalStudents) * 100) : 0}% dari kelas
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-amber-800 font-bold">Jalur Wirausaha</span>
                    <Rocket className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-display font-bold text-amber-900">{wirausahaCount}</span>
                  <span className="text-[11px] text-amber-700 block mt-1">
                    {totalStudents > 0 ? Math.round((wirausahaCount / totalStudents) * 100) : 0}% dari kelas
                  </span>
                </div>
              </div>

              {/* BMW Distribution Visual Bar */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                  Distribusi Proporsi Arah Karir Pasca-SMK (BMW)
                </h4>

                {totalStudents > 0 ? (
                  <div className="space-y-3">
                    <div className="h-6 rounded-full bg-slate-100 overflow-hidden flex w-full">
                      <div 
                        style={{ width: `${(bekerjaCount / totalStudents) * 100}%` }}
                        className="bg-emerald-500 h-full flex items-center justify-center text-white text-[10px] font-bold"
                        title={`Bekerja: ${bekerjaCount}`}
                      >
                        {bekerjaCount > 0 && `${Math.round((bekerjaCount / totalStudents) * 100)}%`}
                      </div>
                      <div 
                        style={{ width: `${(kuliahCount / totalStudents) * 100}%` }}
                        className="bg-blue-500 h-full flex items-center justify-center text-white text-[10px] font-bold"
                        title={`Kuliah: ${kuliahCount}`}
                      >
                        {kuliahCount > 0 && `${Math.round((kuliahCount / totalStudents) * 100)}%`}
                      </div>
                      <div 
                        style={{ width: `${(wirausahaCount / totalStudents) * 100}%` }}
                        className="bg-amber-500 h-full flex items-center justify-center text-white text-[10px] font-bold"
                        title={`Wirausaha: ${wirausahaCount}`}
                      >
                        {wirausahaCount > 0 && `${Math.round((wirausahaCount / totalStudents) * 100)}%`}
                      </div>
                    </div>

                    <div className="flex items-center justify-around text-xs font-semibold pt-1">
                      <div className="flex items-center gap-1.5 text-emerald-800">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                        <span>Bekerja ({bekerjaCount})</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-blue-800">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span>Kuliah ({kuliahCount})</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-800">
                        <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                        <span>Wirausaha ({wirausahaCount})</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">Belum ada data untuk dianalisis.</p>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Peta Karirku • Layanan BK Klasikal Terintegrasi Cloud & Spreadsheet
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Tutup Portal
          </button>
        </div>

      </div>

    </div>
  );
};
