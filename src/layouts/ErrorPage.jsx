import React, { useEffect, useState } from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const routeError = useRouteError();
  const message = routeError?.statusText || routeError?.message || '';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center relative overflow-hidden">

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(193,127,58,0.12)_0%,transparent_70%)] blur-[80px] animate-pulse" />
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(193,127,58,0.08)_0%,transparent_70%)] blur-[80px] animate-pulse"
          style={{ animationDelay: '1.5s' }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(193,127,58,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(193,127,58,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center text-center px-6 py-10 max-w-xl w-full transition-all duration-700 ease-out ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        {/* Hanger Illustration */}
        <div className="relative w-56 h-64 mb-12" style={{ animation: 'illustrationIn 0.8s ease 0.2s both' }}>

          {/* Full hanger + garment swaying together */}
          <div
            className="absolute top-0 left-1/2 flex flex-col items-center"
            style={{ transform: 'translateX(-50%)', animation: 'hangerSway 4s ease-in-out infinite', transformOrigin: 'top center' }}
          >
            {/* Hook arc */}
            <div className="w-7 h-[14px] border-[3px] border-[#c17f3a] border-b-0 rounded-t-full" />
            {/* Hook stem */}
            <div className="w-[3px] h-4 bg-[#c17f3a] rounded-b" />
            {/* Bar */}
            <div
              className="w-40 h-[3px] rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, #c17f3a, transparent)' }}
            />
            {/* Left & right diagonal straps */}
            <div className="relative w-40 h-6">
              <div className="absolute left-0 top-0 w-[3px] h-6 bg-[#c17f3a] rounded origin-top rotate-[40deg]" />
              <div className="absolute right-0 top-0 w-[3px] h-6 bg-[#c17f3a] rounded origin-top -rotate-[40deg]" />
            </div>

            {/* Garment body */}
            <div
              className="w-36 h-44 rounded-t rounded-b-[20px] border border-[rgba(193,127,58,0.25)] relative overflow-hidden shadow-[0_8px_32px_rgba(193,127,58,0.15)]"
              style={{ background: 'linear-gradient(160deg,#ffffff 0%,#f5ebe0 100%)' }}
            >
              {/* Fabric fold lines */}
              {[30, 55, 78].map((top) => (
                <div
                  key={top}
                  className="absolute left-0 right-0 h-[1.5px]"
                  style={{
                    top: `${top}%`,
                    background: 'linear-gradient(90deg, transparent, rgba(193,127,58,0.2), transparent)',
                  }}
                />
              ))}
              {/* 404 tag */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[40px] font-semibold text-[#c17f3a] leading-none tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                404
              </div>
            </div>
          </div>

          {/* Floating accent dots */}
          {[
            { cls: 'w-2 h-2 top-8 left-3 opacity-40', delay: '0s' },
            { cls: 'w-[5px] h-[5px] top-20 right-2 opacity-30', delay: '-1s' },
            { cls: 'w-1.5 h-1.5 bottom-10 left-5 opacity-25', delay: '-2s' },
            { cls: 'w-1 h-1 bottom-4 right-4 opacity-35', delay: '-0.5s' },
          ].map((d, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-[#c17f3a] ${d.cls}`}
              style={{ animation: 'dotFloat 3s ease-in-out infinite', animationDelay: d.delay }}
            />
          ))}
        </div>

        {/* Eyebrow */}
        <p
          className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#c17f3a] mb-3"
          style={{ animation: 'textIn 0.6s ease 0.4s both' }}
        >
          Oops — Lost in the wardrobe
        </p>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl font-semibold text-[#1c1c1a] leading-tight mb-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", animation: 'textIn 0.6s ease 0.5s both' }}
        >
          Page Not{' '}
          <em className="italic font-light text-[#c17f3a]">Found</em>
        </h1>

        {/* Description */}
        <p
          className="text-[15px] leading-relaxed text-[#5a5a56] max-w-md"
          style={{ animation: 'textIn 0.6s ease 0.6s both' }}
        >
          It seems this page has gone out of style. The link may be broken,
          or the page may have moved to a new collection.
        </p>

        {/* Error detail */}
        {message && (
          <div
            className="mt-3 text-xs text-[#9e9e9a] bg-[#eeeeec] px-4 py-1.5 rounded-full font-mono"
            style={{ animation: 'textIn 0.6s ease 0.65s both' }}
          >
            {message}
          </div>
        )}

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center gap-3 mt-10 w-full sm:w-auto"
          style={{ animation: 'textIn 0.6s ease 0.75s both' }}
        >
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 bg-[#c17f3a] text-white text-sm font-semibold rounded-lg shadow-[0_4px_16px_rgba(193,127,58,0.3)] hover:bg-[#a06828] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(193,127,58,0.35)] transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to Homepage
          </Link>

          <Link
            to="/shop"
            className="group flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 bg-white text-[#1c1c1a] text-sm font-semibold rounded-lg border border-[#d8d8d5] hover:border-[#c17f3a] hover:text-[#c17f3a] hover:-translate-y-0.5 transition-all duration-200"
          >
            Browse Collection
            <svg
              className="group-hover:translate-x-1 transition-transform duration-200"
              width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Brand mark */}
        <div
          className="flex items-center gap-2 mt-14 opacity-40"
          style={{ animation: 'textIn 0.6s ease 0.9s both' }}
        >
          <span className="text-[#c17f3a] text-[9px]">●</span>
          <span
            className="text-lg font-semibold text-[#1c1c1a] tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            GlowBerry
          </span>
        </div>
      </div>

      {/* Keyframes + Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,500&display=swap');
        @keyframes hangerSway {
          0%, 100% { transform: translateX(-50%) rotate(-2deg); }
          50%       { transform: translateX(-50%) rotate(2deg); }
        }
        @keyframes dotFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes illustrationIn {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes textIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;