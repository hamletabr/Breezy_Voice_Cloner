"use client";

import { useState, useRef } from "react";

interface TestingQuestion {
  id: string;
  question: string;
  category: string;
  icon: string;
}

interface PersonalizedAIChatProps {
  onBack: () => void;
  onComplete?: () => void;
}

const TEST_QUESTIONS: TestingQuestion[] = [
  {
    id: "service_call",
    question: "Do you offer emergency service calls?",
    category: "Emergency",
    icon: "🚨",
  },
  {
    id: "pricing",
    question: "What's your pricing for rewiring work?",
    category: "Pricing",
    icon: "💰",
  },
  {
    id: "warranty",
    question: "Do you provide warranties on your work?",
    category: "Warranty",
    icon: "✅",
  },
  {
    id: "availability",
    question: "Can you handle same-day appointments?",
    category: "Availability",
    icon: "⚡",
  },
  {
    id: "experience",
    question: "How many years of experience do you have?",
    category: "Experience",
    icon: "🔧",
  },
  {
    id: "permits",
    question: "Do you handle all the necessary permits?",
    category: "Permits",
    icon: "📋",
  },
  {
    id: "inspection",
    question: "Can you come for a free inspection?",
    category: "Inspection",
    icon: "🔍",
  },
  {
    id: "commercial",
    question: "Do you work on commercial properties?",
    category: "Commercial",
    icon: "🏢",
  },
];

const MOCK_RESPONSES: { [key: string]: string } = {
  service_call: "Yes, we offer 24/7 emergency service calls for electrical issues. We can typically arrive within an hour for urgent situations. There is a small emergency surcharge, but your safety is our priority.",
  pricing:
    "Our rewiring services start at $1500 for a single room. For whole-house rewiring, pricing depends on the square footage and complexity. We provide free estimates so you know the cost upfront.",
  warranty:
    "Absolutely! We provide a 5-year warranty on all our workmanship. If any issues arise related to our installation, we'll fix it at no additional charge. All materials come with manufacturer warranties as well.",
  availability:
    "We can often schedule same-day or next-day appointments for most jobs. For routine work like outlet installations, we're very flexible. Emergency calls are always our top priority.",
  experience:
    "Our team has over 20 years of combined experience in residential and commercial electrical work. All our electricians are licensed, insured, and continuously trained on the latest safety codes and technology.",
  permits:
    "Yes, we handle all necessary permits and inspections. Our team is familiar with local building codes and will ensure all work meets requirements. Permit costs are included in our project estimate.",
  inspection:
    "We'd love to! Free electrical inspections are part of our service. We'll assess your home's electrical system, identify any potential issues, and provide you with a detailed written report and recommendations.",
  commercial:
    "Yes, we specialize in both residential and commercial electrical work. We handle everything from small office buildouts to large-scale commercial installations with minimal downtime disruption.",
};

export default function PersonalizedAIChat({
  onBack,
  onComplete,
}: PersonalizedAIChatProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState<string | null>(
    null
  );
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTestQuestion = async (questionId: string) => {
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setSelectedQuestion(questionId);
    setGeneratedResponse(null);
    setIsAudioReady(false);
    setIsPlayingAudio(false);
    setError(null);
    setIsGenerating(true);

    // Simulate response delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = MOCK_RESPONSES[questionId];
    setGeneratedResponse(response);
    setIsGenerating(false);

    // Load and play audio
    await playGeneratedAudio(response, questionId);
  };

  const playGeneratedAudio = async (textToPlay?: string, questionId?: string) => {
    if (!textToPlay || !audioRef.current || !questionId) return;

    setError(null);

    try {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Load audio from static file
      const fetchResponse = await fetch(`/audio/${questionId}.mp3`);
      if (!fetchResponse.ok) {
        throw new Error(`Failed to load audio file for ${questionId}`);
      }

      const audioBlob = await fetchResponse.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Set up audio element
      audioRef.current.src = audioUrl;
      audioRef.current.onended = () => {
        setIsPlayingAudio(false);
        URL.revokeObjectURL(audioUrl);
      };

      // Audio is now ready - display the text and play
      setIsAudioReady(true);
      setIsPlayingAudio(true);

      // Play the audio
      await audioRef.current.play().catch((err) => {
        console.error("Error playing audio:", err);
        setError("Failed to play audio");
        setIsPlayingAudio(false);
      });
    } catch (err) {
      console.error("Failed to load audio:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load audio file. Make sure generate-audio.ts has been run."
      );
      setIsPlayingAudio(false);
      setIsAudioReady(false);
    }
  };

  return (
    <div className="w-full min-h-screen px-4 py-8 md:py-12 animate-fade-in bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
            Test Your AI
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Experience how your AI assistant responds to common customer questions
          </p>
        </div>
      </div>

      {/* Main Content - Response Box */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Virtual Agent Response
            </h3>
          </div>

          {!selectedQuestion && (
            <div className="text-center py-12">
              <div className="mb-4 text-4xl">🎙️</div>
              <p className="text-gray-600 text-base font-medium mb-2">No question selected yet</p>
              <p className="text-gray-500 text-sm">Choose a question below to hear how your AI responds</p>
            </div>
          )}

          {selectedQuestion && isGenerating && (
            <div className="py-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex gap-2">
                  <div
                    className="w-3 h-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700 mb-1">Generating response...</p>
              <p className="text-xs text-gray-500">Your AI is thinking</p>
            </div>
          )}

          {selectedQuestion && !isGenerating && !isAudioReady && (
            <div className="py-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex gap-2">
                  <div
                    className="w-3 h-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700 mb-1">Preparing audio...</p>
              <p className="text-xs text-gray-500">Loading voice synthesis</p>
            </div>
          )}

          {isAudioReady && generatedResponse && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <p className="text-base text-gray-800 leading-relaxed font-medium">
                  {generatedResponse}
                </p>
              </div>

              {isPlayingAudio && (
                <div className="flex items-center justify-center gap-3 py-3 bg-blue-50 rounded-lg">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                  <span className="text-sm font-medium text-blue-700">Audio playing...</span>
                </div>
              )}
            </div>
          )}

          {error && !isAudioReady && (
            <div className="bg-red-50 rounded-lg p-4 border border-red-200 border-l-4 border-l-red-500">
              <div className="flex gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="text-sm font-semibold text-red-700">Failed to load audio</p>
                  <p className="text-xs text-red-600 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Questions Below */}
      <div className="max-w-4xl mx-auto mb-12">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-6 flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
          Select a Customer Question
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {TEST_QUESTIONS.map((q) => (
            <button
              key={q.id}
              onClick={() => handleTestQuestion(q.id)}
              className={`group relative overflow-hidden p-4 rounded-xl text-center transition-all duration-300 transform border-2 text-sm font-semibold ${
                selectedQuestion === q.id
                  ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                  : "border-gray-200 bg-white text-gray-900 hover:border-blue-400 hover:shadow-md hover:scale-102 active:scale-95"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-2xl mb-2 transition-transform duration-300 group-hover:scale-110 inline-block">{q.icon}</div>
                <p className="leading-snug">{q.question}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto pt-12 border-t border-gray-200">
        <div className="text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ready to get started?
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Set up your AI voice assistant today and transform your customer service with intelligent, natural conversations
            </p>
          </div>
          <button
            onClick={() => onComplete?.()}
            className="inline-flex items-center justify-center gap-2 px-12 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl text-lg"
          >
            Get Started
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} />
    </div>
  );
}
