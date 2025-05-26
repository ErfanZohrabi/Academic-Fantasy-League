import React, { createContext, useState, useContext, ReactNode } from 'react';
import { UserProfileData, AcademicProfileLink, AcademicProfilePlatform } from '../types';
import { LEVEL_THRESHOLDS, RANKS } from '../constants';

interface UserContextType {
  user: UserProfileData | null;
  updateHIndex: (newHIndex: number) => void;
  addCredits: (amount: number) => void;
  linkProfile: (platform: AcademicProfilePlatform | string, id: string, hIndex?: number) => void;
  unlinkProfile: (platform: AcademicProfilePlatform | string) => void;
}

const mockUser: UserProfileData = {
  id: 'user123',
  username: 'DrResearch',
  email: 'dr.research@example.com',
  institution: 'University of Innovation',
  fieldOfStudy: 'Computational Biology',
  bio: 'Passionate about advancing science through collaboration and gamification. Seeking to unravel the mysteries of the universe, one dataset at a time.',
  avatarUrl: 'https://picsum.photos/seed/user123/200/200',
  credits: 150,
  xp: 2500,
  level: 5, // Corresponds to XP 2500 in LEVEL_THRESHOLDS (index 4) -> Rank 'Principal Investigator'
  rank: RANKS[4], 
  hIndex: 15,
  citations: 1200,
  researchCredits: 75,
  careerStage: 'Established Researcher',
  linkedProfiles: [
    { platform: AcademicProfilePlatform.SCOPUS, id: '123456789', linked: true, lastFetchedHIndex: 15 },
    { platform: AcademicProfilePlatform.GOOGLE_SCHOLAR, id: 'scholar_id_xyz', linked: false },
    { platform: AcademicProfilePlatform.ORCID, id: '0000-0001-2345-6789', linked: true, lastFetchedHIndex: 14 },
  ],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfileData | null>(mockUser);

  const updateUserLevelAndRank = (currentXp: number) => {
    let newLevel = 1;
    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
      if (currentXp >= LEVEL_THRESHOLDS[i]) {
        newLevel = i + 1;
      } else {
        break;
      }
    }
    const newRank = RANKS[Math.min(newLevel - 1, RANKS.length - 1)];
    return { newLevel, newRank };
  };

  const updateHIndex = (newHIndex: number) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      const hIndexDifference = newHIndex - prevUser.hIndex;
      const creditsChange = hIndexDifference; // 1 credit per h-index point change
      const newCredits = Math.max(0, prevUser.credits + creditsChange);
      // XP for H-index increase: e.g., 10 XP per point.
      const xpChange = hIndexDifference > 0 ? hIndexDifference * 10 : 0;
      const newXp = prevUser.xp + xpChange;
      const {newLevel, newRank} = updateUserLevelAndRank(newXp);

      return { ...prevUser, hIndex: newHIndex, credits: newCredits, xp: newXp, level: newLevel, rank: newRank };
    });
  };

  const addCredits = (amount: number) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      const newCredits = Math.max(0, prevUser.credits + amount);
      return { ...prevUser, credits: newCredits };
    });
  };

  const linkProfile = (platform: AcademicProfilePlatform | string, id: string, hIndex?: number) => {
    setUser(prevUser => {
        if (!prevUser) return null;
        const updatedProfiles = prevUser.linkedProfiles.map(p => 
            p.platform === platform ? { ...p, id, linked: true, lastFetchedHIndex: hIndex !== undefined ? hIndex : p.lastFetchedHIndex } : p
        );
        // If platform not found, add new one
        if (!updatedProfiles.find(p => p.platform === platform)) {
            updatedProfiles.push({ platform, id, linked: true, lastFetchedHIndex: hIndex });
        }
        // If this link provides a new H-Index, update the main H-Index if it's higher or if it's the primary source
        // This logic would be more complex, considering primary source priorities
        let userHIndex = prevUser.hIndex;
        if (hIndex !== undefined && hIndex > userHIndex) { // Simplified: take higher h-index
            userHIndex = hIndex;
        }

        return { ...prevUser, linkedProfiles: updatedProfiles, hIndex: userHIndex };
    });
  };

  const unlinkProfile = (platform: AcademicProfilePlatform | string) => {
     setUser(prevUser => {
        if (!prevUser) return null;
        const updatedProfiles = prevUser.linkedProfiles.map(p => 
            p.platform === platform ? { ...p, linked: false, id: '', lastFetchedHIndex: undefined } : p
        );
        return { ...prevUser, linkedProfiles: updatedProfiles };
    });
  };


  return (
    <UserContext.Provider value={{ user, updateHIndex, addCredits, linkProfile, unlinkProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
