import React, { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  footerContent?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md', footerContent }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-3xl' // Adjusted full to be more reasonable for typical modals
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm p-4 transition-opacity duration-300 ease-in-out"
      onClick={onClose} // Close on overlay click
    >
      <div 
        className={`bg-gray-800 rounded-lg shadow-2xl w-full ${sizeClasses[size]} flex flex-col max-h-[90vh] transform transition-all duration-300 ease-in-out scale-95 animate-modal-pop`}
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
      >
        {(title || onClose) && (
          <div className="flex justify-between items-center p-5 border-b border-gray-700">
            {title && <h3 className="text-2xl font-semibold text-purple-300">{title}</h3>}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-gray-700"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-5 overflow-y-auto flex-grow">
            {children}
        </div>
        {footerContent && (
            <div className="p-5 border-t border-gray-700 bg-gray-800/50 rounded-b-lg">
                {footerContent}
            </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes modal-pop {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-modal-pop { animation: modal-pop 0.2s ease-out forwards; }
      `}} />
    </div>
  );
};

export default Modal;
