import React from 'react';
import { Book, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Book className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-semibold">LibraryMS</span>
            </div>
            <p className="text-gray-400 text-sm">
              Modern library management system for efficient book and member management.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="text-gray-400 hover:text-white text-sm block">
                Dashboard
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm block">
                Books
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm block">
                Members
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm block">
                Reports
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400 text-sm">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@libraryms.com</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 Library St, City, State</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 LibraryMS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;