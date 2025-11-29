import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export default function BlogFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-3">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8z">
          
          {/* About Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">MyBlog</h3>
            <p className="text-sm leading-relaxed mb-4">
              Sharing stories, insights, and knowledge with readers around the world. Stay connected for the latest articles and updates.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">Categories</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">Technology</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">Lifestyle</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">Travel</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">Food</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">Health</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-sm">123 Blog Street, Digital City, 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-sm">+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" />
                <span className="text-sm">contact@myblog.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} MyBlog. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}