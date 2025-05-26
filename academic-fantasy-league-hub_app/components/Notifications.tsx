import React, { useState, useEffect, useRef } from 'react';
import { MOCK_NOTIFICATIONS } from '../constants';
import { NotificationMessage } from '../types';
import { BellIcon } from './common/Icon'; // Import BellIcon

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationMessage[]>(MOCK_NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleDropdown = () => setIsOpen(!isOpen);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full text-gray-300 hover:text-white focus:outline-none hover:bg-gray-700 transition-colors"
        aria-label="View notifications"
      >
        <BellIcon className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-5 w-5 transform -translate-y-1/2 translate-x-1/2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-red-600 text-white text-xs items-center justify-center">{unreadCount}</span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 md:w-96 rounded-md shadow-xl bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-3 border-b border-gray-600 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-purple-300">Notifications</h3>
            {unreadCount > 0 && (
                 <button onClick={markAllAsRead} className="text-xs text-purple-400 hover:text-purple-300 font-medium">Mark all as read</button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-gray-400 text-center py-6">No new notifications.</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-3 border-b border-gray-600 hover:bg-gray-600/70 cursor-pointer transition-colors ${!notification.read ? 'bg-gray-600' : ''}`}
                >
                  <p className={`text-sm ${!notification.read ? 'text-white font-semibold' : 'text-gray-300'}`}>{notification.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(notification.timestamp).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </div>
           <div className="p-2 bg-gray-700/50 text-center border-t border-gray-600">
            <button onClick={() => setIsOpen(false)} className="text-sm text-purple-400 hover:text-purple-300 font-medium">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
