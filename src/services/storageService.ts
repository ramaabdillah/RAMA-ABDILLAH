import { AssessmentSubmission, AppSettings, StudentProfile, SelfMappingData, ReflectionData } from '../types';
import { sendToGoogleSheetWebhook } from './spreadsheetService';

const SUBMISSIONS_KEY = 'peta_karirku_submissions_v1';
const SETTINGS_KEY = 'peta_karirku_settings_v1';
const CURRENT_SESSION_KEY = 'peta_karirku_current_session_v1';

export const DEFAULT_SETTINGS: AppSettings = {
  googleSheetWebhookUrl: '',
  schoolName: 'SMK N 1 Nanggulan',
  targetClass: 'XI AT 3',
  bkTeacherName: 'Guru BK SMK',
  enableSoundEffects: true
};

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: '',
  nisn: '',
  className: 'XI AT 3',
  major: 'Agribisnis Ternak (ATR)',
  school: 'SMK N 1 Nanggulan'
};

export const INITIAL_MAPPING_DATA: SelfMappingData = {
  potentials: ['', '', ''],
  interests: ['', '', ''],
  productiveSubjects: [
    'Agribisnis Ternak Ruminansia (ATR)',
    'Kesehatan Ternak & Biosekuriti',
    'Agribisnis Pakan Ternak'
  ],
  customMajor: 'Agribisnis Ternak (ATR)',
  matchedCareers: [],
  selectedCareers: [],
  gapAnalysis: ''
};

export const INITIAL_REFLECTION_DATA: ReflectionData = {
  q1: '',
  q2: '',
  q3: '',
  q4: '',
  chosenPath: ''
};

// Seed demo submissions to showcase Guru BK recap dashboard
const SEED_SUBMISSIONS: AssessmentSubmission[] = [
  {
    id: 'sub-seed-1',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    student: {
      name: 'Ahmad Faiz Pratama',
      nisn: '0071238910',
      className: 'XI AT 3',
      major: 'Agribisnis Ternak (ATR)',
      school: 'SMK N 1 Nanggulan'
    },
    mapping: {
      potentials: ['Telaten merawat sapi & kambing', 'Mudah bergaul & komunikasi', 'Cekatan meracik pakan silase'],
      interests: ['Beternak ruminansia modern', 'Membuka usaha breeding kambing', 'Jual beli hewan kurban online'],
      productiveSubjects: ['Agribisnis Ternak Ruminansia (ATR)', 'Agribisnis Pakan Ternak', 'Kesehatan Ternak & Biosekuriti'],
      customMajor: 'Agribisnis Ternak (ATR)',
      matchedCareers: [],
      selectedCareers: [
        {
          id: 'peternak-mandiri',
          title: 'Peternak Modern & Wirausaha Agribisnis',
          sector: 'Agribisnis & Peternakan',
          description: 'Mengelola usaha budidaya ternak unggas atau ruminansia dengan manajemen modern.',
          requiredSkills: ['Manajemen Pemeliharaan Ternak', 'Agribisnis Pakan'],
          matchKeywords: ['ternak', 'sapi', 'kambing'],
          suitablePaths: ['Wirausaha', 'Bekerja'],
          growthProspects: 'Tinggi',
          salaryOrIncomeEstimate: 'Rp 6.000.000 - Rp 25.000.000+ / bulan',
          iconName: 'Beef',
          tagColor: 'emerald'
        }
      ],
      gapAnalysis: 'Saya perlu belajar lebih dalam tentang pembukuan keuangan usaha dan manajemen risiko penyakit ternak menular.'
    },
    reflection: {
      q1: 'Kemampuan dalam pemeliharaan ternak ruminansia dan pembuatan pakan fermentasi yang disukai hewan ternak.',
      q2: 'Sangat sesuai, karena sejak kecil saya suka berada di kandang dan ingin memodernisasi peternakan keluarga di desa.',
      q3: 'Wirausaha Peternak Kambing & Domba Modern (Breeding & Fattening).',
      q4: 'Memilih jalur WIRAUSAHA, karena ingin menciptakan lapangan kerja bagi pemuda di Kulon Progo dan mandiri finansial.',
      chosenPath: 'Wirausaha'
    },
    syncedToSpreadsheet: true
  },
  {
    id: 'sub-seed-2',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    student: {
      name: 'Siti Rahmawati',
      nisn: '0075432198',
      className: 'XI AT 3',
      major: 'Agribisnis Ternak (ATR)',
      school: 'SMK N 1 Nanggulan'
    },
    mapping: {
      potentials: ['Teliti saat pemeriksaan hewan', 'Suka biologi & sains', 'Bisa menyuntik dan vaksinasi ternak'],
      interests: ['Kesehatan hewan & paramedik', 'Kuliah Kedokteran Hewan', 'Riset pakan bernutrisi tinggi'],
      productiveSubjects: ['Kesehatan Ternak & Biosekuriti', 'Agribisnis Pembibitan Ternak', 'Agribisnis Ternak Unggas (ATU)'],
      customMajor: 'Agribisnis Ternak (ATR)',
      matchedCareers: [],
      selectedCareers: [
        {
          id: 'teknisi-kesehatan-hewan',
          title: 'Teknisi & Paramedik Kesehatan Hewan',
          sector: 'Kesehatan Hewan & Medik Veteriner',
          description: 'Melakukan penanganan kesehatan ternak dan biosekuriti.',
          requiredSkills: ['Biosekuriti', 'Vaksinasi', 'Inseminasi Buatan'],
          matchKeywords: ['kesehatan', 'hewan', 'obat'],
          suitablePaths: ['Bekerja', 'Kuliah'],
          growthProspects: 'Sangat Dicari',
          salaryOrIncomeEstimate: 'Rp 4.500.000 - Rp 9.000.000 / bulan',
          iconName: 'Stethoscope',
          tagColor: 'teal'
        }
      ],
      gapAnalysis: 'Perlu memperkuat pemahaman farmakologi/obat hewan serta nilai rapor untuk seleksi SNBP/SNBT perguruan tinggi.'
    },
    reflection: {
      q1: 'Kemampuan observasi gejala klinis penyakit ternak dan ketelitian dalam pemberian vaksin/dosis obat.',
      q2: 'Sesuai, saya merasa puas ketika bisa membantu hewan ternak yang sakit menjadi sehat kembali.',
      q3: 'Paramedik Veteriner / Melanjutkan Kuliah S1 Kedokteran Hewan.',
      q4: 'Memilih KULIAH (Kedokteran Hewan / D4 Kesehatan Hewan), ingin menjadi dokter hewan profesional di Kulon Progo.',
      chosenPath: 'Kuliah'
    },
    syncedToSpreadsheet: true
  },
  {
    id: 'sub-seed-3',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    student: {
      name: 'Bagas Aditya Nugraha',
      nisn: '0069988776',
      className: 'XI AT 3',
      major: 'Agribisnis Ternak (ATR)',
      school: 'SMK N 1 Nanggulan'
    },
    mapping: {
      potentials: ['Disiplin kerja lapangan', 'Fisik kuat dan tangguh', 'Paham operasional mesin kandang closed house'],
      interests: ['Bekerja di perusahaan peternakan besar', 'Manajemen operasional farm industri', 'Teknologi modern otomatisasi kandang'],
      productiveSubjects: ['Agribisnis Ternak Unggas (ATU)', 'Agribisnis Pakan Ternak', 'Pengolahan Hasil Peternakan'],
      customMajor: 'Agribisnis Ternak (ATR)',
      matchedCareers: [],
      selectedCareers: [
        {
          id: 'supervisor-farm-perusahaan',
          title: 'Supervisor / Farm Manager Perusahaan Peternakan',
          sector: 'Industri Korporasi Peternakan',
          description: 'Memimpin operasional peternakan komersial berskala industri.',
          requiredSkills: ['Leadership', 'Quality Control', 'SOP Industri'],
          matchKeywords: ['supervisor', 'industri', 'farm'],
          suitablePaths: ['Bekerja', 'Kuliah'],
          growthProspects: 'Tinggi',
          salaryOrIncomeEstimate: 'Rp 5.500.000 - Rp 14.000.000 / bulan',
          iconName: 'Building2',
          tagColor: 'blue'
        }
      ],
      gapAnalysis: 'Perlu meningkatkan kemampuan leadership, bahasa Inggris teknis, dan sertifikasi BNSP bidang peternakan.'
    },
    reflection: {
      q1: 'Kemampuan mengoperasikan peralatan kandang modern dan kedisiplinan jadwal pemberian pakan/air.',
      q2: 'Sesuai dengan target karir saya untuk langsung mandiri setelah lulus SMK.',
      q3: 'Teknisi / Supervisor Kandang di Perusahaan Peternakan (Japfa/Pokphand).',
      q4: 'Memilih BEKERJA langsung di industri peternakan besar untuk mengumpulkan modal dan pengalaman kerja nyata.',
      chosenPath: 'Bekerja'
    },
    syncedToSpreadsheet: true
  }
];

// Broadcast channel for real-time multi-tab cross-updates
let broadcastChannel: BroadcastChannel | null = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    broadcastChannel = new BroadcastChannel('peta_karirku_sync_channel');
  }
} catch (e) {
  console.warn('BroadcastChannel not supported', e);
}

const listeners: Set<() => void> = new Set();

export function subscribeToSubmissions(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners() {
  listeners.forEach(fn => fn());
  if (broadcastChannel) {
    broadcastChannel.postMessage({ type: 'SUBMISSION_UPDATED', timestamp: Date.now() });
  }
}

if (broadcastChannel) {
  broadcastChannel.onmessage = (ev) => {
    if (ev.data?.type === 'SUBMISSION_UPDATED') {
      listeners.forEach(fn => fn());
    }
  };
}

export const StorageService = {
  getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      if (data) return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_SETTINGS;
  },

  saveSettings(settings: AppSettings): void {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    notifyListeners();
  },

  getSubmissions(): AssessmentSubmission[] {
    try {
      const data = localStorage.getItem(SUBMISSIONS_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      // Initialize with seed submissions if empty
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(SEED_SUBMISSIONS));
      return SEED_SUBMISSIONS;
    } catch (e) {
      console.error(e);
      return SEED_SUBMISSIONS;
    }
  },

  async saveSubmission(submission: Omit<AssessmentSubmission, 'id' | 'createdAt'>): Promise<AssessmentSubmission> {
    const fullSubmission: AssessmentSubmission = {
      ...submission,
      id: 'sub-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      syncedToSpreadsheet: false
    };

    const currentList = this.getSubmissions();
    // Prepend new submission
    const updated = [fullSubmission, ...currentList.filter(s => s.student.nisn !== submission.student.nisn || s.student.name !== submission.student.name)];
    
    // Check if webhook is configured and dispatch in background
    const settings = this.getSettings();
    if (settings.googleSheetWebhookUrl) {
      sendToGoogleSheetWebhook(fullSubmission, settings.googleSheetWebhookUrl)
        .then(res => {
          if (res.success) {
            fullSubmission.syncedToSpreadsheet = true;
            this.updateSubmission(fullSubmission);
          }
        })
        .catch(err => console.error('Webhook error:', err));
    }

    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
    notifyListeners();
    return fullSubmission;
  },

  updateSubmission(submission: AssessmentSubmission): void {
    const list = this.getSubmissions();
    const updated = list.map(item => item.id === submission.id ? submission : item);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
    notifyListeners();
  },

  deleteSubmission(id: string): void {
    const list = this.getSubmissions();
    const updated = list.filter(item => item.id !== id);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
    notifyListeners();
  },

  clearAllSubmissions(): void {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify([]));
    notifyListeners();
  },

  resetToDemoData(): void {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(SEED_SUBMISSIONS));
    notifyListeners();
  },

  // Temporary draft session state so student doesn't lose progress on page refresh
  saveCurrentDraft(state: {
    student: StudentProfile;
    mapping: SelfMappingData;
    reflection: ReflectionData;
    activeTab: string;
    mappingStep: number;
  }) {
    try {
      sessionStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn(e);
    }
  },

  getCurrentDraft() {
    try {
      const data = sessionStorage.getItem(CURRENT_SESSION_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn(e);
    }
    return null;
  },

  clearCurrentDraft() {
    try {
      sessionStorage.removeItem(CURRENT_SESSION_KEY);
    } catch (e) {
      console.warn(e);
    }
  }
};
