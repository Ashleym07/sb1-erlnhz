import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Home, Grid, Image, Phone } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: <Home size={18} />, path: '/' },
    { name: 'Floor Plans', icon: <Grid size={18} />, path: '/floor-plans' },
    { name: 'Gallery', icon: <Image size={18} />, path: '/gallery' },
    { name: 'Contact', icon: <Phone size={18} />, path: '/contact' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-3'
          : 'bg-black/30 backdrop-blur-sm py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/')}
              className="relative group"
            >
              <span className={`text-3xl tracking-wider font-light ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                NOVARA
              </span>
              <span className={`block text-xs tracking-[0.3em] uppercase ${
                isScrolled ? 'text-gray-600' : 'text-white/80'
              }`}>
                Homes
              </span>
              <div className={`absolute -bottom-2 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                isScrolled ? 'bg-gray-900' : 'bg-white'
              }`} />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isScrolled
                    ? 'text-gray-900 hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                } ${
                  location.pathname === item.path
                    ? isScrolled
                      ? 'bg-gray-100'
                      : 'bg-white/20'
                    : ''
                }`}
              >
                {item.icon}
                <span className="text-sm tracking-wide">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-full transition-colors ${
                isScrolled
                  ? 'text-gray-900 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <div className={`rounded-2xl ${
              isScrolled
                ? 'bg-gray-100'
                : 'bg-white/10 backdrop-blur-md'
            } shadow-xl p-4 space-y-2`}>
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-colors ${
                    isScrolled
                      ? 'text-gray-900 hover:bg-gray-200'
                      : 'text-white hover:bg-white/10'
                  } ${
                    location.pathname === item.path
                      ? isScrolled
                        ? 'bg-gray-200'
                        : 'bg-white/20'
                      : ''
                  }`}
                >
                  {item.icon}
                  <span className="text-sm tracking-wide">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;