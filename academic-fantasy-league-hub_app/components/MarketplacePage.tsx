import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import { MOCK_MARKETPLACE_ITEMS, DEFAULT_USER_AVATAR } from '../constants';
import { MarketplaceItem } from '../types';
import { useUser } from '../contexts/UserContext';
import Modal from './common/Modal';
import { ShoppingBagIcon, SparklesIcon, ChartBarIcon, CheckCircleIcon, XCircleIcon } from './common/Icon';
import LoadingSpinner from './common/LoadingSpinner';

const MarketplaceCard: React.FC<{ item: MarketplaceItem; onHire: (item: MarketplaceItem) => void; userCredits: number }> = ({ item, onHire, userCredits }) => {
  const canAfford = userCredits >= item.cost;
  const isAvailable = item.availability === 'Available';
  
  return (
  <Card className="flex flex-col justify-between h-full transform hover:shadow-purple-500/30 transition-all duration-200 !p-0 overflow-hidden">
    <div>
      <img src={item.avatarUrl || DEFAULT_USER_AVATAR} alt={item.researcherName} className="w-full h-40 sm:h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-purple-300 truncate" title={item.researcherName}>{item.researcherName}</h3>
        <p className="text-xs text-gray-400 mb-2 truncate" title={item.specialization}>{item.specialization}</p>
        <div className="text-xs text-gray-300 space-y-1 mb-3">
          <p className="flex items-center"><ChartBarIcon className="w-3.5 h-3.5 mr-1.5 text-purple-400" /> H-Index: <span className="ml-auto font-semibold">{item.hIndex}</span></p>
          <p className="flex items-center"><SparklesIcon className="w-3.5 h-3.5 mr-1.5 text-yellow-400" /> Cost: <span className="ml-auto font-semibold">{item.cost} Cr</span></p>
        </div>
        <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
          item.availability === 'Available' ? 'bg-green-600 text-white' : 
          item.availability === 'On Loan' ? 'bg-yellow-600 text-gray-900' : 'bg-red-600 text-white'
        }`}>
          {item.availability}
        </span>
      </div>
    </div>
    <div className="p-4 border-t border-gray-700 mt-auto">
        <Button 
        variant="primary" 
        onClick={() => onHire(item)} 
        disabled={!isAvailable || !canAfford} 
        className="w-full !text-sm"
        title={!isAvailable ? "Researcher not available" : !canAfford ? "Not enough credits" : `Hire ${item.researcherName}`}
        >
        {isAvailable ? (canAfford ? 'Hire Researcher' : 'Insufficient Credits') : 'Unavailable'}
        </Button>
    </div>
  </Card>
);
}


const MarketplacePage: React.FC = () => {
  const { user, addCredits } = useUser();
  const [marketItems, setMarketItems] = useState<MarketplaceItem[]>(MOCK_MARKETPLACE_ITEMS);
  const [selectedResearcher, setSelectedResearcher] = useState<MarketplaceItem | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [hireStatus, setHireStatus] = useState<'idle' | 'hiring' | 'success' | 'error_funds' | 'error_general'>('idle');

  const handleHireAttempt = (researcher: MarketplaceItem) => {
    if (!user || researcher.availability !== 'Available') return;
    setSelectedResearcher(researcher);
    setHireStatus('idle');
    setIsConfirmModalOpen(true);
  };

  const confirmHire = async () => {
    if (!user || !selectedResearcher) return;

    if (user.credits < selectedResearcher.cost) {
      setHireStatus('error_funds');
      return;
    }

    setHireStatus('hiring');
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    
    addCredits(-selectedResearcher.cost); // Deduct credits via context
    setHireStatus('success');
    // Update item availability in local state for demo
    setMarketItems(prevItems => 
        prevItems.map(item => item.id === selectedResearcher.id ? {...item, availability: 'Unavailable'} : item)
    );
    // Note: In a real app, this would trigger a backend update and data refetch.
  };
  
  const closeAndResetModal = () => {
    setIsConfirmModalOpen(false);
    setSelectedResearcher(null);
    // Don't reset hireStatus immediately if it's success/error, to show the message
    if (hireStatus === 'hiring' || hireStatus === 'idle') {
        setHireStatus('idle');
    }
  }
  
  const getModalFooter = () => {
    if (hireStatus === 'success' || hireStatus === 'error_funds' || hireStatus === 'error_general') {
        return <Button onClick={() => { setIsConfirmModalOpen(false); setHireStatus('idle');}} className="w-full">Close</Button>;
    }
    if (hireStatus === 'idle' && selectedResearcher && user) {
        return (
            <div className="flex justify-end space-x-3">
                <Button variant="secondary" onClick={closeAndResetModal}>Cancel</Button>
                <Button onClick={confirmHire} disabled={user.credits < selectedResearcher.cost}>
                {user.credits < selectedResearcher.cost ? 'Not Enough Credits' : 'Confirm Hire'}
                </Button>
            </div>
        );
    }
    return null;
  };


  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2 flex items-center justify-center">
            <ShoppingBagIcon className="w-8 h-8 md:w-10 md:h-10 mr-3"/> Transfer Market
        </h1>
        <p className="text-md md:text-lg text-gray-300">Recruit top academic talent. Your Credits: <span className="font-bold text-yellow-300">{user?.credits ?? 0}</span></p>
      </header>

      {marketItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {marketItems.map(item => (
            <MarketplaceCard key={item.id} item={item} onHire={handleHireAttempt} userCredits={user?.credits ?? 0} />
            ))}
        </div>
      ) : (
        <Card><p className="text-gray-400 text-center py-6">The marketplace is currently empty. Check back later!</p></Card>
      )}


      {selectedResearcher && (
        <Modal 
            isOpen={isConfirmModalOpen} 
            onClose={() => { setIsConfirmModalOpen(false); if (hireStatus !== 'success') setHireStatus('idle');}} 
            title={hireStatus === 'idle' ? `Confirm Hiring` : hireStatus === 'hiring' ? 'Processing...' : 'Hiring Status'} 
            size="md"
            footerContent={getModalFooter()}
        >
          {hireStatus === 'idle' && (
            <>
              <p className="text-gray-300 mb-2">Are you sure you want to hire <span className="font-semibold text-purple-300">{selectedResearcher.researcherName}</span> for <span className="font-semibold text-yellow-300">{selectedResearcher.cost} credits</span>?</p>
              <p className="text-sm text-gray-400 mb-1">Their H-Index is {selectedResearcher.hIndex} and specialization is {selectedResearcher.specialization}.</p>
              {user && user.credits < selectedResearcher.cost && <p className="text-sm text-red-400 mt-2">You do not have enough credits for this transaction.</p>}
            </>
          )}
          {hireStatus === 'hiring' && (
            <div className="text-center py-8">
                <LoadingSpinner text="Processing transaction..."/>
            </div>
          )}
          {hireStatus === 'success' && (
            <div className="text-center py-8">
                <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <p className="text-xl text-green-300">Successfully Hired!</p>
                <p className="text-gray-300"><span className="font-semibold text-purple-300">{selectedResearcher.researcherName}</span> has joined your team (demo).</p>
                <p className="text-gray-300">{selectedResearcher.cost} credits deducted.</p>
            </div>
          )}
          {(hireStatus === 'error_funds' || hireStatus === 'error_general') && (
             <div className="text-center py-8">
                <XCircleIcon className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <p className="text-xl text-red-300">Hiring Failed</p>
                {hireStatus === 'error_funds' && <p className="text-gray-300">You do not have enough credits to hire {selectedResearcher.researcherName}.</p>}
                {hireStatus === 'error_general' && <p className="text-gray-300">An unexpected error occurred. Please try again.</p>}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default MarketplacePage;
