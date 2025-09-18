"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, Briefcase, Languages, Tag } from "lucide-react";

export default function Step5Slide2({
  onBack,
  onDashboard,            // <-- NEW: parent callback to show Dashboard
  websiteData,
  businessData,
  languageLocationData,
  keywordData = [],
  competitorData = null,
}) {
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);

  // Data shaping
  const industry = businessData?.industry || "—";
  const category = businessData?.category || null;

  const langSel = useMemo(() => {
    if (languageLocationData?.selections?.length) {
      return languageLocationData.selections[0];
    }
    return { language: "English", location: "" };
  }, [languageLocationData]);

  const keywords = Array.isArray(keywordData) ? keywordData : [];

  const competitorsRight =
    competitorData?.businessCompetitors && competitorData.businessCompetitors.length
      ? competitorData.businessCompetitors
      : competitorData?.totalCompetitors || [];

  const clean = (s) => (typeof s === "string" ? s.replace(/-\d+$/, "") : s);

  // When user clicks Dashboard:
  // 1) show loading visuals
  // 2) after ~6s, tell parent to render <Dashboard />
  const handleDashboard = () => {
    if (loading) return;
    setLoading(true);
    // 6s sits nicely in the 5–8s window you requested
    timeoutRef.current = setTimeout(() => {
      onDashboard?.(); // parent flips to Dashboard
    }, 6000);
  };

  // Cleanup timer if user navigates away
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const Card = ({ icon, title, children }) => (
    <div className="rounded-2xl bg-white border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 px-6 pt-6 pb-3">
        <span className="text-gray-700">{icon}</span>
        <h3 className="text-gray-800 font-semibold">{title}</h3>
      </div>
      <div className="border-t border-gray-200/70" />
      <div className="px-6 py-6">{children}</div>
    </div>
  );

  const Chip = ({ children }) => (
    <span className="inline-flex items-center rounded-md border border-gray-200 bg-gray-100 text-gray-700 px-4 py-2 text-sm shadow-inner">
      {children}
    </span>
  );

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="max-w-[1120px] mx-auto px-6 pt-14 pb-20">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Great! You’re all done.</h1>
          <p className="mt-2 text-gray-600">
            Here is your <span className="font-semibold">entire report</span> biased on your input
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card icon={<Briefcase size={18} />} title="Business Selected">
            <div className="space-y-4">
              <div className="text-gray-700">{industry}</div>
              {category && <Chip>{category}</Chip>}
            </div>
          </Card>

          <Card icon={<Languages size={18} />} title="Language Selected">
            <div className="space-y-4">
              <div className="text-gray-700">{langSel.language || "English"}</div>
              {langSel.location && <Chip>{langSel.location}</Chip>}
            </div>
          </Card>

          <Card icon={<Tag size={18} />} title="Keyword Selected">
            <div className="flex flex-wrap gap-3">
              {keywords.slice(0, 6).map((k, i) => (
                <Chip key={i}>{k}</Chip>
              ))}
            </div>
          </Card>

          <Card icon={<Briefcase size={18} />} title="Business Selected">
            <div className="space-y-4">
              <div className="text-gray-700">{industry}</div>
              <div className="flex flex-wrap gap-3">
                {competitorsRight.slice(0, 6).map((c, i) => (
                  <Chip key={i}>{clean(c)}</Chip>
                ))}
                {competitorsRight.length === 0 && (
                  <span className="text-gray-500 text-sm">No competitors selected</span>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* CTA / Loading */}
        {!loading ? (
          <div className="mt-14 text-center">
            <p className="text-gray-600">
              All set? Click <span className="font-semibold text-gray-900">‘Dashboard’</span> to continue.
            </p>
            <button
              onClick={onBack}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <button
              onClick={handleDashboard}   // <-- use our handler
              className="mt-6 ml-4 inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3 text-white hover:bg-black"
            >
              Dashboard
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="mt-14 flex flex-col items-center">
            <p className="text-gray-700">Great thing take time!</p>
            <p className="text-gray-600">
              Preparing your <span className="font-semibold">Dashboard</span>.
            </p>

            {/* Wave Loader — seamless tiling (no seam) */}
            <div className="mt-6 wave-loader">
              <div className="shine" />
              <div className="layer layer-back">
                <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="seg">
                  <defs>
                    <linearGradient id="inkBack" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#1f2937" />
                    </linearGradient>
                  </defs>
                  <path d="M0 30 Q 25 22 50 30 T 100 30 T 150 30 T 200 30 V60 H0 Z" fill="url(#inkBack)" />
                </svg>
                <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="seg clone">
                  <defs>
                    <linearGradient id="inkBack2" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#1f2937" />
                    </linearGradient>
                  </defs>
                  <path d="M0 30 Q 25 22 50 30 T 100 30 T 150 30 T 200 30 V60 H0 Z" fill="url(#inkBack2)" />
                </svg>
              </div>

              <div className="layer layer-front">
                <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="seg">
                  <defs>
                    <linearGradient id="inkFront" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#1f2937" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>
                  <path d="M0 30 Q 25 18 50 30 T 100 30 T 150 30 T 200 30 V60 H0 Z" fill="url(#inkFront)" />
                </svg>
                <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="seg clone">
                  <defs>
                    <linearGradient id="inkFront2" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#1f2937" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>
                  <path d="M0 30 Q 25 18 50 30 T 100 30 T 150 30 T 200 30 V60 H0 Z" fill="url(#inkFront2)" />
                </svg>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6 w-full max-w-[560px]">
              <div className="progress-wrap">
                <span className="progress-dot" />
                <span className="progress-chunk" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Styles for loader + progress */}
      <style jsx>{`
        /* Progress */
        .progress-wrap {
          position: relative;
          height: 8px;
          width: 100%;
          border-radius: 9999px;
          background: #d9dee6;
          overflow: hidden;
        }
        .progress-dot {
          position: absolute;
          left: -1%;
          top: 50%;
          transform: translate(-50%, -50%);
          height: 8px;
          width: 8px;
          border-radius: 9999px;
          background: #0f172a;
          box-shadow: 0 0 0 2px #d9dee6;
          animation: dotPulse 2200ms ease-in-out infinite;
        }
        .progress-chunk {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 34%;
          border-radius: 9999px;
          background: #0f172a;
          animation: chunkSlide 2200ms cubic-bezier(0.37, 0.01, 0.22, 1) infinite;
        }
        @keyframes chunkSlide {
          0% { transform: translateX(-120%); }
          50% { transform: translateX(36%); }
          100% { transform: translateX(300%); }
        }
        @keyframes dotPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.06); }
        }

        /* Wave bowl (seamless) */
        .wave-loader {
          height: 46px;
          width: 46px;
          border-radius: 9999px;
          overflow: hidden;
          border: 4px solid #0b1220;
          background: #ffffff;
          position: relative;
        }
        .shine {
          position: absolute;
          top: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 72%;
          height: 26%;
          border-radius: 0 0 9999px 9999px;
          background: radial-gradient(
            ellipse at 50% 0%,
            rgba(255, 255, 255, 0.96),
            rgba(255, 255, 255, 0.2) 70%,
            transparent 80%
          );
          pointer-events: none;
          z-index: 3;
        }

        .layer {
          position: absolute;
          inset: 0;
          bottom: -2px;
          height: 120%;
          transform: translateY(20%);
          animation: waterBob 6000ms ease-in-out infinite;
        }
        .seg {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 200%;
          height: 140%;
        }
        .seg.clone {
          left: 200%;
        }

        .layer-back {
          opacity: 0.9;
          animation:
            waterBob 6800ms ease-in-out infinite,
            driftBack 6800ms linear infinite;
        }
        .layer-front {
          opacity: 0.98;
          animation:
            waterBob 5600ms ease-in-out infinite,
            driftFront 5600ms linear infinite;
        }

        @keyframes driftFront {
          0% { transform: translate(0, 20%); }
          100% { transform: translate(-200%, 20%); }
        }
        @keyframes driftBack {
          0% { transform: translate(0, 20%); }
          100% { transform: translate(-200%, 20%); }
        }

        @keyframes waterBob {
          0% { transform: translateY(20%); }
          50% { transform: translateY(13.5%); }
          100% { transform: translateY(20%); }
        }
      `}</style>
    </div>
  );
}
