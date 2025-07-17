import React from 'react';
import { Book, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Book className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              LibraryMS
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
               Home
              </Link>
              <Link to="/allbooks" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
               All Books
              </Link>
              <Link to="/addbooks" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
               Add Books
              </Link>
              <Link to="/borrow" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Borrow Summary
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
               <Link to="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
               Home
              </Link>
              <Link to="/allbooks" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
               All Books
              </Link>
              <Link to="/addbooks" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
               Add Books
              </Link>
              <Link to="/borrow" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Borrow Summary
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;