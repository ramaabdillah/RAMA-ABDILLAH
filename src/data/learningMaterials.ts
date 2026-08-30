export interface MaterialSection {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  iconName: string;
  summary: string;
  content: {
    heading: string;
    points: {
      title: string;
      desc: string;
      icon: string;
      color: string;
    }[];
    takeaway: string;
  };
}

export const LEARNING_MATERIALS: MaterialSection[] = [
  {
    id: 'kenal-diri',
    title: '1. Kenapa Harus Kenal Diri Sendiri Dulu?',
    subtitle: 'Kunci Memilih Karir Tanpa Penyesalan',
    badge: 'Fondasi Utama',
    iconName: 'Sparkles',
    summary: 'Mengenal bakat, kemampuan, dan minat pribadi adalah fondasi agar karir yang kita pilih membahagiakan dan berkelanjutan.',
    content: {
      heading: '3 Komponen Kunci Pengenalan Diri:',
      points: [
        {
          title: 'Kemampuan (Ability)',
          desc: 'Keahlian nyata yang sudah kamu kuasai saat ini, baik lewat praktik di bengkel/kandang/lab sekolah maupun pengalaman sehari-hari.',
          icon: 'Brain',
          color: 'emerald'
        },
        {
          title: 'Bakat (Aptitude)',
          desc: 'Potensi alami yang membuatmu lebih cepat dan mudah memahami suatu hal dibanding orang lain jika dilatih secara konsisten.',
          icon: 'Flame',
          color: 'amber'
        },
        {
          title: 'Minat (Interest)',
          desc: 'Rasa suka, antusiasme, dan ketertarikan mendalam terhadap suatu bidang yang membuatmu betah melakukannya tanpa merasa terpaksa.',
          icon: 'Heart',
          color: 'rose'
        }
      ],
      takeaway: '💡 Rumus Karir Ideal: Kemampuan + Bakat + Minat = Karir yang Memuaskan dan Berprestasi!'
    }
  },
  {
    id: 'faktor-pengaruh',
    title: '2. Apa yang Memengaruhi Pilihan Karir?',
    subtitle: 'Faktor Internal dan Eksternal dalam Keputusan Karir',
    badge: 'Pemahaman Faktor',
    iconName: 'Compass',
    summary: 'Pilihan karir dipengaruhi oleh kombinasi faktor dari dalam diri kita sendiri dan lingkungan di sekitar kita.',
    content: {
      heading: 'Dua Sisi Faktor Penentu Karir:',
      points: [
        {
          title: 'Faktor Internal (Dari Dalam Diri)',
          desc: 'Minat sejati, cita-cita pribadi, nilai-nilai hidup (prinsip), serta kesiapan fisik dan mental dalam menghadapi tantangan profesi.',
          icon: 'UserCheck',
          color: 'blue'
        },
        {
          title: 'Faktor Keluarga & Orang Tua',
          desc: 'Harapan orang tua, dukungan finansial keluarga, serta tradisi atau latar belakang usaha keluarga yang bisa dikembangkan.',
          icon: 'Home',
          color: 'purple'
        },
        {
          title: 'Faktor Sekolah & Guru BK',
          desc: 'Jurusan SMK yang kamu pilih, bimbingan guru, pengalaman PKL/magang industri, serta keterampilan kejuruan yang diasah.',
          icon: 'GraduationCap',
          color: 'teal'
        },
        {
          title: 'Faktor Teman & Informasi Lapangan',
          desc: 'Pengaruh teman sebaya serta akses informasi mengenai prospek lowongan kerja, tren industri, dan peluang masa depan.',
          icon: 'TrendingUp',
          color: 'indigo'
        }
      ],
      takeaway: '🎯 Kuncinya: Dengarkan masukan orang tua dan guru, namun tetap pastikan pilihan tersebut selaras dengan potensi dirimu sendiri!'
    }
  },
  {
    id: 'arah-kelulusan',
    title: '3. Setelah Lulus SMK, Mau ke Mana?',
    subtitle: 'Mengenal 3 Jalur Masa Depan: BMW (Bekerja, Melanjutkan, Wirausaha)',
    badge: 'Opsi Masa Depan',
    iconName: 'Target',
    summary: 'Lulusan SMK memiliki keunggulan fleksibilitas: siap langsung kerja, siap kuliah, atau siap membangun usaha sendiri.',
    content: {
      heading: '3 Jalur Pilihan Lulusan SMK (BMW):',
      points: [
        {
          title: 'B — Bekerja (Dunia Kerja & Industri)',
          desc: 'Langsung terjun ke perusahaan, peternakan modern, bengkel resmi, atau instansi. Mengaplikasikan skill kejuruan dan mandiri secara finansial.',
          icon: 'Briefcase',
          color: 'emerald'
        },
        {
          title: 'M — Melanjutkan Studi (Kuliah D3/D4/S1)',
          desc: 'Memperdalam keilmuan spesifik di politeknik atau universitas (misal: S1 Kedokteran Hewan, D4 Peternakan, S1 Teknik), membuka karir level manajerial.',
          icon: 'BookOpen',
          color: 'blue'
        },
        {
          title: 'W — Wirausaha (Membangun Bisnis Sendiri)',
          desc: 'Menciptakan lapangan kerja sendiri (misal: budidaya ternak ruminansia/unggas, jualan olahan pangan, jasa service), berani berinovasi dan mandiri.',
          icon: 'Rocket',
          color: 'amber'
        }
      ],
      takeaway: '🚀 Tidak ada jalur yang lebih rendah atau lebih tinggi. Apapun pilihanmu (Bekerja, Kuliah, atau Wirausaha), yang terpenting adalah dipersiapkan sejak sekarang!'
    }
  }
];
