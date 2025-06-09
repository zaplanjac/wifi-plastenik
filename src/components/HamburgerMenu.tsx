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
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'calendar' as CurrentPage,
      label: 'Календар',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: 'wifi' as CurrentPage,
      label: 'WiFi',
      icon: <Router className="w-5 h-5" />
    },
    {
      id: 'instructions' as CurrentPage,
      label: 'Упутства',
      icon: <BookOpen className="w-5 h-5" />
    }
  ];

  const handlePageChange = (page: CurrentPage) => {
    onPageChange(page);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Droplets className="w-8 h-8 text-white" />
          <h1 className="text-3xl font-bold text-white">МОЈА БАШТА</h1>
        </div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
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
                      ? 'bg-white text-blue-900 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden lg:flex justify-center mb-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
          <div className="flex gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentPage === item.id
                    ? 'bg-white text-blue-900 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;