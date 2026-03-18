"use client";

import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import VoiceRecordingPage from "@/components/VoiceRecordingPage";
import ProcessingPage from "@/components/ProcessingPage";
import PersonalizedAIChat from "@/components/PersonalizedAIChat";
import SignUpPage from "@/components/SignUpPage";

type PageState = 
  | "landing" 
  | "voice-recording"
  | "voice-processing"
  | "voice-chat"
  | "signup";

export default function Home() {
  const [pageState, setPageState] = useState<PageState>("landing");
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);

  const handleStartVoiceCloning = () => {
    setPageState("voice-recording");
  };

  const handleVoiceRecordingComplete = (audioBlob: Blob, audioUrl: string) => {
    setRecordingBlob(audioBlob);
    setPageState("voice-processing");
  };

  const handleVoiceProcessingComplete = (newVoiceId: string) => {
    // Voice ID no longer needed - using static audio files instead
    setPageState("voice-chat");
  };

  const handleChatComplete = () => {
    setPageState("signup");
  };

  const handleReset = () => {
    setPageState("landing");
    setRecordingBlob(null);
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      {pageState === "landing" && (
        <LandingPage 
          onCloneVoice={handleStartVoiceCloning}
        />
      )}
      {pageState === "voice-recording" && (
        <VoiceRecordingPage
          onRecordingComplete={handleVoiceRecordingComplete}
          onBack={() => setPageState("landing")}
        />
      )}
      {pageState === "voice-processing" && (
        <ProcessingPage
          recordingBlob={recordingBlob || undefined}
          onComplete={handleVoiceProcessingComplete}
          onBack={() => setPageState("voice-recording")}
        />
      )}
      {pageState === "voice-chat" && (
        <PersonalizedAIChat
          onBack={handleReset}
          onComplete={handleChatComplete}
        />
      )}
      {pageState === "signup" && (
        <SignUpPage
          onBack={handleReset}
        />
      )}
    </main>
  );
}
