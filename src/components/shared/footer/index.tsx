import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                SEA Catering
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Your partner for healthy, customizable meals delivered fresh to your door across
              Indonesia.
            </p>
            {/* Social Media */}
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/subscription"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Subscription
                </Link>
              </li>
              <li>
                <Link
                  href="/manage"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Manage Orders
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#faq"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#help"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="mailto:hello@seacatering.com"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  hello@seacatering.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="tel:+6281234567890"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  +62 812-3456-7890
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              &copy; {currentYear} SEA Catering. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#privacy"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
              >
                Privacy
              </a>
              <a
                href="#terms"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
              >
                Terms
              </a>
              <a
                href="#cookies"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
