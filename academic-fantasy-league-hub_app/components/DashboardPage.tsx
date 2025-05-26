import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Card from './common/Card';
import Button from './common/Button';
import { MOCK_TEAM, MOCK_LEAGUE, MOCK_TUTORIALS, DEFAULT_TEAM_LOGO } from '../constants';
import { UserIcon, TeamIcon, LeagueIcon, BookOpenIcon, SparklesIcon, ChartBarIcon } from './common/Icon';
import LoadingSpinner from './common/LoadingSpinner';


const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode, colorClass?: string, linkTo?: string }> = ({ title, value, icon, colorClass = "text-purple-400", linkTo }) => {
  const content = (
    <Card className="flex-1 min-w-[200px] transform hover:scale-105 !p-4 md:!p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full bg-gray-700 mr-3 md:mr-4 ${colorClass}`}>
          {icon}
        </div>
        <div>
          <p className="text-xs md:text-sm text-gray-400">{title}</p>
          <p className="text-xl md:text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </Card>
  );
  return linkTo ? <Link to={linkTo} className="block">{content}</Link> : content;
};


const DashboardPage: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return <div className="flex justify-center items-center h-[calc(100vh-10rem)]"><LoadingSpinner text="Loading dashboard..." size="lg"/></div>;
  }

  const quickLinks = [
    { to: '/profile', label: 'My Profile', icon: <UserIcon className="w-7 h-7"/> },
    { to: '/team', label: 'My Team', icon: <TeamIcon className="w-7 h-7"/> },
    { to: '/league', label: 'View League', icon: <LeagueIcon className="w-7 h-7"/> },
    { to: '/assistant', label: 'Research AI', icon: <SparklesIcon className="w-7 h-7"/> },
  ];

  return (
    <div className="space-y-8 md:space-y-10">
      <header className="text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Welcome back, {user.username}!</h1>
        <p className="text-md sm:text-lg text-gray-300 mt-2">Ready to lead your research team to victory?</p>
      </header>

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-purple-300">Your Snapshot</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard title="H-Index" value={user.hIndex} icon={<ChartBarIcon className="w-5 h-5 md:w-6 md:h-6"/>} linkTo="/profile"/>
          <StatCard title="Credits" value={user.credits} icon={<SparklesIcon className="w-5 h-5 md:w-6 md:h-6"/>} colorClass="text-yellow-400" />
          <StatCard title="XP" value={user.xp} icon={<UserIcon className="w-5 h-5 md:w-6 md:h-6"/>} colorClass="text-green-400" linkTo="/profile" />
          <StatCard title="Rank" value={user.rank} icon={<LeagueIcon className="w-5 h-5 md:w-6 md:h-6"/>} colorClass="text-blue-400" linkTo="/profile"/>
        </div>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-purple-300">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {quickLinks.map(link => (
            <Link key={link.to} to={link.to} className="block">
              <Button variant="secondary" size="lg" className="w-full h-full flex-col !py-4 hover:bg-purple-600 !text-sm sm:!text-base">
                <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">{link.icon}</span>
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <Card title={`Your Team: ${MOCK_TEAM.name}`} className="h-full">
          <div className="flex items-center mb-4">
            <img src={MOCK_TEAM.logoUrl || DEFAULT_TEAM_LOGO} alt="Team Logo" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mr-4 border-2 border-purple-500 object-cover" />
            <div>
              <p className="text-lg sm:text-xl font-semibold text-gray-100">{MOCK_TEAM.name}</p>
              <p className="text-sm text-gray-400">Manager: {MOCK_TEAM.managerName}</p>
            </div>
          </div>
          <p className="text-gray-300 mb-1"><span className="font-semibold">Budget:</span> {MOCK_TEAM.budget} Credits</p>
          <p className="text-gray-300 mb-1"><span className="font-semibold">Score:</span> {MOCK_TEAM.score} Points</p>
          <p className="text-gray-300 mb-4"><span className="font-semibold">Players:</span> {MOCK_TEAM.players.length}</p>
          <Link to="/team">
            <Button variant="outline" size="sm">Manage Team</Button>
          </Link>
        </Card>

        <Card title={`League: ${MOCK_LEAGUE.name}`} className="h-full">
          <p className="text-gray-300 mb-2 text-sm sm:text-base">{MOCK_LEAGUE.description}</p>
          <p className="text-gray-400 text-sm mb-1"><span className="font-semibold">Status:</span> {MOCK_LEAGUE.status}</p>
          <p className="text-gray-400 text-sm mb-4"><span className="font-semibold">Top Team:</span> {MOCK_LEAGUE.teams[0].name} ({MOCK_LEAGUE.teams[0].score} pts)</p>
          <Link to="/league">
            <Button variant="outline" size="sm">View League Details</Button>
          </Link>
        </Card>
      </div>

      {MOCK_TUTORIALS.length > 1 && 
        <Card title="Featured Tutorial" className="hover:shadow-green-500/20">
            <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 p-3 bg-gray-700 rounded-full">
                    <BookOpenIcon className="w-12 h-12 text-green-400" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-green-300">{MOCK_TUTORIALS[1].title}</h3>
                    <p className="text-gray-300 my-2 text-sm">{MOCK_TUTORIALS[1].description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400 mb-3">
                        <span>Difficulty: {MOCK_TUTORIALS[1].difficulty}</span>
                        <span>Duration: {MOCK_TUTORIALS[1].duration}</span>
                        <span className="flex items-center"><SparklesIcon className="w-3 h-3 mr-1 text-yellow-400"/>XP: +{MOCK_TUTORIALS[1].xpReward}</span>
                    </div>
                    <Link to="/tutorials">
                        <Button variant="primary" size="sm" className="bg-green-600 hover:bg-green-700 focus:ring-green-500">Start Learning</Button>
                    </Link>
                </div>
            </div>
        </Card>
      }
    </div>
  );
};

export default DashboardPage;
