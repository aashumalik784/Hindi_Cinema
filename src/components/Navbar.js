'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-dark border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🎬</span>
            <span className="text-xl font-bold text-white">Hindi Cinema</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/watch" className="text-gray-300 hover:text-white transition">
              🎥 Watch Free Movies
            </Link>
            <Link href="/movies" className="text-gray-300 hover:text-white transition">
              🆕 Latest Movies
            </Link>
            <Link href="/categories/public-domain/classic" className="text-gray-300 hover:text-white transition">
              📚 Classics
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/watch" className="block text-gray-300 hover:text-white">
              🎥 Watch Free Movies
            </Link>
            <Link href="/movies" className="block text-gray-300 hover:text-white">
              🆕 Latest Movies
            </Link>
            <Link href="/categories/public-domain/classic" className="block text-gray-300 hover:text-white">
              📚 Classics
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
              }
