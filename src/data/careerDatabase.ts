import { CareerItem } from '../types';

export const CAREER_DATABASE: CareerItem[] = [
  // Bidang Agribisnis Ternak & Hewan (ATR / Peternakan)
  {
    id: 'peternak-mandiri',
    title: 'Peternak Modern & Wirausaha Agribisnis',
    sector: 'Agribisnis & Peternakan',
    description: 'Mengelola usaha budidaya ternak unggas, ruminansia (sapi, kambing, domba), atau satwa harapan dengan manajemen pakan, kandang tertutup (closed house), dan teknologi digital.',
    requiredSkills: ['Manajemen Pemeliharaan Ternak', 'Agribisnis Pakan', 'Analisis Finansial Usaha', 'Manajemen Kandang Modern'],
    matchKeywords: ['ternak', 'ruminansia', 'sapi', 'kambing', 'domba', 'unggas', 'ayam', 'pakan', 'kandang', 'wirausaha', 'bisnis', 'agribisnis', 'breeding', 'pembibitan', 'penggemukan', 'modal', 'mandiri', 'kebun', 'lapangan', 'hewan', 'usaha'],
    suitablePaths: ['Wirausaha', 'Bekerja'],
    growthProspects: 'Tinggi — Permintaan daging, telur, dan susu terus meningkat nasional.',
    salaryOrIncomeEstimate: 'Rp 6.000.000 - Rp 25.000.000+ / bulan',
    iconName: 'Beef',
    tagColor: 'emerald'
  },
  {
    id: 'teknisi-kesehatan-hewan',
    title: 'Teknisi & Paramedik Kesehatan Hewan (Animal Health Specialist)',
    sector: 'Kesehatan Hewan & Medik Veteriner',
    description: 'Melakukan penanganan kesehatan ternak, pencegahan penyakit, vaksinasi, inseminasi buatan (IB), sanitasi biosekuriti, dan pertolongan pertama pada hewan ternak.',
    requiredSkills: ['Biosekuriti & Vaksinasi', 'Inseminasi Buatan', 'Diagnosa Penyakit Hewan Dasar', 'Kesehatan Ternak'],
    matchKeywords: ['kesehatan', 'obat', 'penyakit', 'vaksin', 'hewan', 'suntik', 'inseminasi', 'ib', 'biosekuriti', 'paramedik', 'medis', 'rawat', 'anatomi', 'laboratorium', 'klinik', 'reproduksi', 'dokter'],
    suitablePaths: ['Bekerja', 'Kuliah'],
    growthProspects: 'Sangat Dicari di feedlot, breeding farm, dan dinas peternakan daerah.',
    salaryOrIncomeEstimate: 'Rp 4.500.000 - Rp 9.000.000 / bulan',
    iconName: 'Stethoscope',
    tagColor: 'teal'
  },
  {
    id: 'pengusaha-olahan-ternak',
    title: 'Pengusaha & Produser Olahan Hasil Ternak',
    sector: 'Teknologi Pangan & Agroindustri',
    description: 'Mengolah hasil peternakan menjadi produk bernilai tambah tinggi seperti keju, yoghurt, dendeng, sosis, bakso, susu pasteurisasi, hingga olahan kulit ternak.',
    requiredSkills: ['Pengolahan Hasil Ternak', 'Food Safety & Hygiene', 'Packaging & Branding', 'Pemasaran Produk Pangan'],
    matchKeywords: ['olah', 'olahan', 'daging', 'susu', 'telur', 'kulit', 'pangan', 'makanan', 'yoghurt', 'keju', 'sosis', 'frozen food', 'kemasan', 'produk', 'boga', 'masak', 'kuliner', 'bisnis', 'jual'],
    suitablePaths: ['Wirausaha', 'Bekerja'],
    growthProspects: 'Berkembang pesat seiring tren makanan sehat dan packaged food lokal.',
    salaryOrIncomeEstimate: 'Rp 5.000.000 - Rp 20.000.000+ / bulan',
    iconName: 'UtensilsCrossed',
    tagColor: 'amber'
  },
  {
    id: 'supervisor-farm-perusahaan',
    title: 'Supervisor / Farm Manager Perusahaan Peternakan',
    sector: 'Industri Korporasi Peternakan',
    description: 'Memimpin operasional peternakan komersial berskala industri (seperti Japfa, Charoen Pokphand, CJ Feed, Malindo) dari pembibitan, penggemukan, hingga panen.',
    requiredSkills: ['Leadership', 'Quality Control Ternak', 'SOP Industri', 'Pencatatan Data Recording'],
    matchKeywords: ['supervisor', 'manager', 'perusahaan', 'industri', 'farm', 'recording', 'data', 'sop', 'unggas', 'ruminansia', 'organisasi', 'pimpin', 'tim', 'kontrol', 'kualitas', 'kemitraan'],
    suitablePaths: ['Bekerja', 'Kuliah'],
    growthProspects: 'Jenjang karir profesional luas dengan fasilitas industri.',
    salaryOrIncomeEstimate: 'Rp 5.500.000 - Rp 14.000.000 / bulan',
    iconName: 'Building2',
    tagColor: 'blue'
  },
  {
    id: 'penyuluh-peternakan-agribisnis',
    title: 'Penyuluh & Konsultan Lapangan Peternakan (Field Officer)',
    sector: 'Pemberdayaan & Layanan Publik',
    description: 'Mendampingi kelompok tani/ternak desa, memberikan edukasi teknologi pakan fermentasi (silase/hay), biosekuriti, serta memfasilitasi program bantuan peternakan.',
    requiredSkills: ['Komunikasi Publik', 'Edukasi Petani', 'Teknologi Pakan Fermentasi', 'Sosial-Ekonomi Pertanian'],
    matchKeywords: ['penyuluh', 'sosial', 'komunikasi', 'bicara', 'kelompok', 'edukasi', 'konsultan', 'desa', 'petani', 'dinas', 'pemerintah', 'mengajar', 'pelatihan', 'public speaking'],
    suitablePaths: ['Bekerja', 'Kuliah'],
    growthProspects: 'Dibutuhkan instansi pemerintah, BUMN agribisnis, dan LSM pemberdayaan.',
    salaryOrIncomeEstimate: 'Rp 4.000.000 - Rp 8.500.000 / bulan',
    iconName: 'Users',
    tagColor: 'indigo'
  },
  {
    id: 'formulator-pakan-ternak',
    title: 'Formulator & Teknisi Pakan Ternak (Feed Mill Specialist)',
    sector: 'Industri Pakan & Nutrisi Ternak',
    description: 'Merancang komposisi nutrisi pakan berkualitas tinggi berbasis bahan lokal atau industri feedmill, pengujian kadar protein pakan, dan efisiensi konversi pakan (FCR).',
    requiredSkills: ['Nutrisi Ternak', 'Formulasi Pakan', 'Analisis Laboratorium Pakan', 'Teknologi Silase & Konsentrat'],
    matchKeywords: ['pakan', 'nutrisi', 'formula', 'protein', 'konsentrat', 'silase', 'laboratorium', 'kimia', 'hitung', 'fcr', 'feedmill', 'pabrik', 'campuran', 'bahan baku'],
    suitablePaths: ['Bekerja', 'Kuliah'],
    growthProspects: 'Kunci efisiensi industri peternakan, selalu dibutuhkan pabrik pakan.',
    salaryOrIncomeEstimate: 'Rp 4.500.000 - Rp 10.000.000 / bulan',
    iconName: 'FlaskConical',
    tagColor: 'purple'
  },
  {
    id: 'akademisi-dokter-hewan',
    title: 'Mahasiswa Lanjutan / Calon Dokter Hewan & Sarjana Peternakan',
    sector: 'Pendidikan Tinggi & Riset Akademik',
    description: 'Melanjutkan studi ke jenjang D4/S1 Kedokteran Hewan atau Ilmu Peternakan untuk menjadi peneliti, dosen, dokter hewan praktik mandiri, atau staf ahli kementerian.',
    requiredSkills: ['Penelitian Ilmiah', 'Biologi Molekuler Hewan', 'Bedah Medik Veteriner', 'Analisis Data Akademik'],
    matchKeywords: ['kuliah', 'sarjana', 'dokter hewan', 'veteriner', 'universitas', 'peneliti', 'studi', 'belajar', 'ilmu', 'dosen', 'riset', 'akademik', 'buku', 'biologi', 'sains'],
    suitablePaths: ['Kuliah'],
    growthProspects: 'Peluang prestisius dengan sertifikasi profesi dokter hewan resmi.',
    salaryOrIncomeEstimate: 'Investasi Masa Depan / Profesi Spesialis',
    iconName: 'GraduationCap',
    tagColor: 'violet'
  },
  {
    id: 'marketer-agribisnis-digital',
    title: 'Digital Marketer & Distributor Produk Peternakan',
    sector: 'Pemasaran Digital & Distribusi',
    description: 'Memasarkan hasil ternak (daging kurban, bibit ternak, telur omega, pupuk organik feses ternak) melalui e-commerce, media sosial, dan platform marketplace modern.',
    requiredSkills: ['Digital Marketing', 'Sosial Media Content', 'Copywriting & Penjualan', 'Manajemen Distribusi'],
    matchKeywords: ['digital', 'online', 'medsos', 'pemasaran', 'jual', 'konten', 'marketing', 'distribusi', 'kurban', 'marketplace', 'foto', 'video', 'kreatif', 'komunikasi'],
    suitablePaths: ['Wirausaha', 'Bekerja'],
    growthProspects: 'Menjembatani peternak langsung ke konsumen akhir tanpa perantara rugi.',
    salaryOrIncomeEstimate: 'Rp 4.500.000 - Rp 15.000.000+ / bulan',
    iconName: 'Share2',
    tagColor: 'rose'
  },

  // Jurusan & Minat Lainnya (Generik SMK / Multi-Disiplin)
  {
    id: 'software-web-developer',
    title: 'Software Developer & Programmer IT',
    sector: 'Teknologi Informasi & Rekayasa Perangkat Lunak',
    description: 'Membangun aplikasi website, mobile, atau sistem manajemen database untuk bisnis, industri smart-farming, dan startup.',
    requiredSkills: ['Coding / Pemrograman', 'Algoritma & Logika', 'Database Management', 'Problem Solving'],
    matchKeywords: ['it', 'coding', 'komputer', 'rpl', 'program', 'software', 'web', 'aplikasi', 'logika', 'matematika', 'teknologi', 'database', 'laptop'],
    suitablePaths: ['Bekerja', 'Kuliah', 'Wirausaha'],
    growthProspects: 'Tinggi secara global dan industri lokal.',
    salaryOrIncomeEstimate: 'Rp 6.000.000 - Rp 18.000.000 / bulan',
    iconName: 'Code',
    tagColor: 'cyan'
  },
  {
    id: 'teknisi-otomotif-mesin',
    title: 'Teknisi Kendaraan & Alat Mekanisasi Modern',
    sector: 'Otomotif & Mekanikal Teknik',
    description: 'Perawatan dan perbaikan mesin kendaraan, traktor pertanian, alat transportasi logistik, dan sistem kelistrikan mesin.',
    requiredSkills: ['Diagnosa Mesin', 'Perawatan Kendaraan', 'Sistem Kelistrikan Otomotif', 'Penggunaan Tooling Presisi'],
    matchKeywords: ['mesin', 'otomotif', 'motor', 'mobil', 'bengkel', 'tata mekanik', 'servis', 'alat berat', 'perbaikan', 'listrik', 'teknik'],
    suitablePaths: ['Bekerja', 'Wirausaha'],
    growthProspects: 'Permintaan stabil di bengkel resmi maupun wirausaha mandiri.',
    salaryOrIncomeEstimate: 'Rp 4.000.000 - Rp 10.000.000 / bulan',
    iconName: 'Wrench',
    tagColor: 'amber'
  },
  {
    id: 'chef-kuliner-tataboga',
    title: 'Chef Profesional & Wirausaha Kuliner (Culinary Artist)',
    sector: 'Pariwisata & Kuliner',
    description: 'Meracik masakan berkualitas, kreasi menu restoran, pengawasan dapur komersial, atau mendirikan kedai kuliner unik.',
    requiredSkills: ['Teknik Memasak', 'Kreativitas Resep', 'Higienitas Sanitasi', 'Costing & Manajemen Dapur'],
    matchKeywords: ['masak', 'kuliner', 'boga', 'makanan', 'restoran', 'kue', 'roti', 'dapur', 'resep', 'chef', 'cafe', 'pangan', 'saji'],
    suitablePaths: ['Bekerja', 'Wirausaha', 'Kuliah'],
    growthProspects: 'Industri pariwisata dan F&B yang dinamis.',
    salaryOrIncomeEstimate: 'Rp 4.000.000 - Rp 12.000.000 / bulan',
    iconName: 'ChefHat',
    tagColor: 'orange'
  },
  {
    id: 'staf-akuntansi-keuangan',
    title: 'Staf Administrasi & Keuangan Bisnis (Financial Analyst Junior)',
    sector: 'Bisnis, Manajemen & Keuangan',
    description: 'Menyusun laporan keuangan, pembukuan jurnal, perhitungan pajak, dan pengelolaan kas usaha dengan software akuntansi.',
    requiredSkills: ['Pembukuan Akuntansi', 'Microsoft Excel / Spreadsheet', 'Ketelitian Data', 'Laporan Finansial'],
    matchKeywords: ['hitung', 'uang', 'akuntansi', 'keuangan', 'laporan', 'jurnal', 'excel', 'teliti', 'kantor', 'administrasi', 'pajak', 'kasir'],
    suitablePaths: ['Bekerja', 'Kuliah'],
    growthProspects: 'Setiap entitas bisnis dan UMKM memerlukan pencatatan finansial.',
    salaryOrIncomeEstimate: 'Rp 4.000.000 - Rp 8.000.000 / bulan',
    iconName: 'Calculator',
    tagColor: 'emerald'
  }
];

export const PRESET_PRODUCTIVE_SUBJECTS = {
  ATR: [
    'Agribisnis Ternak Ruminansia (ATR)',
    'Agribisnis Ternak Unggas (ATU)',
    'Agribisnis Pakan Ternak',
    'Kesehatan Ternak & Biosekuriti',
    'Agribisnis Pembibitan Ternak',
    'Agribisnis Aneka Ternak (Kelinci, Puyuh, Lebah)',
    'Pengolahan Hasil Peternakan'
  ],
  TKJ_RPL: [
    'Pemrograman Web dan Perangkat Bergerak',
    'Basis Data (Database)',
    'Administrasi Infrastruktur Jaringan',
    'Teknologi Layanan Jaringan',
    'Keamanan Jaringan Komputer'
  ],
  OTOMOTIF: [
    'Pemeliharaan Mesin Kendaraan Ringan',
    'Pemeliharaan Sasis & Pemindah Tenaga',
    'Pemeliharaan Kelistrikan Kendaraan',
    'Teknologi Dasar Otomotif'
  ],
  BISNIS: [
    'Bisnis Online & Digital Marketing',
    'Pengelolaan Bisnis Ritel',
    'Penataan Produk (Visual Merchandising)',
    'Administrasi Transaksi'
  ],
  TATA_BOGA: [
    'Tata Hidang & Pelayanan',
    'Pengolahan & Penyajian Makanan',
    'Produk Pastry & Bakery',
    'Food Sanitation & Hygiene'
  ]
};

export const COMMON_POTENTIALS = [
  'Telaten & suka merawat hewan ternak',
  'Kemampuan komunikasi & bernegosiasi',
  'Disiplin waktu & tangguh di lapangan',
  'Kreatif dalam membuat ide/produk baru',
  'Kemampuan analisis & hitungan data',
  'Kepemimpinan & kerja sama tim',
  'Keterampilan teknis & mekanik alat',
  'Cepat beradaptasi dengan teknologi baru'
];

export const COMMON_INTERESTS = [
  'Beternak & mengelola usaha mandiri',
  'Penanganan kesehatan hewan & medik',
  'Kuliah ke perguruan tinggi / kedokteran hewan',
  'Mencoba resep & olahan makanan baru',
  'Pemasaran online & konten media sosial',
  'Bekerja di industri korporasi besar',
  'Membantu & mengedukasi masyarakat desa',
  'Mengembangkan teknologi & inovasi praktis'
];

/**
 * Intelligent Keyword Matching Engine
 */
export function matchCareers(
  potentials: string[],
  interests: string[],
  subjects: string[],
  customMajor?: string
): CareerItem[] {
  // Extract and clean all tokens from inputs
  const allTokens = [...potentials, ...interests, ...subjects, customMajor || '']
    .join(' ')
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2);

  const scoredCareers = CAREER_DATABASE.map(career => {
    let score = 0;
    const matchReasons: string[] = [];

    // Match keywords against student tokens
    career.matchKeywords.forEach(keyword => {
      const lowerKeyword = keyword.toLowerCase();
      allTokens.forEach(token => {
        if (token.includes(lowerKeyword) || lowerKeyword.includes(token)) {
          score += 3;
        }
      });
    });

    // Check subjects overlap
    subjects.forEach(subject => {
      if (subject.trim()) {
        const subLower = subject.toLowerCase();
        if (
          career.matchKeywords.some(kw => subLower.includes(kw)) ||
          career.requiredSkills.some(skill => skill.toLowerCase().includes(subLower) || subLower.includes(skill.toLowerCase()))
        ) {
          score += 4;
          matchReasons.push(`Sesuai dengan mapel produktif: ${subject}`);
        }
      }
    });

    // Check potentials & interests
    potentials.forEach(p => {
      if (p.trim()) {
        const pLower = p.toLowerCase();
        if (career.matchKeywords.some(kw => pLower.includes(kw))) {
          score += 3;
          matchReasons.push(`Cocok dengan bakat: "${p}"`);
        }
      }
    });

    interests.forEach(interest => {
      if (interest.trim()) {
        const iLower = interest.toLowerCase();
        if (career.matchKeywords.some(kw => iLower.includes(kw))) {
          score += 3;
          matchReasons.push(`Sesuai dengan minat: "${interest}"`);
        }
      }
    });

    // Base relevance boost for Agribisnis default if tokens are sparse
    if (career.sector.includes('Agribisnis') || career.sector.includes('Peternakan')) {
      score += 1;
    }

    const uniqueReasons = Array.from(new Set(matchReasons)).slice(0, 3);

    return {
      ...career,
      matchScore: score,
      matchReasons: uniqueReasons.length > 0 ? uniqueReasons : [
        `Memiliki prospek cerah sesuai latar belakang SMK`,
        `Keterampilan ${career.requiredSkills[0]} relevan dipelajari`
      ]
    };
  });

  // Sort descending by match score
  scoredCareers.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  // Return top 6 - 8 results
  return scoredCareers.slice(0, 7);
}
