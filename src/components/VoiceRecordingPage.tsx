"use client";

import { useState, useRef } from "react";

interface VoiceRecordingPageProps {
  onRecordingComplete: (audioBlob: Blob, audioUrl: string) => void;
  onBack: () => void;
}

export default function VoiceRecordingPage({
  onRecordingComplete,
  onBack,
}: VoiceRecordingPageProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      // Set initializing state to show loading feedback
      setIsInitializing(true);
      setError("");
      setRecordingTime(0);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setPreviewUrl(url);
        setHasRecording(true);
        
        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      
      // Timer starts immediately
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 120) {
            stopRecording();
            return 120;
          }
          return prev + 1;
        });
      }, 1000);

      // Only update UI after microphone setup is complete
      setIsRecording(true);
      setIsInitializing(false);
    } catch (err) {
      // Revert UI state if microphone access fails
      setIsRecording(false);
      setIsInitializing(false);
      
      // Provide user-friendly error messages
      let errorMessage = "Failed to access microphone. Please check permissions.";
      if (err instanceof Error) {
        if (err.name === "NotAllowedError" || err.message.includes("Permission denied")) {
          errorMessage = "Please enable the microphone to proceed";
        } else {
          errorMessage = err.message;
        }
      }
      setError(errorMessage);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      // Stop recording first (mediaRecorder.onstop will process audio in background)
      mediaRecorderRef.current.stop();
      
      // Then update UI state
      setIsRecording(false);
      setHasRecording(true);
      if (timerRef.current) clearInterval(timerRef.current);
      
      // Add 1 second to account for partial second elapsed
      setRecordingTime((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (previewUrl && mediaRecorderRef.current) {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      onRecordingComplete(audioBlob, previewUrl);
    }
  };

  const handleReset = () => {
    setHasRecording(false);
    setPreviewUrl("");
    setRecordingTime(0);
    audioChunksRef.current = [];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-12 animate-fade-in">
      {/* Progress Indicator */}
      <div className="mb-12 flex items-center justify-center gap-3 text-base">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm">1</span>
          <span className="text-gray-700 font-semibold">Record Voice</span>
        </div>
        <span className="text-gray-400 mx-2">→</span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-300 text-gray-600 font-bold text-sm">2</span>
          <span className="text-gray-500">Process</span>
        </div>
        <span className="text-gray-400 mx-2">→</span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-300 text-gray-600 font-bold text-sm">3</span>
          <span className="text-gray-500">Test</span>
        </div>
      </div>

      {/* Header - Page Purpose */}
      <div className="w-full max-w-xl text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
          Train your AI front desk
        </h1>
        <p className="text-lg text-gray-600">
          Record a short greeting so your AI can sound like you.
        </p>
      </div>

      <div className="w-full max-w-xl space-y-8">
        {/* Purpose Statement */}
        <div className="text-center">
          <p className="text-gray-700 text-lg font-semibold">
            We&apos;ll use this to make your AI sound like you when answering customers.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-300 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Recording Interface - MAIN FOCUS */}
        {!hasRecording ? (
          <div className="space-y-6">
            {/* Recording Button & Stopwatch Container - Smooth Transition */}
            <div className="transition-all duration-300 ease-in-out h-16">
              {!isRecording ? (
                // Start Recording Button
                <button
                  onClick={startRecording}
                  className="w-full h-full rounded-xl font-bold text-lg transition-all duration-300 transform bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
                >
                  <span className="text-2xl mr-2">🎤</span>
                  Start Recording
                </button>
              ) : (
                // Recording State: Stopwatch + Stop Button (Horizontal Layout)
                <div className="flex gap-4 items-stretch h-full">
                  {/* Stopwatch Display */}
                  <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl px-4 py-3 border border-blue-200 flex items-center justify-center gap-3 shadow-sm">
                    {/* Recording Indicator */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">REC</span>
                    </div>
                    
                    {/* Timer */}
                    <div className="text-2xl font-black text-blue-600 font-mono tracking-tight">
                      {formatTime(recordingTime)}
                    </div>
                  </div>

                  {/* Stop Recording Button */}
                  <button
                    onClick={stopRecording}
                    className="px-8 rounded-xl font-bold text-lg transition-all duration-300 transform bg-red-600 text-white hover:bg-red-700 hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center whitespace-nowrap"
                  >
                    <span className="text-2xl mr-2">⏹</span>
                    Stop
                  </button>
                </div>
              )}
            </div>

            {/* Tips Section */}
            <div className="bg-blue-50 rounded-lg p-5 space-y-2 border border-blue-200">
              <p className="text-sm text-gray-700 font-semibold uppercase tracking-wide">💡 Tips for best results:</p>
              <ul className="text-base text-gray-700 space-y-2">
                <li>• Speak clearly and naturally</li>
                <li>• Record in a quiet space</li>
                <li>• Use your normal customer tone</li>
                <li>• Ideally use headphones with a built-in microphone</li>
              </ul>
              <div className="pt-3 border-t border-blue-200 mt-3">
                <p className="text-sm text-blue-700 font-medium">💬 Aim for at least 10 seconds of audio for the best AI quality</p>
              </div>
            </div>

            {/* Example Script - Optional Reference */}
            <div className="text-center border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide mb-3">
                Example script (optional)
              </p>
              <p className="text-base text-gray-600 italic px-4">
                &quot;Hey, this is [Your Business Name]&mdash;how can I help? 
                Um, yeah, just let me know what&apos;s going on and I&apos;ll take care of it.&quot;
              </p>
              <p className="text-sm text-gray-500 mt-3">
                Or just say whatever feels natural to you
              </p>
            </div>

          </div>
        ) : (
          <div className="space-y-6">
            {/* Recording Success & Preview */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border-2 border-blue-200 p-5 shadow-lg hover:shadow-xl transition-shadow">
                <div className="space-y-4">
                  {/* Success Section */}
                  <div className="flex flex-col items-center gap-3 pb-4 border-b border-gray-200">
                    {/* Success Circle Icon */}
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="text-2xl text-green-600">✓</div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-1">
                      <h2 className="text-xl font-bold text-gray-900">
                        Perfect!
                      </h2>
                    </div>
                  </div>

                  {/* Preview Section */}
                  {previewUrl && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🔊</span>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          Review your recording
                        </h3>
                      </div>

                      {/* Audio Player */}
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-2">
                        <audio
                          src={previewUrl}
                          controls
                          className="w-full rounded-lg accent-blue-600"
                          style={{ height: '32px' }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                ✓ Continue
              </button>
              <button
                onClick={handleReset}
                className="w-full py-3 text-blue-600 hover:text-blue-700 transition-colors font-semibold text-base"
              >
                Re-record
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
