import React from 'react';
import Card from './common/Card';
import Button from './common/Button';
import { MOCK_LEAGUE, DEFAULT_TEAM_LOGO } from '../constants';
import { TeamData } from '../types';
import { LeagueIcon, ChartBarIcon } from './common/Icon'; 

const TeamRow: React.FC<{ team: TeamData; rank: number }> = ({ team, rank }) => (
  <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-700/70 rounded-lg hover:bg-gray-600/70 transition-colors duration-200 shadow-md border border-gray-600/50">
    <div className="flex items-center flex-grow min-w-0">
      <span className="text-lg sm:text-xl font-semibold text-purple-300 w-8 text-center flex-shrink-0">{rank}</span>
      <img src={team.logoUrl || DEFAULT_TEAM_LOGO} alt={team.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-3 sm:mx-4 border-2 border-gray-500 object-cover flex-shrink-0" />
      <div className="min-w-0">
        <h4 className="text-md sm:text-lg font-semibold text-gray-100 truncate" title={team.name}>{team.name}</h4>
        <p className="text-xs sm:text-sm text-gray-400 truncate" title={`Manager: ${team.managerName}`}>Manager: {team.managerName}</p>
      </div>
    </div>
    <div className="text-right ml-2 flex-shrink-0">
        <p className="text-lg sm:text-xl font-bold text-green-400">{team.score} <span className="text-xs sm:text-sm text-gray-400">Pts</span></p>
        <p className="text-xs text-gray-500">Budget: {team.budget} Cr</p>
    </div>
  </div>
);

const LeaguePage: React.FC = () => {
  const league = MOCK_LEAGUE;
  // Ensure teams are sorted by score for ranking
  const sortedTeams = [...league.teams].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-8">
      <Card className="p-6 md:p-8 text-center md:text-left shadow-purple-500/10">
        <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-purple-300 mb-2 flex items-center justify-center md:justify-start">
                    <LeagueIcon className="w-8 h-8 md:w-10 md:h-10 mr-3 text-purple-400"/>
                    {league.name}
                </h1>
                <p className="text-md md:text-lg text-gray-300 mb-3">{league.description}</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${league.status === 'Public' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-gray-900'}`}>
                {league.status}
                </span>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3">
                <Button variant="primary" onClick={() => alert('Join League functionality (demo).')}>Join League</Button>
                <Button variant="secondary" onClick={() => alert('Create New League functionality (demo).')}>Create New League</Button>
            </div>
        </div>
      </Card>

      <Card title="League Standings" titleClassName="text-xl font-semibold mb-4 text-purple-300">
        {sortedTeams.length > 0 ? (
            <div className="space-y-3">
            {sortedTeams.map((team, index) => (
                <TeamRow key={team.id} team={team} rank={index + 1} />
            ))}
            </div>
        ) : (
            <p className="text-gray-400 text-center py-4">No teams currently in this league.</p>
        )}
      </Card>
      
      <Card title="Scoring Rules" titleClassName="text-xl font-semibold mb-3 text-purple-300">
        <p className="text-gray-300 whitespace-pre-line text-sm leading-relaxed">{league.scoringRules}</p>
         <div className="mt-4 p-4 bg-gray-700/50 rounded-md border border-gray-600/50">
            <h4 className="text-md font-semibold text-purple-300 mb-2">Example Point Breakdown:</h4>
            <ul className="list-disc list-inside text-gray-400 space-y-1 text-xs sm:text-sm">
                <li>+10 points per H-Index point increase for a player.</li>
                <li>+50 points for a Q1 journal publication.</li>
                <li>+20 points for a conference presentation.</li>
                <li>Weekly bonus for most active team.</li>
            </ul>
        </div>
      </Card>

      <Card title="League Events (Coming Soon)" titleClassName="text-xl font-semibold mb-3 text-purple-300">
        <p className="text-gray-400 text-sm">Simulated academic events, challenges, and deadlines will appear here, impacting team scores and strategy.</p>
        <div className="mt-4 h-32 bg-gray-700/70 rounded-md flex items-center justify-center border border-gray-600/50">
            <ChartBarIcon className="w-12 h-12 text-gray-500" />
        </div>
      </Card>
    </div>
  );
};

export default LeaguePage;
