// ============================================================================
// API Types - Based on OpenAPI spec from Spring Boot backend
// ============================================================================

// ── Authentication ──
export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  token: string
  userId: string
  username: string
  email: string
  expiresAt: string
}

// ── User ──
export interface User {
  id: string
  username: string
  email: string
}

// ── Sessions ──
export interface SessionSummary {
  id: string
  title: string
  moduleId: string
  moduleName: string
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
  duration: number
  completedAt?: string
}

export interface SessionDetail {
  id: string
  title: string
  description: string
  moduleId: string
  moduleName: string
  objectives: string[]
  duration: number
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
  progress: number
}

export interface ActiveSession {
  sessionId: string
  userId: string
  startedAt: string
  currentStep: number
  totalSteps: number
  messages: ChatMessage[]
}

export interface SessionModuleDto {
  id: string
  name: string
  description: string
  order: number
  sessions: SessionSummary[]
}

export interface SessionHistoryEntry {
  id: string
  sessionId: string
  sessionTitle: string
  startedAt: string
  completedAt?: string
  duration: number
  rating?: number
  notes?: string
}

// ── Chat ──
export interface ChatMessage {
  id?: string
  role: 'USER' | 'ASSISTANT'
  content: string
  timestamp: string
  metadata?: Record<string, unknown>
}

export interface ChatRequest {
  sessionId: string
  message: string
  context?: Record<string, unknown>
}

export interface ChatResponse {
  message: ChatMessage
  sessionProgress: number
  suggestedActions?: string[]
  isSessionComplete?: boolean
}

// ── Diary ──
export interface DiaryEntryCreate {
  situation: string
  automaticThoughts: string
  emotions: string[]
  emotionIntensity: number
  cognitiveDistortions?: string[]
  alternativeThought?: string
  moodBefore: number
  moodAfter?: number
}

export interface DiaryEntryResponse {
  id: string
  userId: string
  situation: string
  automaticThoughts: string
  emotions: string[]
  emotionIntensity: number
  cognitiveDistortions: string[]
  alternativeThought?: string
  moodBefore: number
  moodAfter?: number
  createdAt: string
  updatedAt: string
}

export interface DiaryEntrySummary {
  id: string
  situation: string
  emotions: string[]
  moodBefore: number
  moodAfter?: number
  createdAt: string
}

export interface DiaryEntryDetail extends DiaryEntryResponse {
  aiSuggestions?: DistortionSuggestion[]
}

export interface DiaryInsights {
  totalEntries: number
  averageMoodBefore: number
  averageMoodAfter: number
  moodImprovement: number
  commonDistortions: { distortion: string; count: number }[]
  commonEmotions: { emotion: string; count: number }[]
  weeklyTrend: { date: string; avgMood: number }[]
}

export interface DistortionSuggestion {
  distortionType: string
  confidence: number
  explanation: string
  reframeSuggestion: string
}

// ── Progress ──
export interface WeeklyProgress {
  userId: string
  weekStartDate: string
  weekEndDate: string
  sessionsCompleted: number
  sessionsTarget: number
  diaryEntriesCount: number
  averageMood: number
  moodTrend: number[]
  streakDays: number
  burnoutScore: number
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  name: string
  description: string
  earnedAt: string
  iconUrl?: string
}

export interface MonthlyTrend {
  month: string
  sessionsCompleted: number
  averageMood: number
  burnoutScore: number
}

export interface BurnoutRecovery {
  currentScore: number
  previousScore: number
  improvement: number
  weekNumber: number
  milestones: { week: number; score: number }[]
}

// ── Crisis Support ──
export interface CrisisDetectRequest {
  text: string
  context?: string
}

export interface CrisisDetectionResultDto {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  indicators: string[]
  recommendedActions: string[]
  emergencyResourcesShown: boolean
}

export interface SafetyPlanDto {
  id: string
  userId: string
  warningSignsPersonal: string[]
  copingStrategies: CopingStrategy[]
  distractionPeople: string[]
  distractionPlaces: string[]
  distractionActivities: string[]
  reasonsForLiving: string[]
  trustedContacts: TrustedContact[]
  professionalContacts: TrustedContact[]
  environmentSafety: string[]
  crisisHotlines: CrisisHotline[]
  updatedAt: string
}

export interface SafetyPlanUpdate {
  warningSignsPersonal?: string[]
  copingStrategies?: CopingStrategy[]
  distractionPeople?: string[]
  distractionPlaces?: string[]
  distractionActivities?: string[]
  reasonsForLiving?: string[]
  trustedContacts?: TrustedContact[]
  professionalContacts?: TrustedContact[]
  environmentSafety?: string[]
}

export interface CopingStrategy {
  id?: string
  name: string
  description: string
  category: string
}

export interface TrustedContact {
  id?: string
  name: string
  relationship: string
  phone?: string
  email?: string
}

export interface CrisisHotline {
  name: string
  phone: string
  available24h: boolean
  specialization?: string
}

// ── Pagination ──
export interface PageResponse<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
}

// ── Error Response ──
export interface ApiErrorResponse {
  status: number
  error: string
  message: string
  timestamp: string
  path?: string
  validationErrors?: Record<string, string>
}
