'use client';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { 
  HomeIcon, Search, TrendingUp, Map, Calculator, Building,
  AlertCircle, Settings
} from 'lucide-react';
import SearchBar from './components/SearchBar';

interface NavItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
}

function NavItem({ 
  icon,
  children,
  href = '#' 
}: NavItemProps) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-100">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white">
        <div className="h-16 flex items-center px-6 border-b border-slate-700">
          <span className="text-xl font-bold text-white">HomeAI Canada</span>
        </div>
        
        <nav className="p-4 space-y-2">
          <NavItem icon={<HomeIcon size={20} />} href="/">Home</NavItem>
          <NavItem icon={<Search size={20} />} href="/search">Search</NavItem>
          <NavItem icon={<TrendingUp size={20} />} href="/trends">Market Trends</NavItem>
          <NavItem icon={<Map size={20} />} href="/map">Map View</NavItem>
          <NavItem icon={<Calculator size={20} />} href="/calculator">Mortgage Calculator</NavItem>
          <NavItem icon={<Building size={20} />} href="/properties">Property Types</NavItem>
          <NavItem icon={<AlertCircle size={20} />} href="/about">About</NavItem>
          <NavItem icon={<Settings size={20} />} href="/settings">Settings</NavItem>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Find Your Dream Home</h1>
          <div className="max-w-3xl">
            <SearchBar />
          </div>
          
          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Natural Language Search"
              description="Search for properties using everyday language - just like talking to a real estate agent."
            />
            <FeatureCard
              title="Market Insights"
              description="Get real-time market data and trends to make informed decisions."
            />
            <FeatureCard
              title="Smart Recommendations"
              description="Receive personalized property recommendations based on your preferences."
            />
          </div>
        </div>
      </div>
    </div>
  );
}