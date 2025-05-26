export enum AcademicProfilePlatform {
  SCOPUS = 'Scopus',
  GOOGLE_SCHOLAR = 'Google Scholar',
  ORCID = 'ORCID',
}

export interface AcademicProfileLink {
  platform: AcademicProfilePlatform | string;
  id: string;
  linked: boolean;
  url?: string;
  lastFetchedHIndex?: number;
}

export interface UserProfileData {
  id: string;
  username: string;
  email: string;
  institution?: string;
  fieldOfStudy?: string;
  bio?: string;
  avatarUrl?: string;
  credits: number;
  xp: number;
  level: number;
  rank: string;
  hIndex: number;
  citations: number;
  researchCredits: number;
  careerStage: string; 
  linkedProfiles: AcademicProfileLink[];
}

export interface TeamPlayer {
  id: string;
  name: string;
  role: string; 
  hIndex: number;
  papersPublished: number;
  avatarUrl: string;
  researchPotential?: number; 
}

export interface TeamData {
  id: string;
  name: string;
  managerName: string;
  budget: number;
  score: number;
  players: TeamPlayer[];
  logoUrl?: string;
}

export interface LeagueData {
  id:string;
  name: string;
  description: string;
  status: 'Public' | 'Private';
  scoringRules: string; 
  teams: TeamData[]; 
}

export interface TutorialData {
  id: string;
  title: string;
  description: string;
  contentPreview: string; 
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string; 
  xpReward: number;
}

export interface MarketplaceItem {
  id: string;
  researcherName: string;
  specialization: string;
  hIndex: number;
  cost: number; 
  availability: 'Available' | 'On Loan' | 'Unavailable';
  avatarUrl: string;
}

export interface NotificationMessage {
  id: string;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

export interface GeminiResponse {
    text: string;
}

export interface IconProps {
  className?: string;
}