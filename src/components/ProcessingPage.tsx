"use client";

import { useEffect, useState } from "react";

interface ProcessingPageProps {
  onComplete: (voiceId: string) => void;
  onBack: () => void;
  recordingBlob?: Blob;
}

export default function ProcessingPage({
  onComplete,
  onBack,
  recordingBlob,
}: ProcessingPageProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>("Initializing voice processing...");
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string>("");

  const [particles, setParticles] = useState<
    Array<{ id: number; left: number; delay: number }>
  >([]);

  const [neurons, setNeurons] = useState<
    Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>
  >([]);

  // particles
  useEffect(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  // 🧠 NEW: neural bubbles
  useEffect(() => {
    const newNeurons = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 16,
      duration: 8 + Math.random() * 14,
      delay: Math.random() * -15,
    }));
    setNeurons(newNeurons);
  }, []);

  useEffect(() => {
    const processVoice = async () => {
      try {
        const stages = [
          { progress: 15, status: "Uploading audio sample..." },
          { progress: 30, status: "Analyzing voice characteristics..." },
          { progress: 45, status: "Extracting voice patterns..." },
          { progress: 60, status: "Training personalized model..." },
          { progress: 75, status: "Optimizing voice synthesis..." },
          { progress: 90, status: "Finalizing setup..." },
          { progress: 100, status: "Complete! Your voice is ready." },
        ];

        for (const stage of stages) {
          await new Promise((resolve) => setTimeout(resolve, 1200));
          setProgress(stage.progress);
          setStatus(stage.status);
        }

        setIsComplete(true);
        setTimeout(() => onComplete("voice_" + Date.now()), 1000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to process voice");
      }
    };

    processVoice();
  }, [recordingBlob, onComplete]);

  const waveformBars = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    height: 20 + Math.sin(progress / 10 + i) * 30,
  }));

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      
      {/* Multi-layer Gradient Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"
        style={{
          animation: "gradient-shift 15s ease-in-out infinite",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
          animation: "gradient-move 8s ease-in-out infinite",
        }}
      />

      {/* Secondary animated overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 80% 20%, rgba(147, 51, 234, 0.06) 0%, transparent 50%)",
          animation: "gradient-move-reverse 12s ease-in-out infinite",
        }}
      />

      
      {/* Network Connections - Synapses - Static render */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.5, willChange: "contents" }}>
        {neurons.slice(0, 15).map((neuron1, idx1) => (
          neurons
            .slice(idx1 + 1, Math.min(idx1 + 4, neurons.length))
            .map((neuron2, idx2) => {
              const distance = Math.sqrt(
                Math.pow((neuron2.x - neuron1.x) * window.innerWidth / 100, 2) +
                Math.pow((neuron2.y - neuron1.y) * window.innerHeight / 100, 2)
              );
              
              if (distance > 280) return null;
              
              const x1 = (neuron1.x / 100) * window.innerWidth;
              const y1 = (neuron1.y / 100) * window.innerHeight;
              const x2 = (neuron2.x / 100) * window.innerWidth;
              const y2 = (neuron2.y / 100) * window.innerHeight;
              
              return (
                <line
                  key={`connection-${idx1}-${idx2}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#neuron-gradient)"
                  strokeWidth="1.2"
                  opacity="0.35"
                  style={{
                    animation: `synapse-pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                    animationDelay: `${Math.random() * 1.5}s`,
                    willChange: "stroke-width",
                  }}
                />
              );
            })
            .filter(Boolean)
        ))}
        <defs>
          <linearGradient id="neuron-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.9)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0.5)" />
          </linearGradient>
        </defs>
      </svg>

      {/* 🧠 Neural bubbles - CSS-animated neurons */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.95, backfaceVisibility: "hidden" }}>
        <defs>
          <filter id="neuron-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0" />
          </filter>
        </defs>
        {neurons.map((n) => {
          const x = (n.x / 100) * window.innerWidth;
          const y = (n.y / 100) * window.innerHeight;
          const dendrites = 3 + Math.floor(n.size / 4);
          
          return (
            <g
              key={n.id}
              style={{
                animation: `neuron-float ${n.duration}s cubic-bezier(0.4, 0.2, 0.6, 0.8) infinite`,
                animationDelay: `${n.delay}s`,
                transformOrigin: `${x}px ${y}px`,
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              {/* Dendrites */}
              {Array.from({ length: dendrites }).map((_, i) => {
                const angle = (i / dendrites) * Math.PI * 2;
                const length = n.size * 1.3 + Math.random() * 3;
                const endX = x + Math.cos(angle) * length;
                const endY = y + Math.sin(angle) * length;
                
                return (
                  <line
                    key={`dendrite-${n.id}-${i}`}
                    x1={x}
                    y1={y}
                    x2={endX}
                    y2={endY}
                    stroke={`rgba(59, 130, 246, 0.6)`}
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    opacity="0.75"
                    style={{
                      animation: `dendrite-pulse ${1.8 + (i % 2) * 0.5}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                      animationDelay: `${(i * 0.15) + Math.random() * 0.3}s`,
                      willChange: "stroke-width, opacity",
                    }}
                  />
                );
              })}
              
              {/* Soma glow ring */}
              <circle
                cx={x}
                cy={y}
                r={n.size * 0.75}
                fill="none"
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="0.8"
                style={{
                  animation: `soma-pulse ${1.8}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                  animationDelay: `${n.delay}s`,
                  willChange: "r, opacity",
                }}
              />
              
              {/* Soma - Main body */}
              <circle
                cx={x}
                cy={y}
                r={n.size * 0.5}
                fill="rgba(59, 130, 246, 0.65)"
                style={{
                  filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.7)) drop-shadow(0 0 12px rgba(34, 211, 238, 0.3))",
                  animation: `neuron-glow ${2.2}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                  animationDelay: `${n.delay}s`,
                  willChange: "filter",
                }}
              />
              
              {/* Inner core - bright */}
              <circle
                cx={x}
                cy={y}
                r={n.size * 0.3}
                fill="rgba(147, 211, 255, 0.95)"
                style={{
                  filter: "drop-shadow(0 0 3px rgba(147, 211, 255, 0.8))",
                  opacity: 0.9,
                  willChange: "opacity",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Particle trails */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full"
            style={{
              left: `${p.left}%`,
              width: "3px",
              height: "3px",
              animation: `float-enhanced 12s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              opacity: 0.7,
              boxShadow: "0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(34, 211, 238, 0.4)",
            }}
          />
        ))}
      </div>

      {/* Primary Glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      />

      {/* Secondary Glow layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(147, 51, 234, 0.08) 0%, transparent 60%)",
          animation: "pulse-glow-secondary 6s ease-in-out infinite",
          animationDelay: "1s",
        }}
      />

      {/* Shimmer effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.08) 50%, transparent 70%)",
          animation: "shimmer 6s ease-in-out infinite",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <h1 className="text-5xl font-black mb-4 text-gray-900">
          Processing Your Voice
        </h1>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 border shadow-2xl max-w-xl w-full">
          
          {/* Progress Circle */}
          <div className="flex justify-center mb-8">
            <div className="relative w-36 h-36">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(progress / 100) * 339.3} 339.3`}
                  style={{
                    transition: "stroke-dasharray 0.6s ease-out",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-blue-600">
                {progress}%
              </div>
            </div>
          </div>

          {/* Status */}
          <p className="text-center text-gray-700 font-semibold mb-6 transition-all duration-500">
            {status}
          </p>

          {/* Waveform */}
          <div className="flex justify-center gap-1 h-10 mb-6">
            {waveformBars.map((bar) => (
              <div
                key={bar.id}
                className="w-1 bg-blue-400 rounded-full"
                style={{
                  height: `${bar.height}px`,
                  transition: "height 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* Steps */}
          <div className="space-y-3 bg-white/95 backdrop-blur-2xl rounded-xl p-4 border border-gray-200 shadow-md">
            {["Upload", "Analyze", "Extract", "Train", "Optimize", "Finalize"].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    progress > i * 15 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {progress > i * 15 ? "✓" : i + 1}
                </div>
                <span>{s}</span>
              </div>
            ))}
          </div>

          {isComplete && (
            <div className="mt-6 text-green-600 text-center font-bold">
              ✓ Your voice is ready!
            </div>
          )}
        </div>
      </div>

      {/* 🧠 KEYFRAMES */}
      <style jsx>{`
        @keyframes neuron-float {
          0% {
            transform: translate3d(0, 0, 0) scale(0.95);
            opacity: 0.25;
          }
          25% {
            transform: translate3d(22px, -35px, 0) scale(1.25);
            opacity: 0.95;
          }
          50% {
            transform: translate3d(-18px, -75px, 0) scale(0.85);
            opacity: 0.65;
          }
          75% {
            transform: translate3d(-28px, -28px, 0) scale(1.15);
            opacity: 0.85;
          }
          100% {
            transform: translate3d(0, 0, 0) scale(0.95);
            opacity: 0.25;
          }
        }

        @keyframes dendrite-pulse {
          0%, 100% {
            stroke-width: 0.6;
            opacity: 0.35;
          }
          50% {
            stroke-width: 1.3;
            opacity: 0.85;
          }
        }

        @keyframes soma-pulse {
          0%, 100% {
            r: 7px;
            opacity: 0.15;
            stroke-width: 0.8;
          }
          50% {
            r: 11px;
            opacity: 0.6;
            stroke-width: 1.5;
          }
        }

        @keyframes neuron-glow {
          0%, 100% {
            opacity: 0.55;
          }
          50% {
            opacity: 0.75;
          }
        }

        @keyframes synapse-pulse {
          0%, 100% {
            stroke-width: 1;
            opacity: 0.15;
          }
          50% {
            stroke-width: 1.8;
            opacity: 0.65;
          }
        }

        @keyframes float-enhanced {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(28px, -55px, 0) scale(1.15);
          }
          66% {
            transform: translate3d(-38px, -95px, 0) scale(0.9);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.9;
          }
        }

        @keyframes pulse-glow-secondary {
          0%, 100% {
            transform: scale3d(1, 1, 1);
            opacity: 0.25;
          }
          50% {
            transform: scale3d(1.08, 1.08, 1);
            opacity: 0.75;
          }
        }

        @keyframes gradient-move {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(45px, 45px, 0);
          }
        }

        @keyframes gradient-move-reverse {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-45px, -45px, 0);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        `}
      </style>
    </div>
  );
}