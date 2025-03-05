import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Upload, HelpCircle, MessageSquare, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-indigo-600' : 'hover:bg-gray-700';
  };

  const navItems = [
    { path: '/', icon: <Home className="h-4 w-4" />, label: 'Home' },
    { path: '/document-history', icon: <FileText className="h-4 w-4" />, label: 'Document History' },
    { path: '/document-upload', icon: <Upload className="h-4 w-4" />, label: 'Document Upload' },
    { path: '/how-it-works', icon: <HelpCircle className="h-4 w-4" />, label: 'How It Works' },
    { path: '/chatbot', icon: <MessageSquare className="h-4 w-4" />, label: 'Chatbot' }
  ];

  return (
    <nav className="bg-gray-800 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <Home className="h-6 w-6 text-indigo-500" />
              <span className="text-white font-semibold text-lg">Legal AI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${isActive(item.path)} text-gray-300 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`${isActive(item.path)} text-gray-300 block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 transition-colors`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}