export type CareerPathType = 'Bekerja' | 'Kuliah' | 'Wirausaha';

export interface StudentProfile {
  name: string;
  nisn: string;
  className: string;
  major: string;
  school: string;
  submittedAt?: string;
}

export interface CareerItem {
  id: string;
  title: string;
  sector: string;
  description: string;
  requiredSkills: string[];
  matchKeywords: string[];
  suitablePaths: CareerPathType[];
  growthProspects: string;
  salaryOrIncomeEstimate: string;
  iconName: string;
  tagColor?: string;
  matchScore?: number;
  matchReasons?: string[];
}

export interface SelfMappingData {
  potentials: [string, string, string];
  interests: [string, string, string];
  productiveSubjects: [string, string, string];
  customMajor: string;
  matchedCareers: CareerItem[];
  selectedCareers: CareerItem[];
  gapAnalysis: string;
}

export interface ReflectionData {
  q1: string; // Potensi diri yang paling menonjol
  q2: string; // Kesesuaian potensi dengan peluang karir & mengapa
  q3: string; // Karir paling sesuai dari hasil pencocokan
  q4: string; // Arah karir/cita-cita sekarang & alasan
  chosenPath: CareerPathType | '';
}

export interface AssessmentSubmission {
  id: string;
  student: StudentProfile;
  mapping: SelfMappingData;
  reflection: ReflectionData;
  createdAt: string;
  syncedToSpreadsheet?: boolean;
  notesFromCounselor?: string;
}

export interface AppSettings {
  googleSheetWebhookUrl: string;
  schoolName: string;
  targetClass: string;
  bkTeacherName: string;
  enableSoundEffects: boolean;
}
