# Breezy - AI Voice Assistant Demo

An interactive web app demonstrating AI-powered customer service through voice. Users record their voice, then test how an AI can answer customer questions while "sounding like them".

**Status:** ✅ Production ready | 🔨 Fully built | 🚀 Ready for deployment

## 🎯 The Concept

"Clone your voice and let AI handle customer calls."

Breezy showcases voice cloning and AI-powered customer service. Users record a voice sample, then interact with an AI trained on their voice answering 8 common electrician questions. Includes subscription plan selection for sign-up.

## 🎬 User Flow

1. **Landing Page** → Intro video and "Clone Your Voice" CTA
2. **Voice Recording** → Record user's voice
3. **Processing** → Simulated AI processing animation
4. **Personalized AI Chat** → Ask 8 electrician questions, hear AI respond in recorded voice
5. **Sign Up** → Enter email/name and select subscription plan (Starter or Professional)

## 🎵 Audio Files

The app includes **8 pre-generated MP3 files** for electrician-specific questions. These are static assets served directly from the `public/` directory to imitate AI response generation.


## 🎨 Design

- **Light Theme** - Modern, professional feel
- **Large Bold Typography** - Clear hierarchy and emotional impact
- **Minimal Text** - Focus on the "wow moment" (audio playback)
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Smooth Animations** - Fade-in, slide-up transitions

## 🔧 Technical Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI component library
- **TypeScript** - Full type safety (strict mode enabled)
- **Tailwind CSS** - Utility-first styling (light theme, responsive)
- **Native HTML5 Audio** - No external audio libraries needed
- **Static Audio Files** - Pre-generated MP3s, no runtime API calls 

## 📄 License

MIT

## 📋 Project Status

### ✅ Completed Features
- [x] 5-page user flow (Landing → Voice Recording → Processing → Chat → Signup)
- [x] Voice recording with preview and re-recording
- [x] 8 electrician-specific Q&A with static audio playback
- [x] Subscription plan selection (Starter $99 / Professional $299)
- [x] Production build (zero TypeScript errors)
- [x] Audio caching strategy (static files, no API calls)
- [x] All animations and interactions working
- [x] Deployed on Vercel

### 🚀 Ready for Production
- **Build Status:** ✅ Passing (npm run build = 0 errors)
- **Type Checking:** ✅ Passing (zero TypeScript errors)
- **Linting:** ✅ Passing (npm run lint)
- **Deployment:** ✅ Ready (Vercel, Docker, or any Node.js hosting)

### 📦 What's Included
```
✅ 5 production components
✅ 8 pre-generated audio files
✅ Static audio generation script
✅ Tailwind CSS configuration
✅ TypeScript configuration (strict)
✅ Next.js configuration
✅ Complete README and documentation
❌ NO API routes (not needed)
❌ NO environment secrets required for demo
❌ NO external API calls at runtime
```


## 🚀 Future Plans

### AI Integration & Voice Cloning
Currently, the app demonstrates the user experience with **pre-generated static audio files**. The next phase will implement true AI-powered functionality:

#### Planned Features:
1. **Voice Model Training**
   - User's recorded audio will be used to train a personalized voice model
   - Integration with ElevenLabs, OpenAI, or similar TTS services
   - Each question response will be dynamically generated based on user input

2. **Custom Response Generation**
   - User can input custom questions or context
   - AI generates contextually relevant responses
   - Responses are synthesized in the user's cloned voice
   - Real-time audio generation (vs. current static files)

3. **Advanced Voice Features**
   - Emotion and tone detection from user's recording
   - Accent and speech pattern recognition
   - Real-time voice quality assessment
   - Support for multiple languages

### Backend Implementation
The signup process is currently a **UI demonstration only**. Full functionality requires:

#### Needed Backend Implementation:
1. **User Management**
   - User account creation and authentication
   - Store user recordings securely
   - Manage voice model training status
   - User session management

2. **Email & Notifications**
   - Send confirmation emails after signup
   - Account verification flow
   - Email notifications for processing milestones

3. **Payment Processing**
   - Stripe/PayPal integration for subscription plans
   - Billing management
   - Usage tracking (call counts, API requests)

4. **Voice Model Management**
   - Store trained voice models
   - Model versioning and updates
   - Usage analytics and logging

5. **API Integrations**
   - Direct integration with ElevenLabs, OpenAI, or custom ML models
   - Queue management for voice processing
   - Async job processing and status updates


---

**Built with ❤️ for Breezy. Looking forward to the next steps in the application process!**

*Last Updated: March 2026 | Production Ready*
