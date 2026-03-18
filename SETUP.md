# Breezy Setup Guide

Welcome to Breezy! This guide will help you get the AI Front Desk demo up and running in minutes.

## 📋 Prerequisites

Ensure you have the following installed:
- **Node.js** 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0.0 or higher (comes with Node.js)
- **Python** 3.7+ (optional, only for audio generation)

Check your versions:
```bash
node --version
npm --version
```

## 🚀 Getting Started

### Step 1: Install Dependencies

Navigate to the project directory and install dependencies:

```bash
cd "c:\Users\hamle\Desktop\Breezy"
npm install --legacy-peer-deps
```

**Troubleshooting:**
- If you get `ERESOLVE` errors, use: `npm install --force`
- If packages fail to install, delete `node_modules/` and `package-lock.json`, then retry

### Step 2: Create Audio Files (IMPORTANT)

The app needs audio files to work. Choose one of these options:

#### Option A: Generate Simple Audio (Recommended for Demo)

Install Python TTS:
```bash
pip install pyttsx3
```

Generate audio files:
```bash
cd public/audio
python generate_audio.py
```

The script will create three MP3 files:
- `pricing-call.mp3`
- `emergency-call.mp3`
- `afterhours-call.mp3`

#### Option B: Use Your Own Audio Files

Place three MP3 files in `public/audio/`:
- `pricing-call.mp3` (pricing inquiry response)
- `emergency-call.mp3` (urgent issue response)
- `afterhours-call.mp3` (after-hours response)

Each file should be 15-25 seconds of audio (MP3 format, 128kbps minimum)

#### Option C: Professional Audio (Using ElevenLabs - Paid but Excellent)

1. Sign up at [ElevenLabs.io](https://elevenlabs.io)
2. Get your API key
3. Use their voice cloning or text-to-speech to generate professional audio
4. Save MP3 files to `public/audio/`

#### Option D: Use OpenAI TTS (Requires API Key)

```bash
npm install openai
export OPENAI_API_KEY=your_key_here
```

Then use a script to generate audio files.

### Step 3: Start Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

You should see:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Step 4: Test the App

1. Open http://localhost:3000 in your browser
2. Click "Try It"
3. Select a scenario
4. Click "Play Call" to hear the audio
5. See the completion message

## 📁 Project Structure After Setup

```
Breezy/
├── src/
│   ├── app/
│   │   ├── api/scenarios/      # API endpoints
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page
│   │   └── globals.css         # Global styles
│   └── components/
│       ├── LandingPage.tsx
│       ├── ScenarioSelector.tsx
│       ├── AudioPlayer.tsx
│       └── CompletionMessage.tsx
├── public/
│   └── audio/
│       ├── pricing-call.mp3    # ← Add audio files here
│       ├── emergency-call.mp3
│       └── afterhours-call.mp3
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 🎨 Customization

### Change Scenarios

Edit `src/app/api/scenarios/route.ts`:
```typescript
const scenarios = [
  {
    id: "your-scenario",
    title: "Your Title",
    description: "Your description",
    icon: "🎯",
  },
  // Add more...
];
```

Then update `src/app/api/scenarios/[id]/route.ts` with responses for each scenario.

### Change Colors/Styling

Edit `src/app/globals.css` and `tailwind.config.ts` for dark theme customization.

### Customize Copy/Text

Edit each component:
- `src/components/LandingPage.tsx` - Headline and CTA
- `src/components/ScenarioSelector.tsx` - Scenario descriptions
- `src/components/AudioPlayer.tsx` - Player messages
- `src/components/CompletionMessage.tsx` - Completion text

## 🔨 Common Tasks

### Build for Production

```bash
npm run build
npm start
```

Output will be optimized and ready for deployment.

### Check for Linting Errors

```bash
npm run lint
```

### Stop Development Server

Press `Ctrl+C` in your terminal

### Reset Everything

```bash
# Delete node_modules and lock file
rm -r node_modules package-lock.json

# Reinstall
npm install --legacy-peer-deps
```

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] All audio files are generated and in `public/audio/`
- [ ] Update API URLs if using a Rails backend
- [ ] Test all scenarios work locally
- [ ] Run `npm run build` successfully
- [ ] Update `README.md` with production URL
- [ ] Set up environment variables if using external APIs

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Your app will be live in seconds!

### Deploy to Other Platforms

The app is a standard Next.js app. You can deploy to:
- Netlify
- Railway  
- AWS Amplify
- Google Cloud Run
- Any Node.js hosting

## 🔗 Rails Backend Integration

To connect to a Rails backend:

1. Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
# or production URL
```

2. Update component API calls:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
const response = await fetch(`${API_URL}/scenarios`);
```

3. Your Rails backend should provide:
   - `GET /api/scenarios` - List all scenarios
   - `GET /api/scenarios/:id` - Get scenario details
   - `POST /api/calls` - Log call completions
   - `POST /api/signups` - Handle user signups

## 🐛 Troubleshooting

### "Module not found" Error

```bash
# Delete node_modules and reinstall
rm -r node_modules package-lock.json
npm install --legacy-peer-deps
```

### Audio Files Not Playing

1. Check files exist in `public/audio/`
2. Verify file names match exactly:
   - `pricing-call.mp3`
   - `emergency-call.mp3`
   - `afterhours-call.mp3`
3. Test audio files in browser: http://localhost:3000/audio/pricing-call.mp3

### Port 3000 Already in Use

```bash
# Use a different port
npm run dev -- -p 3001
```

### TypeScript Errors

```bash
# Clear Next.js cache
rm -r .next

# Rebuild
npm run build
```

## 📚 Learn More

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs

## 💡 Quick Debugging Tips

1. **Check Browser Console** - Press F12, look for errors
2. **Check Terminal** - Watch for error messages in npm output
3. **Clear Cache** - Hard refresh browser (Ctrl+Shift+R)
4. **Network Tab** - Check if API calls are working

## 🎓 Next Steps

1. ✅ Get app running locally
2. Generate realistic audio files
3. Customize scenarios to your business
4. Connect to Rails backend
5. Deploy to production
6. Add analytics
7. Collect customer feedback

## 📞 Support

If you encounter issues:

1. Check this guide again
2. Review the terminal errors
3. Check browser console (F12)
4. Review project README.md
5. Check Next.js documentation

---

**You're ready to go! Run `npm install` and then `npm run dev` to start.** 🚀
