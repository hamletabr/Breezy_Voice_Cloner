"use client";

interface LandingPageProps {
  onCloneVoice: () => void;
}

export default function LandingPage({ onCloneVoice }: LandingPageProps) {
  return (
    <div className="w-full px-6 py-12 text-center animate-fade-in">
      <div className="max-w-3xl mx-auto">
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl font-black text-blue-600 mb-4 leading-tight tracking-tight">
            Breezy
          </h1>
          <div className="h-1 w-16 bg-blue-600 mx-auto mb-8"></div>
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight animate-slide-up">
          What if you never had to answer your phone again?
        </h2>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Experience how an AI assistant, speaking in your exact voice, handles every customer call with professionalism and empathy.
        </p>

        {/* CTA Button */}
        <button
          onClick={onCloneVoice}
          className="w-full px-10 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg mb-8"
        >
          Personalize with Your Voice
        </button>

        {/* Footer note */}
        <p className="text-gray-500 text-sm mt-12">
          See how Breezy transforms customer service with AI-powered call handling
        </p>
      </div>
    </div>
  );
}
