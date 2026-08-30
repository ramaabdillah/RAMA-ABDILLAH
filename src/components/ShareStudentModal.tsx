import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  QrCode, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Smartphone, 
  Share2, 
  Users, 
  School 
} from 'lucide-react';
import QRCode from 'qrcode';

interface ShareStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultClass?: string;
}

export const ShareStudentModal: React.FC<ShareStudentModalProps> = ({
  isOpen,
  onClose,
  defaultClass = 'XI AT 3'
}) => {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(defaultClass);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Derive the active URL (handles iframe, window.location, and clean origin)
  const getBaseAppUrl = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      // Remove extraneous params, keep base app url
      return `${url.origin}${url.pathname}`;
    }
    return 'https://petakarirku.web.app';
  };

  const currentAppUrl = getBaseAppUrl();
  const shareableUrl = selectedClass 
    ? `${currentAppUrl}?kelas=${encodeURIComponent(selectedClass)}`
    : currentAppUrl;

  // Generate QR Code image when url changes
  useEffect(() => {
    if (!isOpen) return;

    QRCode.toDataURL(shareableUrl, {
      width: 480,
      margin: 2,
      color: {
        dark: '#064e3b', // Deep emerald
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    })
      .then(url => {
        setQrDataUrl(url);
      })
      .catch(err => {
        console.error('Failed to generate QR Code:', err);
      });
  }, [isOpen, shareableUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `QR-Code-Peta-Karirku-${selectedClass || 'Siswa'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn ${isFullscreen ? 'p-0' : ''}`}>
      
      <div className={`bg-white w-full rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 ${
        isFullscreen 
          ? 'h-full max-h-screen rounded-none max-w-none' 
          : 'max-w-3xl my-auto max-h-[92vh]'
      }`}>
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shadow-inner">
              <QrCode className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base sm:text-lg">
                  Barcode & Link Akses Siswa
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/25 border border-white/20 text-[10px] sm:text-xs font-semibold text-emerald-100">
                  Siap Scan Kamera HP
                </span>
              </div>
              <p className="text-xs text-emerald-200 hidden sm:block">
                Bagikan barcode ini ke proyektor kelas atau grup WhatsApp agar siswa langsung mengisi asesmen.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Keluar Mode Layar Penuh' : 'Mode Proyektor Layar Penuh'}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors flex items-center gap-1 text-xs font-semibold"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span className="hidden md:inline">{isFullscreen ? 'Kecilkan' : 'Layar Penuh (Proyektor)'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6 flex-1 bg-slate-50/60">
          
          {/* Main Display Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Huge High-Res Barcode Card */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="bg-white p-5 rounded-3xl border-2 border-emerald-500/30 shadow-lg shadow-emerald-900/5 flex flex-col items-center text-center space-y-3 w-full max-w-[300px]">
                
                <div className="w-full flex items-center justify-between border-b border-slate-100 pb-2 px-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800">
                    <School className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Peta Karirku BK</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold">
                    {selectedClass || 'Kelas Siswa'}
                  </span>
                </div>

                {/* The QR Code Graphic */}
                <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-inner flex items-center justify-center">
                  {qrDataUrl ? (
                    <img 
                      src={qrDataUrl} 
                      alt="Barcode QR Code Akses Siswa Peta Karirku" 
                      className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-48 h-48 sm:w-56 sm:h-56 bg-slate-100 flex items-center justify-center text-xs text-slate-400 animate-pulse rounded-lg">
                      Membuat Barcode...
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="font-display font-bold text-slate-800 text-xs sm:text-sm flex items-center justify-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-emerald-600 animate-bounce" />
                    <span>Scan dengan Kamera HP</span>
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Buka kamera / Google Lens, lalu arahkan ke barcode ini.
                  </p>
                </div>

              </div>

              {/* Download QR Button */}
              <button
                id="btn-download-qr-image"
                onClick={handleDownloadQr}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100/70 hover:bg-emerald-200/80 px-4 py-2 rounded-xl transition-all border border-emerald-300/60"
              >
                <Download className="w-3.5 h-3.5 text-emerald-700" />
                <span>Unduh Gambar Barcode (PNG)</span>
              </button>
            </div>

            {/* Right Column: Shareable Link & Class Settings */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Classroom Customization Tag - Locked & Automated to XI AT 3 Only */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>Target Otomatisasi Kelas Siswa:</span>
                  </label>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300/60">
                    Otomatis Aktif
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-display font-bold text-sm shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      <span>Kelas XI AT 3</span>
                    </div>
                    <span className="text-[11px] font-normal bg-white/20 px-2 py-0.5 rounded-md">
                      Agribisnis Ternak
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                  ⚡ <strong>Otomatisasi Aktif:</strong> Siswa yang memindai barcode atau membuka link ini akan otomatis memiliki label kelas <strong>XI AT 3</strong> pada formulir asesmen BK tanpa perlu memilih manual.
                </p>
              </div>

              {/* Shareable URL Copy Box */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
                <span className="text-xs font-bold text-slate-700 block">
                  Tautan / Link Web Langsung:
                </span>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-700 truncate select-all">
                    {shareableUrl}
                  </div>

                  <button
                    id="btn-copy-share-url"
                    onClick={handleCopyLink}
                    className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all ${
                      copied 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-800 hover:bg-slate-900 text-white'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Tersalin!' : 'Salin Link'}</span>
                  </button>
                </div>

                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Bisa dibagikan ke WhatsApp Grup Kelas</span>
                  <a 
                    href={shareableUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-emerald-700 hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    Buka di Tab Baru <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Classroom Instructions Steps */}
              <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-4 space-y-2">
                <h4 className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Petunjuk Praktis Guru BK di Kelas:
                </h4>
                <ol className="list-decimal list-inside text-xs text-emerald-900 space-y-1">
                  <li>Klik tombol <strong>Layar Penuh (Proyektor)</strong> di kanan atas untuk menampilkan barcode besar di layar proyektor depan kelas.</li>
                  <li>Minta seluruh siswa membuka kamera HP mereka dan memindai barcode.</li>
                  <li>Siswa langsung dapat membaca materi dan mengisi pemetaan diri secara serentak tanpa perlu login/instal aplikasi apapun.</li>
                </ol>
              </div>

              {/* Install App / Icon on Home Screen Guide */}
              <div className="bg-slate-100/80 border border-slate-200 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center gap-2">
                  <img src="/icon.svg" alt="App Icon" className="w-6 h-6 rounded-lg shadow-xs" />
                  <h5 className="font-bold text-slate-800 text-xs">
                    Tips Menampilkan Icon di Layar Utama HP Siswa / Guru:
                  </h5>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  📱 <strong>Android (Chrome):</strong> Tekan menu titik tiga (⋮) di pojok kanan atas browser &gt; pilih <strong>"Tambahkan ke Layar Utama" / "Install Aplikasi"</strong>.<br />
                  🍎 <strong>iPhone (Safari):</strong> Tekan tombol Bagikan (ikon kotak panah ke atas) &gt; pilih <strong>"Add to Home Screen" (Tambahkan ke Layar Utama)</strong>.<br />
                  Icon logo kompas <em>Peta Karirku</em> akan langsung muncul di beranda ponsel seperti aplikasi native!
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Peta Karirku • Dibuat oleh <strong className="text-emerald-800 font-semibold">Mahasiswa BK : Rama Abdillah</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Selesai
          </button>
        </div>

      </div>

    </div>
  );
};
