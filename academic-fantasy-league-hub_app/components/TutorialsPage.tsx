import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';
import { MOCK_TUTORIALS } from '../constants';
import { TutorialData } from '../types';
import { BookOpenIcon, SparklesIcon } from './common/Icon'; 
import { useUser } from '../contexts/UserContext'; // For potential XP gain

const TutorialCard: React.FC<{ tutorial: TutorialData; onStart: (tutorial: TutorialData) => void }> = ({ tutorial, onStart }) => (
  <Card className="flex flex-col justify-between h-full transform hover:scale-105 transition-transform duration-200 hover:shadow-green-500/20 !p-5">
    <div>
      <div className="flex items-start mb-3">
        <div className="p-2 bg-gray-700 rounded-full mr-3">
         <BookOpenIcon className="w-6 h-6 text-green-400"/>
        </div>
        <h3 className="text-lg font-semibold text-green-300 mt-1">{tutorial.title}</h3>
      </div>
      <p className="text-gray-300 mb-3 text-sm leading-relaxed">{tutorial.description}</p>
      <div className="text-xs text-gray-400 space-y-1 mb-4 border-t border-gray-700 pt-3 mt-3">
        <p><span className="font-semibold">Difficulty:</span> <span className={`font-medium ${tutorial.difficulty === 'Beginner' ? 'text-green-400' : tutorial.difficulty === 'Intermediate' ? 'text-yellow-400' : 'text-red-400'}`}>{tutorial.difficulty}</span></p>
        <p><span className="font-semibold">Est. Duration:</span> {tutorial.duration}</p>
        <p className="flex items-center"><SparklesIcon className="w-3.5 h-3.5 mr-1 text-yellow-400" /> <span className="font-semibold">XP Reward:</span> +{tutorial.xpReward} XP</p>
      </div>
    </div>
    <Button variant="primary" onClick={() => onStart(tutorial)} className="w-full mt-auto bg-green-600 hover:bg-green-700 focus:ring-green-500">
      Start Tutorial
    </Button>
  </Card>
);

const TutorialsPage: React.FC = () => {
  const { user, addCredits } = useUser(); // addCredits can be used for XP in a real system
  const [selectedTutorial, setSelectedTutorial] = useState<TutorialData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleStartTutorial = (tutorial: TutorialData) => {
    setSelectedTutorial(tutorial);
    setQuizCompleted(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTutorial(null);
  };

  const handleCompleteQuiz = () => {
    if(selectedTutorial && user) {
        // In a real app, this would call a function in UserContext to add XP
        // For demo, we can use addCredits as a proxy if XP logic isn't fully fleshed out in UserContext
        // E.g., addXp(selectedTutorial.xpReward)
        alert(`Quiz for "${selectedTutorial.title}" completed! You earned ${selectedTutorial.xpReward} XP. (XP system to be fully integrated)`);
        setQuizCompleted(true);
        // Potentially update user state here or via context
    }
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 mb-2">Tutorials & Learning Center</h1>
        <p className="text-md md:text-lg text-gray-300">Expand your academic prowess and earn XP!</p>
      </header>

      {MOCK_TUTORIALS.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_TUTORIALS.map(tutorial => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} onStart={handleStartTutorial} />
            ))}
        </div>
        ) : (
        <Card><p className="text-gray-400 text-center py-6">No tutorials available at the moment. Check back soon!</p></Card>
      )}


      {selectedTutorial && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedTutorial.title} size="lg"
            footerContent={
                <div className="flex justify-end space-x-3">
                    <Button onClick={handleCloseModal} variant="secondary">Close Preview</Button>
                    <Button onClick={() => alert(`Continuing tutorial: ${selectedTutorial.title}`)} variant="primary" className="bg-green-600 hover:bg-green-700 focus:ring-green-500">
                        Continue Tutorial
                    </Button>
                </div>
            }
        >
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{selectedTutorial.contentPreview}</p>
            <p className="text-gray-400 text-sm mt-2">This is a preview. Full tutorial content, including text, images, videos, and interactive elements, would be displayed in a dedicated tutorial view.</p>
            
            <div className="mt-6 p-4 bg-gray-700/70 rounded-md border border-gray-600">
                <h4 className="text-lg font-semibold text-green-300 mb-2">Quiz Section</h4>
                {!quizCompleted ? (
                    <>
                        <p className="text-gray-300 mb-3 text-sm">Complete a short quiz at the end of the tutorial to earn your XP reward!</p>
                        <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white" onClick={handleCompleteQuiz}>Start Quiz (Demo)</Button>
                    </>
                ) : (
                    <div className="flex items-center text-green-400">
                        <CheckCircleIcon className="w-6 h-6 mr-2"/>
                        <p>Quiz completed! +{selectedTutorial.xpReward} XP (Demo)</p>
                    </div>
                )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// Placeholder CheckCircleIcon for Modal, ensure it's imported or defined globally if needed
const CheckCircleIcon: React.FC<{className?: string}> = ({ className = "w-5 h-5 text-green-500" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);


export default TutorialsPage;
