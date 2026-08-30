import { AssessmentSubmission } from '../types';

/**
 * Generates CSV content with UTF-8 BOM for Microsoft Excel & Google Sheets compatibility
 */
export function generateCsvContent(submissions: AssessmentSubmission[]): string {
  const headers = [
    'No',
    'Waktu Submit',
    'Nama Siswa',
    'Kelas',
    'NISN/No Absen',
    'Jurusan',
    'Sekolah',
    'Bakat/Kemampuan 1',
    'Bakat/Kemampuan 2',
    'Bakat/Kemampuan 3',
    'Minat 1',
    'Minat 2',
    'Minat 3',
    'Mapel Produktif 1',
    'Mapel Produktif 2',
    'Mapel Produktif 3',
    'Profesi Terpilih 1',
    'Profesi Terpilih 2',
    'Hal yang Perlu Dikembangkan (Gap Analysis)',
    'Arah Karir Utama (Bekerja/Kuliah/Wirausaha)',
    'Refleksi Q1 (Potensi Menonjol)',
    'Refleksi Q2 (Kesesuaian Peluang Karir & Alasan)',
    'Refleksi Q3 (Karir Paling Sesuai)',
    'Refleksi Q4 (Pilihan Cita-Cita & Alasan)'
  ];

  const escapeCsv = (val: string | undefined | null) => {
    if (!val) return '""';
    const sanitized = String(val).replace(/"/g, '""').replace(/\r\n|\n|\r/g, ' ');
    return `"${sanitized}"`;
  };

  const rows = submissions.map((sub, idx) => {
    const p = sub.student;
    const m = sub.mapping;
    const r = sub.reflection;
    const prof1 = m.selectedCareers?.[0]?.title || '-';
    const prof2 = m.selectedCareers?.[1]?.title || '-';

    return [
      idx + 1,
      escapeCsv(new Date(sub.createdAt).toLocaleString('id-ID')),
      escapeCsv(p.name),
      escapeCsv(p.className),
      escapeCsv(p.nisn),
      escapeCsv(p.major || m.customMajor),
      escapeCsv(p.school),
      escapeCsv(m.potentials[0]),
      escapeCsv(m.potentials[1]),
      escapeCsv(m.potentials[2]),
      escapeCsv(m.interests[0]),
      escapeCsv(m.interests[1]),
      escapeCsv(m.interests[2]),
      escapeCsv(m.productiveSubjects[0]),
      escapeCsv(m.productiveSubjects[1]),
      escapeCsv(m.productiveSubjects[2]),
      escapeCsv(prof1),
      escapeCsv(prof2),
      escapeCsv(m.gapAnalysis),
      escapeCsv(r.chosenPath),
      escapeCsv(r.q1),
      escapeCsv(r.q2),
      escapeCsv(r.q3),
      escapeCsv(r.q4)
    ].join(',');
  });

  // \uFEFF is the UTF-8 BOM so Excel opens it with proper encoding
  return '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
}

/**
 * Triggers a browser download of the CSV spreadsheet
 */
export function downloadSpreadsheetFile(submissions: AssessmentSubmission[], className: string = 'XI_AT_3') {
  const csvContent = generateCsvContent(submissions);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0, 10);
  link.setAttribute('href', url);
  link.setAttribute('download', `Rekap_Peta_Karirku_${className}_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Formats table for direct copy-paste into Google Sheets / Excel (TSV format)
 */
export function copySpreadsheetToClipboard(submissions: AssessmentSubmission[]): Promise<boolean> {
  const headers = [
    'No',
    'Waktu Submit',
    'Nama Siswa',
    'Kelas',
    'NISN',
    'Jurusan',
    'Bakat 1',
    'Bakat 2',
    'Bakat 3',
    'Minat 1',
    'Minat 2',
    'Minat 3',
    'Mapel 1',
    'Mapel 2',
    'Mapel 3',
    'Profesi Pilihan',
    'Rencana Pengembangan',
    'Arah Karir (BMW)',
    'Refleksi Cita-cita'
  ];

  const rows = submissions.map((sub, idx) => {
    const p = sub.student;
    const m = sub.mapping;
    const r = sub.reflection;
    const profs = (m.selectedCareers || []).map(c => c.title).join('; ');
    return [
      idx + 1,
      new Date(sub.createdAt).toLocaleDateString('id-ID'),
      p.name,
      p.className,
      p.nisn,
      p.major || m.customMajor,
      m.potentials[0] || '',
      m.potentials[1] || '',
      m.potentials[2] || '',
      m.interests[0] || '',
      m.interests[1] || '',
      m.interests[2] || '',
      m.productiveSubjects[0] || '',
      m.productiveSubjects[1] || '',
      m.productiveSubjects[2] || '',
      profs,
      m.gapAnalysis || '',
      r.chosenPath || '',
      r.q4 || ''
    ].map(v => String(v).replace(/\t|\r|\n/g, ' ')).join('\t');
  });

  const tsvText = [headers.join('\t'), ...rows].join('\n');
  return navigator.clipboard.writeText(tsvText).then(() => true).catch(() => false);
}

/**
 * Sends a single submission to a Google Apps Script Webhook
 */
export async function sendToGoogleSheetWebhook(
  submission: AssessmentSubmission,
  webhookUrl: string
): Promise<{ success: boolean; message?: string }> {
  if (!webhookUrl || !webhookUrl.startsWith('http')) {
    return { success: false, message: 'URL Webhook belum diisi atau tidak valid' };
  }

  try {
    const payload = {
      timestamp: new Date().toISOString(),
      studentName: submission.student.name,
      className: submission.student.className,
      nisn: submission.student.nisn,
      major: submission.student.major,
      school: submission.student.school,
      potentials: submission.mapping.potentials.join(', '),
      interests: submission.mapping.interests.join(', '),
      productiveSubjects: submission.mapping.productiveSubjects.join(', '),
      selectedCareers: (submission.mapping.selectedCareers || []).map(c => c.title).join(', '),
      gapAnalysis: submission.mapping.gapAnalysis,
      chosenPath: submission.reflection.chosenPath,
      reflectionQ1: submission.reflection.q1,
      reflectionQ2: submission.reflection.q2,
      reflectionQ3: submission.reflection.q3,
      reflectionQ4: submission.reflection.q4,
    };

    // Use mode: 'no-cors' for Google Apps Script Webhook to avoid CORS blocks
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      mode: 'no-cors'
    });

    return { success: true, message: 'Berhasil dikirim ke Google Spreadsheet!' };
  } catch (err) {
    console.error('Failed to post to webhook', err);
    return { success: false, message: 'Gagal mengirim data ke spreadsheet' };
  }
}

/**
 * Google Apps Script Template that the teacher can copy-paste into Extensions > Apps Script
 */
export const GOOGLE_APPS_SCRIPT_SAMPLE = `
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Hasil Asesmen BK") || ss.getActiveSheet();
    
    // Buat header jika sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Waktu Input", "Nama Siswa", "Kelas", "NISN", "Jurusan", "Sekolah",
        "Potensi/Bakat", "Minat", "Mapel Produktif", "Profesi Pilihan",
        "Rencana Pengembangan", "Arah Karir (BMW)", "Refleksi Diri", "Cita-cita Akhir"
      ]);
      sheet.getRange(1, 1, 1, 14).setFontWeight("bold").setBackground("#d1fae5");
    }
    
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.studentName,
      data.className,
      data.nisn,
      data.major,
      data.school,
      data.potentials,
      data.interests,
      data.productiveSubjects,
      data.selectedCareers,
      data.gapAnalysis,
      data.chosenPath,
      data.reflectionQ1,
      data.reflectionQ4
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
`.trim();
