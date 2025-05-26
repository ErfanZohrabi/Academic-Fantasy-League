import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Notifications from './Notifications';
import { UserIcon, TeamIcon, LeagueIcon, BookOpenIcon, ShoppingBagIcon, SparklesIcon } from './common/Icon';
import { DEFAULT_USER_AVATAR } from '../constants';

const Navbar: React.FC = () => {
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);


  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
      isActive ? 'bg-purple-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;
  
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
      isActive ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (mobileMenuButtonRef.current && mobileMenuButtonRef.current.contains(event.target as Node)) {
        return; // If click is on mobile menu button, let its own handler manage it
      }
      // Check if click is outside mobile menu content area too when it's open
      // This part can be tricky if the menu content isn't easily identifiable as "outside"
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <nav className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center text-white text-2xl font-bold hover:opacity-80 transition-opacity">
              <SparklesIcon className="h-8 w-8 mr-2 text-purple-400" />
              AFL Hub
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-3 lg:space-x-4">
                <NavLink to="/profile" className={navLinkClass}><UserIcon className="mr-1.5 h-5 w-5"/>Profile</NavLink>
                <NavLink to="/team" className={navLinkClass}><TeamIcon className="mr-1.5 h-5 w-5"/>Team</NavLink>
                <NavLink to="/league" className={navLinkClass}><LeagueIcon className="mr-1.5 h-5 w-5"/>League</NavLink>
                <NavLink to="/tutorials" className={navLinkClass}><BookOpenIcon className="mr-1.5 h-5 w-5"/>Tutorials</NavLink>
                <NavLink to="/marketplace" className={navLinkClass}><ShoppingBagIcon className="mr-1.5 h-5 w-5"/>Market</NavLink>
                <NavLink to="/assistant" className={navLinkClass}><SparklesIcon className="mr-1.5 h-5 w-5"/>Assistant</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Notifications />
            {user && (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500"
                >
                  <span className="sr-only">Open user menu</span>
                  <img className="h-10 w-10 rounded-full border-2 border-purple-500 object-cover" src={user.avatarUrl || DEFAULT_USER_AVATAR} alt={user.username} />
                  <span className="ml-2 text-gray-300 hidden lg:block font-medium">{user.username}</span>
                   <svg className={`ml-1 h-5 w-5 text-gray-400 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {isProfileDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <Link to="/profile" onClick={() => setIsProfileDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 w-full text-left">Your Profile</Link>
                    <button onClick={() => {alert('Settings page coming soon!'); setIsProfileDropdownOpen(false);}} className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 w-full text-left">Settings</button>
                    <button onClick={() => {alert('Signing out (demo)!'); setIsProfileDropdownOpen(false);}} className="block px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white w-full text-left">Sign out</button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="-mr-2 flex md:hidden items-center">
            <Notifications />
            <button
              ref={mobileMenuButtonRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-2 bg-gray-700 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-700" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/profile" className={mobileNavLinkClass} onClick={()=>setIsMobileMenuOpen(false)}><UserIcon className="mr-2 h-5 w-5"/>Profile</NavLink>
            <NavLink to="/team" className={mobileNavLinkClass} onClick={()=>setIsMobileMenuOpen(false)}><TeamIcon className="mr-2 h-5 w-5"/>Team</NavLink>
            <NavLink to="/league" className={mobileNavLinkClass} onClick={()=>setIsMobileMenuOpen(false)}><LeagueIcon className="mr-2 h-5 w-5"/>League</NavLink>
            <NavLink to="/tutorials" className={mobileNavLinkClass} onClick={()=>setIsMobileMenuOpen(false)}><BookOpenIcon className="mr-2 h-5 w-5"/>Tutorials</NavLink>
            <NavLink to="/marketplace" className={mobileNavLinkClass} onClick={()=>setIsMobileMenuOpen(false)}><ShoppingBagIcon className="mr-2 h-5 w-5"/>Market</NavLink>
            <NavLink to="/assistant" className={mobileNavLinkClass} onClick={()=>setIsMobileMenuOpen(false)}><SparklesIcon className="mr-2 h-5 w-5"/>Assistant</NavLink>
          </div>
          {user && (
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full border-2 border-purple-500 object-cover" src={user.avatarUrl || DEFAULT_USER_AVATAR} alt={user.username} />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{user.username}</div>
                  <div className="text-sm font-medium text-gray-400">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link to="/profile" onClick={()=>setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Your Profile</Link>
                <button onClick={() => {alert('Settings page coming soon!'); setIsMobileMenuOpen(false);}} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Settings</button>
                <button onClick={() => {alert('Signing out (demo)!'); setIsMobileMenuOpen(false);}} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-white hover:bg-red-500">Sign out</button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
