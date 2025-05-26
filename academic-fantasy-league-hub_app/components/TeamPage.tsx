import React from 'react';
import { Link } from 'react-router-dom';
import Card from './common/Card';
import Button from './common/Button';
import { MOCK_TEAM, DEFAULT_TEAM_LOGO } from '../constants';
import { TeamPlayer } from '../types';
import { UserIcon, ChartBarIcon, TeamIcon, ShoppingBagIcon, SparklesIcon } from './common/Icon';

const PlayerCard: React.FC<{ player: TeamPlayer }> = ({ player }) => (
  <Card className="transform hover:shadow-purple-500/30 transition-all duration-200 !p-4 flex flex-col h-full">
    <div className="flex items-center mb-3">
      <img src={player.avatarUrl} alt={player.name} className="w-14 h-14 rounded-full mr-3 border-2 border-gray-600 object-cover"/>
      <div>
        <h4 className="text-md font-semibold text-purple-300">{player.name}</h4>
        <p className="text-xs text-gray-400">{player.role}</p>
      </div>
    </div>
    <div className="mt-auto space-y-1 text-xs">
      <p className="text-gray-300 flex items-center"><ChartBarIcon className="w-4 h-4 mr-1.5 text-purple-400" /> H-Index: <span className="ml-auto font-semibold">{player.hIndex}</span></p>
      <p className="text-gray-300 flex items-center"><UserIcon className="w-4 h-4 mr-1.5 text-purple-400" /> Papers: <span className="ml-auto font-semibold">{player.papersPublished}</span></p>
      {player.researchPotential && <p className="text-gray-300 flex items-center"><SparklesIcon className="w-4 h-4 mr-1.5 text-yellow-400" /> Potential: <span className="ml-auto font-semibold">{player.researchPotential}</span></p>}
    </div>
    <Button variant="outline" size="sm" className="mt-3 w-full !text-xs" onClick={() => alert(`Viewing profile for ${player.name}`)}>View Profile</Button>
  </Card>
);

const TeamPage: React.FC = () => {
  const team = MOCK_TEAM; // Using mock data

  return (
    <div className="space-y-8">
      <Card className="p-6 md:p-8 shadow-purple-500/10">
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
          <img src={team.logoUrl || DEFAULT_TEAM_LOGO} alt={`${team.name} Logo`} className="w-24 h-24 md:w-32 md:h-32 rounded-lg mr-0 md:mr-8 mb-4 md:mb-0 border-4 border-purple-500 shadow-lg object-cover"/>
          <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold text-purple-300">{team.name}</h1>
            <p className="text-md md:text-lg text-gray-400">Managed by: {team.managerName}</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-md">
              <span className="bg-gray-700 px-3 py-1 rounded-full text-purple-300 shadow-sm">Budget: <span className="font-semibold">{team.budget}</span> Credits</span>
              <span className="bg-gray-700 px-3 py-1 rounded-full text-green-400 shadow-sm">Score: <span className="font-semibold">{team.score}</span> Pts</span>
            </div>
          </div>
           <div className="mt-6 md:mt-0 md:ml-auto flex flex-col space-y-2 self-center md:self-start">
             <Link to="/marketplace" className="w-full">
                <Button variant="primary" className="w-full">
                    <ShoppingBagIcon className="w-5 h-5 mr-2"/> Recruit Players
                </Button>
             </Link>
             <Button variant="secondary" className="w-full" onClick={() => alert('Edit team details coming soon!')}>Edit Team Details</Button>
           </div>
        </div>
      </Card>

      <section>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-purple-300 flex items-center">
                <TeamIcon className="w-7 h-7 md:w-8 md:h-8 mr-3"/> Team Roster 
            </h2>
            <span className="text-gray-400">{team.players.length} Player{team.players.length === 1 ? '' : 's'}</span>
        </div>
        {team.players.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {team.players.map(player => <PlayerCard key={player.id} player={player} />)}
          </div>
        ) : (
          <Card>
            <p className="text-center text-gray-400 py-8">Your team roster is empty. Start recruiting players from the <Link to="/marketplace" className="text-purple-400 hover:underline">Marketplace</Link>!</p>
          </Card>
        )}
      </section>

      <Card title="Team Strategy & Analytics (Coming Soon)" titleClassName="text-xl font-semibold mb-3 text-purple-300">
        <p className="text-gray-400 text-sm">Detailed performance metrics, player contribution analysis, and strategic planning tools will be available here.</p>
        <div className="mt-4 h-40 bg-gray-700/70 rounded-md flex items-center justify-center border border-gray-600">
          <ChartBarIcon className="w-16 h-16 text-gray-500" />
        </div>
      </Card>
    </div>
  );
};

export default TeamPage;
