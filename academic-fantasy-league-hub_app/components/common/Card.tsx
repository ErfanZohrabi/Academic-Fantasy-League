import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  titleClassName?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, titleClassName = 'text-2xl font-semibold mb-4 text-purple-300', onClick }) => {
  const cardClasses = `bg-gray-800 bg-opacity-70 shadow-xl rounded-lg p-6 backdrop-blur-sm border border-gray-700 hover:border-purple-600/70 transition-all duration-300 ${className} ${onClick ? 'cursor-pointer hover:shadow-purple-500/30' : ''}`;
  return (
    <div className={cardClasses} onClick={onClick}>
      {title && <h3 className={titleClassName}>{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
