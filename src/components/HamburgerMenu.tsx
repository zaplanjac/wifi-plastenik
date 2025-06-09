import React, { useState } from 'react';
import {
  Menu,
  X,
  Droplets,
  Calendar,
  Router,
  BookOpen,
  Home
} from 'lucide-react';
import RainAnimation from './RainAnimation';
import SocialShareButton from './SocialShareButton';

type CurrentPage = 'dashboard' | 'calendar' | 'wifi' | 'instructions';

interface HamburgerMenuProps {
  currentPage: CurrentPage;
  onPageChange: (page: CurrentPage) => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ currentPage, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      id: 'dashboard' as CurrentPage,
      label: 'Контролна Табла',
      icon: <Home className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
      hoverColor: 'hover:from-blue-600 hover:to-cyan-600',
      activeColor: 'from-blue-600 to-cyan-600',
      shadowColor: 'shadow-blue-500/25'
    },
    {
      id: 'calendar' as CurrentPage,
      label: 'Календар',
      icon: <Calendar className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500',
      hoverColor: 'hover:from-green-600 hover:to-emerald-600',
      activeColor: 'from-green-600 to-emerald-600',
      shadowColor: 'shadow-green-500/25'
    },
    {
      id: 'wifi' as CurrentPage,
      label: 'WiFi',
      icon: <Router className="w-5 h-5" />,
      color: 'from-purple-500 to-violet-500',
      hoverColor: 'hover:from-purple-600 hover:to-violet-600',
      activeColor: 'from-purple-600 to-violet-600',
      shadowColor: 'shadow-purple-500/25'
    },
    {
      id: 'instructions' as CurrentPage,
      label: 'Упутства',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'from-orange-500 to-amber-500',
      hoverColor: 'hover:from-orange-600 hover:to-amber-600',
      activeColor: 'from-orange-600 to-amber-600',
      shadowColor: 'shadow-orange-500/25'
    }
  ];

  const handlePageChange = (page: CurrentPage) => {
    onPageChange(page);
    setIsOpen(false);
  };

  return (
    <>
      {/* Enhanced Header with Rain Animation */}
      <div className="relative mb-8 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-blue-600/20 rounded-3xl blur-xl"></div>
        
        {/* Main header container */}
        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
          {/* Rain Animation */}
          <RainAnimation />
          
          {/* Header content */}
          <div className="relative z-10 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                {/* Animated water drop icon with glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl shadow-lg">
                  <Droplets className="w-10 h-10 text-white animate-bounce" />
                </div>
                
                {/* Water ripple effect */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-blue-400/30 rounded-full animate-ping"></div>
              </div>
              
              <div className="space-y-1">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                  МОЈА БАШТА
                </h1>
                <p className="text-blue-200/90 text-lg font-medium">
                  Паметан систем за наводњавање
                </p>
                <div className="flex items-center gap-2 text-blue-300/70 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>ESP32 • Реално време • Аутоматизација</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Social Share Button */}
              <SocialShareButton />
              
              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden">
          <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-b from-blue-900 via-blue-800 to-cyan-800 p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white">Навигација</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-white/10 rounded-lg p-2 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <nav className="space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentPage === item.id
                      ? `bg-gradient-to-r ${item.activeColor} text-white shadow-lg ${item.shadowColor}`
                      : `text-white hover:bg-white/10 bg-gradient-to-r ${item.color} hover:${item.hoverColor}`
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
            
            {/* Social sharing in mobile menu */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="text-white/70 text-sm mb-3">Подели систем:</div>
              <SocialShareButton />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navigation - Enhanced */}
      <div className="hidden lg:flex justify-center mb-8">
        <div className="relative">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div>
          
          {/* Main navigation container */}
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-2 border border-white/10 shadow-2xl">
            <div className="flex gap-2">
              {menuItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-500 transform ${
                    currentPage === item.id
                      ? `bg-gradient-to-r ${item.activeColor} text-white shadow-2xl ${item.shadowColor} scale-105 z-10`
                      : `text-white/80 hover:text-white hover:scale-105 hover:bg-gradient-to-r ${item.color} ${item.hoverColor}`
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Icon with special effects for active tab */}
                  <div className={`relative transition-all duration-300 ${
                    currentPage === item.id ? 'scale-110' : 'group-hover:scale-110'
                  }`}>
                    {currentPage === item.id && (
                      <div className="absolute inset-0 bg-white/30 rounded-full blur-md"></div>
                    )}
                    <div className="relative">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Label with gradient effect */}
                  <span className={`relative transition-all duration-300 ${
                    currentPage === item.id 
                      ? 'font-bold' 
                      : 'group-hover:font-semibold'
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Active indicator */}
                  {currentPage === item.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"></div>
                  )}
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${item.color} blur-xl -z-10`}></div>
                </button>
              ))}
            </div>
            
            {/* Animated background indicator */}
            <div 
              className="absolute top-2 bottom-2 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl transition-all duration-500 ease-out"
              style={{
                left: `${(menuItems.findIndex(item => item.id === currentPage) * 25) + 1}%`,
                width: '23%',
                transform: 'translateX(-50%)'
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;