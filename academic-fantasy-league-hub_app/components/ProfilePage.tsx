import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';
import { DEFAULT_USER_AVATAR, SUPPORTED_PROFILE_SOURCES, LEVEL_THRESHOLDS, RANKS } from '../constants';
import { AcademicProfileLink, AcademicProfilePlatform } from '../types';
import { LinkIcon, CheckCircleIcon, XCircleIcon, UserIcon, ChartBarIcon, SparklesIcon } from './common/Icon';
import LoadingSpinner from './common/LoadingSpinner';

const ProfilePage: React.FC = () => {
  const { user, updateHIndex, addCredits, linkProfile, unlinkProfile } = useUser();
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [selectedPlatformInfo, setSelectedPlatformInfo] = useState<{name: AcademicProfilePlatform | string, idPrefix: string, placeholder: string} | null>(null);
  const [profileIdInput, setProfileIdInput] = useState('');
  const [linkingStatus, setLinkingStatus] = useState<'idle' | 'linking' | 'success' | 'error'>('idle');

  if (!user) return <div className="flex justify-center items-center h-[calc(100vh-10rem)]"><LoadingSpinner text="Loading profile..." size="lg"/></div>;
  
  const currentLevelThresholdXP = LEVEL_THRESHOLDS[user.level -1] || 0;
  const nextLevelThresholdXP = LEVEL_THRESHOLDS[user.level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length-1]; // Use last threshold if max level
  const xpForCurrentLevel = nextLevelThresholdXP - currentLevelThresholdXP;
  const xpIntoCurrentLevel = user.xp - currentLevelThresholdXP;
  const xpProgress = xpForCurrentLevel > 0 ? Math.min(100, (xpIntoCurrentLevel / xpForCurrentLevel) * 100) : (user.xp >= nextLevelThresholdXP ? 100 : 0);


  const openLinkModal = (platformInfo: {name: AcademicProfilePlatform | string, idPrefix: string, placeholder: string}) => {
    setSelectedPlatformInfo(platformInfo);
    setProfileIdInput(user.linkedProfiles.find(p => p.platform === platformInfo.name)?.id || '');
    setLinkingStatus('idle');
    setIsLinkModalOpen(true);
  };

  const handleLinkProfile = async () => {
    if (!selectedPlatformInfo || !profileIdInput) return;
    setLinkingStatus('linking');
    
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    const isSuccess = Math.random() > 0.2; // 80% success rate for demo
    if (isSuccess) {
      const newMockHIndex = Math.floor(Math.random() * 5) + user.hIndex; // Simulate H-Index update
      linkProfile(selectedPlatformInfo.name, profileIdInput, newMockHIndex);
      if (newMockHIndex > user.hIndex) { // If the new H-Index from this source is higher
          updateHIndex(newMockHIndex); // This also updates credits & XP
      }
      setLinkingStatus('success');
      setTimeout(() => {
        setIsLinkModalOpen(false);
      }, 2000);
    } else {
      setLinkingStatus('error');
    }
  };

  const handleUnlinkProfile = (platformName: AcademicProfilePlatform | string) => {
    unlinkProfile(platformName);
    // Optionally, re-evaluate overall H-index if primary source was unlinked
  };
  
  return (
    <div className="space-y-8">
      <Card className="p-6 md:p-8 shadow-purple-500/10">
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
          <div className="relative mb-6 md:mb-0 md:mr-8">
            <img
              src={user.avatarUrl || DEFAULT_USER_AVATAR}
              alt={user.username}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-purple-500 shadow-lg object-cover"
            />
            <Button size="sm" variant="secondary" className="absolute bottom-1 right-1 !p-2 rounded-full" onClick={() => alert('Edit avatar functionality coming soon!')} aria-label="Edit Avatar">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </Button>
          </div>
          <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold text-purple-300">{user.username}</h1>
            <p className="text-md md:text-lg text-gray-400">{user.email}</p>
            {user.institution && <p className="text-sm md:text-md text-gray-300 mt-1">{user.institution} - {user.fieldOfStudy}</p>}
            {user.bio && <p className="text-gray-400 mt-3 text-sm md:text-base italic leading-relaxed max-w-xl mx-auto md:mx-0">{user.bio}</p>}
            <Button variant="outline" size="sm" className="mt-4" onClick={() => alert('Edit profile functionality coming soon!')}>Edit Profile</Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Academic Stats" titleClassName="text-xl font-semibold mb-3 text-purple-300">
          <p className="text-gray-300 flex items-center mb-1"><ChartBarIcon className="w-5 h-5 mr-2 text-purple-400"/> <span className="font-medium">H-Index:</span><span className="ml-auto font-bold text-lg">{user.hIndex}</span></p>
          <p className="text-gray-300 flex items-center mb-1"><UserIcon className="w-5 h-5 mr-2 text-purple-400" /> <span className="font-medium">Citations:</span><span className="ml-auto font-bold text-lg">{user.citations}</span></p>
          <p className="text-gray-300 flex items-center mb-1"><SparklesIcon className="w-5 h-5 mr-2 text-purple-400" /> <span className="font-medium">Research Credits:</span><span className="ml-auto font-bold text-lg">{user.researchCredits}</span></p>
          <p className="text-gray-300"><span className="font-medium text-purple-400">Career Stage:</span> {user.careerStage}</p>
        </Card>

        <Card title="Gamification Stats" titleClassName="text-xl font-semibold mb-3 text-purple-300">
          <p className="text-gray-300 flex items-center mb-1"><SparklesIcon className="w-5 h-5 mr-2 text-yellow-400"/> <span className="font-medium">Credits:</span><span className="ml-auto font-bold text-lg text-yellow-300">{user.credits}</span></p>
          <p className="text-gray-300 flex items-center mb-2"><UserIcon className="w-5 h-5 mr-2 text-green-400" /> <span className="font-medium">XP:</span><span className="ml-auto font-bold text-lg text-green-300">{user.xp}</span></p>
          <p className="text-gray-300 mb-1"><span className="font-medium text-purple-400">Level {user.level}:</span> {user.rank}</p>
           <div className="w-full bg-gray-700 rounded-full h-3 mt-1 relative overflow-hidden">
             <div className="bg-gradient-to-r from-green-500 to-teal-400 h-3 rounded-full transition-all duration-500 ease-out" style={{ width: `${xpProgress}%` }}></div>
           </div>
           <p className="text-xs text-gray-400 mt-1 text-right">{xpIntoCurrentLevel} / {xpForCurrentLevel} XP for this level ({user.xp} / {nextLevelThresholdXP} total)</p>
        </Card>
        
        <Card title="Dev Actions (Test)" titleClassName="text-xl font-semibold mb-3 text-orange-300">
            <p className="text-gray-400 mb-2 text-sm">Simulate H-Index changes and credit gain/loss.</p>
            <Button onClick={() => updateHIndex(user.hIndex + 1)} className="mr-2 mb-2 w-full sm:w-auto" size="sm" variant="outline">Inc H-Index by 1 (+10XP)</Button>
            <Button onClick={() => updateHIndex(user.hIndex - 1)} className="mr-2 mb-2 w-full sm:w-auto" size="sm" variant="outline">Dec H-Index by 1</Button>
            <Button onClick={() => addCredits(50)} variant="secondary" size="sm" className="mr-2 mb-2 w-full sm:w-auto">Add 50 Credits</Button>
            <Button onClick={() => addCredits(-20)} variant="secondary" size="sm" className="w-full sm:w-auto">Spend 20 Credits</Button>
        </Card>
      </div>

      <Card title="Linked Academic Profiles" titleClassName="text-xl font-semibold mb-4 text-purple-300">
        <div className="space-y-4">
          {SUPPORTED_PROFILE_SOURCES.map(sourceInfo => {
            const linkedProfile = user.linkedProfiles.find(p => p.platform === sourceInfo.name);
            return (
              <div key={sourceInfo.name} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-700/80 rounded-md gap-3">
                <div className="flex items-center">
                    {linkedProfile?.linked ? <CheckCircleIcon className="mr-3 w-6 h-6 text-green-400 flex-shrink-0"/> : <LinkIcon className="mr-3 w-6 h-6 text-gray-500 flex-shrink-0"/>}
                    <div>
                        <h4 className="text-md font-semibold text-gray-100">{sourceInfo.name}</h4>
                        {linkedProfile?.linked ? (
                            <div className="text-xs text-gray-300">
                                <p>ID: {linkedProfile.id}</p>
                                {linkedProfile.lastFetchedHIndex !== undefined && <p>H-Index: {linkedProfile.lastFetchedHIndex}</p>}
                            </div>
                        ) : (
                            <p className="text-xs text-gray-400">Not linked</p>
                        )}
                    </div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0 self-end sm:self-center">
                    {linkedProfile?.linked && 
                        <Button variant="danger" size="sm" onClick={() => handleUnlinkProfile(sourceInfo.name)}>Unlink</Button>
                    }
                    <Button
                      variant={linkedProfile?.linked ? "secondary" : "primary"}
                      size="sm"
                      onClick={() => openLinkModal(sourceInfo)}
                    >
                      {linkedProfile?.linked ? 'Update ID' : 'Link Profile'}
                    </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      
      {selectedPlatformInfo && (
        <Modal isOpen={isLinkModalOpen} onClose={() => setIsLinkModalOpen(false)} title={`Link ${selectedPlatformInfo.name} Profile`} size="md">
            {linkingStatus === 'idle' && (
                <>
                    <p className="text-gray-300 mb-1">
                        Enter your {selectedPlatformInfo.idPrefix.toLowerCase().replace(':','')}
                        {selectedPlatformInfo.name === AcademicProfilePlatform.GOOGLE_SCHOLAR && " (must be public profile URL)"}.
                    </p>
                     <p className="text-xs text-gray-400 mb-4">Example: {selectedPlatformInfo.placeholder}</p>
                    <input
                        type="text"
                        value={profileIdInput}
                        onChange={(e) => setProfileIdInput(e.target.value)}
                        placeholder={selectedPlatformInfo.placeholder}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <div className="mt-6 flex justify-end space-x-3">
                        <Button variant="secondary" onClick={() => setIsLinkModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleLinkProfile} disabled={!profileIdInput.trim()}>Link Profile</Button>
                    </div>
                </>
            )}
            {linkingStatus === 'linking' && (
                <div className="text-center py-8">
                    <LoadingSpinner text={`Linking ${selectedPlatformInfo.name}...`} />
                </div>
            )}
            {linkingStatus === 'success' && (
                 <div className="text-center py-8">
                    <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <p className="text-xl text-green-300">{selectedPlatformInfo.name} profile linked successfully!</p>
                    <p className="text-gray-300">Your H-Index and credits may have been updated.</p>
                </div>
            )}
            {linkingStatus === 'error' && (
                <div className="text-center py-8">
                    <XCircleIcon className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <p className="text-xl text-red-300">Failed to link {selectedPlatformInfo.name} profile.</p>
                    <p className="text-gray-300 mb-4">Please check the ID/URL and try again. (This is a demo, actual validation not performed)</p>
                    <Button onClick={() => setLinkingStatus('idle')}>Try Again</Button>
                </div>
            )}
        </Modal>
      )}
    </div>
  );
};

export default ProfilePage;
