"use client";

import { useState } from "react";

interface SignUpPageProps {
  onBack: () => void;
}

export default function SignUpPage({ onBack }: SignUpPageProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "professional">("professional");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full min-h-screen px-4 py-8 md:py-12 animate-fade-in bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">✨</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Welcome aboard!
            </h1>
          </div>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            We&apos;ve sent a confirmation email to <span className="font-semibold text-gray-900">{email}</span>. Your AI voice assistant is ready to transform your customer service!
          </p>

          <button
            onClick={onBack}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-4 py-8 md:py-12 animate-fade-in bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
            Get Started
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Set up your AI voice assistant and choose the perfect plan for your business
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Main Form Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Account Information
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-base text-gray-900 bg-white placeholder-gray-500"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Business Email
              </label>
              <input
                type="email"
                placeholder="john@yourcompany.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-base text-gray-900 bg-white placeholder-gray-500"
                required
              />
            </div>

            {/* Subscription Plans */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Choose Your Plan
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Starter Plan */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan("starter")}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-102 ${
                    selectedPlan === "starter"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">Starter</h4>
                      <p className="text-xs text-gray-500 mt-1">Perfect to get started</p>
                    </div>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedPlan === "starter"
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-300"
                    }`}>
                      {selectedPlan === "starter" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-gray-900">$99</span>
                    <span className="text-gray-600 text-sm ml-1">/month</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      Up to 500 calls/month
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      Basic AI responses
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      Email support
                    </li>
                  </ul>
                </button>

                {/* Professional Plan */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan("professional")}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-102 relative ${
                    selectedPlan === "professional"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="absolute -top-3 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">Professional</h4>
                      <p className="text-xs text-gray-500 mt-1">Most popular choice</p>
                    </div>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedPlan === "professional"
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-300"
                    }`}>
                      {selectedPlan === "professional" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-gray-900">$299</span>
                    <span className="text-gray-600 text-sm ml-1">/month</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      Unlimited calls
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      Advanced AI & analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      24/7 phone support
                    </li>
                  </ul>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 mt-8 text-lg"
            >
              {isSubmitting ? "Creating your account..." : `Get Started - ${selectedPlan === "starter" ? "$99" : "$299"}/month`}
            </button>
          </form>

          {/* Privacy Notice */}
          <p className="text-gray-500 text-xs text-center mt-6">
            We respect your privacy. Your data is secure and will never be shared.
          </p>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
