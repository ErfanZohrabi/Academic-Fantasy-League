import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 bg-opacity-50 text-gray-400 py-8 text-center border-t border-gray-700 mt-12">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} Academic Fantasy League Hub. All rights reserved.</p>
        <p className="text-sm mt-1">Gamifying Research, One H-index at a Time.</p>
        <div className="mt-4 space-x-4">
            <a href="#/about" className="hover:text-purple-400 transition-colors text-sm">About</a>
            <a href="#/privacy" className="hover:text-purple-400 transition-colors text-sm">Privacy Policy</a>
            <a href="#/terms" className="hover:text-purple-400 transition-colors text-sm">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
