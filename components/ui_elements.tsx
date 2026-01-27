
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  pulsing?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  pulsing = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "font-bold py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-lg text-base md:text-lg flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-pink-500 hover:bg-pink-600 text-white shadow-pink-500/30 hover:shadow-pink-500/50 hover:shadow-2xl",
    secondary: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:shadow-2xl",
    outline: "border-2 border-white text-white hover:bg-white hover:text-purple-900",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const pulseClass = pulsing ? "animate-pulse-slow hover:animate-none" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${pulseClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center h-full">
    <div className="bg-purple-100 p-4 rounded-full mb-4 text-purple-700">
      <Icon size={32} strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm md:text-base">{description}</p>
  </div>
);

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full text-left py-4 px-4 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
        onClick={onClick}
      >
        <span className="text-base md:text-lg font-semibold text-gray-800 pr-4">{question}</span>
        <span className={`flex-shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 text-sm md:text-base text-gray-600 bg-gray-50 rounded-b-lg">
          {answer}
        </div>
      </div>
    </div>
  );
};
