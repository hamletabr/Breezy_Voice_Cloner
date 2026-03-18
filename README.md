# Breezy - AI Voice Assistant Demo

An interactive web app demonstrating AI-powered customer service through voice. Users record their voice, then test how an AI can answer customer questions while sounding like them.

## 🎯 The Concept

"Clone your voice and let AI handle customer calls."

Breezy showcases voice cloning and AI-powered customer service. Users record a voice sample, then interact with an AI trained on their voice answering 8 common electrician questions. Includes subscription plan selection for sign-up.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm (or pnpm/yarn)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main page with state management
│   └── globals.css              # Global styles
├── components/
│   ├── LandingPage.tsx          # Landing page with intro & CTA
│   ├── VoiceRecordingPage.tsx   # Record user's voice (120s max)
│   ├── ProcessingPage.tsx       # Processing animation
│   ├── PersonalizedAIChat.tsx   # 8 Q&A with audio playback
│   └── SignUpPage.tsx           # Email/name + subscription plans
public/
└── audio/                       # 8 pre-generated MP3 files
scripts/
└── generate-audio.ts            # Script to generate audio files
```

## 🎬 User Flow

1. **Landing Page** → Intro video and "Clone Your Voice" CTA
2. **Voice Recording** → Record 30-120 seconds in user's voice
3. **Processing** → Simulated AI processing animation
4. **Personalized AI Chat** → Ask 8 electrician questions, hear AI respond in recorded voice
5. **Sign Up** → Enter email/name and select subscription plan (Starter or Professional)

## 🎵 Audio Files

The app includes 8 pre-generated MP3 files for electrician-specific questions:

- `service_call.mp3` - Emergency service availability
- `pricing.mp3` - Rewiring work costs
- `warranty.mp3` - Warranty on workmanship
- `availability.mp3` - Same-day appointment availability
- `experience.mp3` - Years of combined experience
- `permits.mp3` - Permit handling and responsibilities
- `inspection.mp3` - Free inspection availability
- `commercial.mp3` - Commercial property work capability

### Regenerating Audio Files

If you want to regenerate the audio files with different questions or voice:

```bash
# Requires ElevenLabs API key
npx ts-node scripts/generate-audio.ts
```

Update the questions and responses in `scripts/generate-audio.ts` before running.

**Note:** Audio files are already included in `public/audio/` - no generation needed for basic usage.

## 🎨 Design

- **Dark Theme** - Modern, professional feel
- **Large Bold Typography** - Clear hierarchy and emotional impact
- **Minimal Text** - Focus on the "wow moment" (audio playback)
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Smooth Animations** - Fade-in, slide-up transitions

## 🔧 Technical Stack

- **Next.js 15+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Native HTML5 Audio** - No external audio libraries
- **API Routes** - Backend logic for scenarios

## � Data & Signup

### Form Submission
The SignUpPage collects:
- Full Name
- Business Email  
- Selected subscription plan (Starter $99/month or Professional $299/month)

### Backend Integration
To integrate with a backend:

1. Update `src/components/SignUpPage.tsx` to POST to your API:
   ```typescript
   const response = await fetch(`${API_URL}/signups`, {
     method: 'POST',
     body: JSON.stringify({ name, email, plan })
   });
   ```

2. Set environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.com/api
   ```

3. Backend should handle:
   - User account creation
   - Subscription plan assignment
   - Email confirmation
   - Payment processing

## ️ Development

### Running Tests
```bash
npm run lint
```

### Environment Variables
Create a `.env.local` file for any custom configuration:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 📱 Responsive Design

The app is fully responsive:
- **Mobile** (320px+) - Optimized layouts
- **Tablet** (768px+) - Adjusted spacing
- **Desktop** (1024px+) - Full experience

## 🎬 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Other Platforms
The app can be deployed to any Node.js-compatible platform:
- Netlify
- Railway
- Heroku
- AWS Amplify
- Digital Ocean

## 📝 Customization

### Changing Questions & Responses
Edit `src/components/PersonalizedAIChat.tsx`:
- Update the `MOCK_RESPONSES` object with new questions
- Add corresponding MP3 files to `public/audio/`
- Update the `questions` array with new question details

### Styling
- Theme colors in `tailwind.config.ts`
- Global styles in `src/app/globals.css`
- Animations in component files using Tailwind classes

### Voice Recording
Edit `src/components/VoiceRecordingPage.tsx` to customize:
- Recording duration limit (currently 120 seconds)
- UI and instructions
- Recording format and quality

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please follow:
1. TypeScript best practices
2. Tailwind CSS for styling
3. Component modularity
4. Responsive design patterns

## 📧 Support

For questions or issues:
1. Open a GitHub issue
2. Check existing documentation
3. Review the API routes for customization

---

**Built with ❤️ for Breezy - The AI Front Desk**
