import { TeamData, LeagueData, TutorialData, MarketplaceItem, NotificationMessage, TeamPlayer, AcademicProfilePlatform } from './types';

export const MOCK_TEAM_PLAYERS: TeamPlayer[] = [
  { id: 'player1', name: 'Dr. Eva Core', role: 'Lead PI', hIndex: 25, papersPublished: 60, avatarUrl: 'https://picsum.photos/seed/eva/100/100', researchPotential: 90 },
  { id: 'player2', name: 'Alex Byte', role: 'Post-doc', hIndex: 12, papersPublished: 20, avatarUrl: 'https://picsum.photos/seed/alex/100/100', researchPotential: 75 },
  { id: 'player3', name: 'Sam Query', role: 'PhD Student', hIndex: 5, papersPublished: 8, avatarUrl: 'https://picsum.photos/seed/sam/100/100', researchPotential: 80 },
];

export const MOCK_TEAM: TeamData = {
  id: 'teamAFL',
  name: 'QuantumLeapers Lab',
  managerName: 'DrResearch',
  budget: 50, 
  score: 1250,
  players: MOCK_TEAM_PLAYERS,
  logoUrl: 'https://picsum.photos/seed/qllab/150/150'
};

export const MOCK_TEAMS_FOR_LEAGUE: TeamData[] = [
  MOCK_TEAM,
  { id: 'teamB', name: 'BioInnovators', managerName: 'Prof. Genesis', budget: 60, score: 1100, players: [
    { id: 'playerB1', name: 'Dr. Helix', role: 'Senior Researcher', hIndex: 22, papersPublished: 55, avatarUrl: 'https://picsum.photos/seed/helix/100/100' },
    { id: 'playerB2', name: 'Gene Script', role: 'Lab Tech', hIndex: 3, papersPublished: 5, avatarUrl: 'https://picsum.photos/seed/gene/100/100' },
  ], logoUrl: 'https://picsum.photos/seed/bioinn/150/150' },
  { id: 'teamC', name: 'DataDiggers', managerName: 'Dr. Stats', budget: 45, score: 950, players: [
     { id: 'playerC1', name: 'Algo Rithm', role: 'Data Scientist', hIndex: 18, papersPublished: 30, avatarUrl: 'https://picsum.photos/seed/algo/100/100' },
  ], logoUrl: 'https://picsum.photos/seed/datadg/150/150' },
];

export const MOCK_LEAGUE: LeagueData = {
  id: 'leagueAlpha',
  name: 'Innovators League Season 1',
  description: 'Compete to be the most impactful research group of the season!',
  status: 'Public',
  scoringRules: 'Points for H-index growth, publications, and conference presentations.',
  teams: MOCK_TEAMS_FOR_LEAGUE,
};

export const MOCK_TUTORIALS: TutorialData[] = [
  { id: 'tut1', title: 'Understanding Your H-index', description: 'Learn what the H-index means and how it impacts your academic career.', contentPreview: 'The h-index is a metric for evaluating the cumulative impact of an author\'s scholarly output...', difficulty: 'Beginner', duration: '20 mins', xpReward: 50 },
  { id: 'tut2', title: 'Maximizing Research Impact', description: 'Strategies to increase the visibility and impact of your research.', contentPreview: 'Effective dissemination strategies include open access publishing, presenting at conferences...', difficulty: 'Intermediate', duration: '45 mins', xpReward: 100 },
  { id: 'tut3', title: 'Advanced Grant Proposal Writing', description: 'Craft compelling grant proposals that get funded.', contentPreview: 'Key sections of a grant proposal include the abstract, specific aims, research strategy...', difficulty: 'Advanced', duration: '1 hour 30 mins', xpReward: 200 },
];

export const MOCK_MARKETPLACE_ITEMS: MarketplaceItem[] = [
  { id: 'market1', researcherName: 'Dr. C. Lorentz', specialization: 'Theoretical Physics', hIndex: 35, cost: 35, availability: 'Available', avatarUrl: 'https://picsum.photos/seed/lorentz/100/100' },
  { id: 'market2', researcherName: 'Dr. A. Turing', specialization: 'Computer Science', hIndex: 40, cost: 40, availability: 'Available', avatarUrl: 'https://picsum.photos/seed/turing/100/100' },
  { id: 'market3', researcherName: 'Dr. R. Franklin', specialization: 'Molecular Biology', hIndex: 28, cost: 28, availability: 'On Loan', avatarUrl: 'https://picsum.photos/seed/franklin/100/100' },
];

export const MOCK_NOTIFICATIONS: NotificationMessage[] = [
  { id: 'notif1', text: 'New Publication "Quantum Entanglement in Bio-systems" by Dr. Eva Core added!', type: 'info', timestamp: new Date(Date.now() - 3600000), read: false },
  { id: 'notif2', text: 'Your H-index was updated to 16 from Scopus.', type: 'success', timestamp: new Date(Date.now() - 7200000), read: true },
  { id: 'notif3', text: 'Team "QuantumLeapers Lab" is now ranked #1 in Innovators League!', type: 'success', timestamp: new Date(Date.now() - 10800000), read: false },
];

export const GEMINI_API_KEY_ENV_VAR = 'API_KEY'; 

export const DEFAULT_USER_AVATAR = 'https://picsum.photos/seed/defaultuser/200/200';
export const DEFAULT_TEAM_LOGO = 'https://picsum.photos/seed/defaultteam/150/150';

export const RESEARCH_ASSISTANT_MODEL = 'gemini-2.5-flash-preview-04-17';
export const IMAGE_GENERATION_MODEL = 'imagen-3.0-generate-002'; 

export const LEVEL_THRESHOLDS = [0, 100, 500, 1000, 2000, 5000, 10000, 20000]; // XP for each level (level 1 starts at 0 XP)
export const RANKS = ['Novice Researcher', 'Junior Scholar', 'Researcher', 'Senior Researcher', 'Principal Investigator', 'Associate Professor', 'Distinguished Professor', 'Academic Legend'];

export const SUPPORTED_PROFILE_SOURCES = [
    { name: AcademicProfilePlatform.SCOPUS, idPrefix: 'Author ID: ', placeholder: 'e.g., 12345678900' },
    { name: AcademicProfilePlatform.GOOGLE_SCHOLAR, idPrefix: 'Profile URL: ', placeholder: 'e.g., https://scholar.google.com/citations?user=yourid' },
    { name: AcademicProfilePlatform.ORCID, idPrefix: 'ORCID iD: ', placeholder: 'e.g., 0000-0001-2345-6789' },
];