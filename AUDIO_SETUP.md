# Audio Generation Setup

This guide explains how to generate static MP3 files for the Breezy voice assistant demo.

## Why Static Files?

Instead of making API calls every time you test a question, we pre-generate all 8 audio responses once and store them as static files. This means:

✅ **Instant playback** - No loading delays  
✅ **Works offline** - No API calls needed  
✅ **Portable** - Works on any device/computer  
✅ **Free** - Only one API call per question  

## Setup Instructions

### 1. Get Your ElevenLabs API Key

1. Go to [https://elevenlabs.io](https://elevenlabs.io)
2. Sign up or log in
3. Go to Settings → API Keys
4. Click "Generate new API key" and copy it

### 2. Get Your Voice ID

1. Go to Voice Lab → Create New Voice (or use an existing voice)
2. Copy the Voice ID (looks like: `EXAVITQdibvn0K4k3c9Z`)

### 3. Set Environment Variables

Create a `.env.local` file in the project root:

```bash
ELEVENLABS_API_KEY=sk_xxxxxxxxxxxx
NEXT_PUBLIC_DEFAULT_VOICE_ID=EXAVITQdibvn0K4k3c9Z
```

**⚠️ Important:** Don't commit `.env.local` to git. It's listed in `.gitignore`.

### 4. Run the Generation Script

```bash
# From project root
npx ts-node scripts/generate-audio.ts
```

This will:
- Generate 8 MP3 files (one for each question)
- Save them to `public/audio/`
- Take ~1-2 minutes (one API call per question)

Output:
```
🎙️  Generating audio files for all questions...

⏳ Generating: hours.mp3
✓ Saved: hours.mp3 (45.2 KB)
⏳ Generating: pricing.mp3
✓ Saved: pricing.mp3 (52.3 KB)
...
✅ All audio files generated successfully!
📁 Location: C:\Users\hamle\Desktop\Breezy\public\audio
```

## What Gets Generated

Eight MP3 files, one for each question:

- `hours.mp3` - Business hours question
- `pricing.mp3` - Pricing question
- `payment.mp3` - Payment methods question
- `products.mp3` - Products question
- `support.mp3` - Support question
- `returns.mp3` - Returns/refund question
- `availability.mp3` - Availability question
- `promotion.mp3` - Promotion/offer question

## Using the App

Once files are generated:

1. Start the dev server: `npm run dev`
2. Go to Breezy and follow the flow
3. Test the AI page - audio will play instantly with **no API calls**
4. Settings button still available if needed for other uses

## Troubleshooting

**Error: "ELEVENLABS_API_KEY not found in environment variables"**
- Make sure `.env.local` is created in the project root
- Verify variable name spelling exactly

**Error: "Failed to load audio file"**
- Check that audio files exist in `public/audio/`
- Rebuild the app: `npm run build`

**Audio quality issues**
- Adjust `stability` and `similarity_boost` in `scripts/generate-audio.ts`
- Re-run the generation script

## Regenerating Files

If you want to regenerate the audio files (e.g., with a different voice):

```bash
# Delete old files
rm -r public/audio/*.mp3

# Re-run generation
npx ts-node scripts/generate-audio.ts
```

## For Deployment

### Option 1: Commit Files (Simple)
```bash
git add public/audio/*.mp3
git commit -m "Add pre-generated audio files"
git push
```

### Option 2: Generate on Deploy (Advanced)
Add to your deployment pipeline:
```bash
npx ts-node scripts/generate-audio.ts
```

## API Cost

Each generated file costs **~1 ElevenLabs credit**. 8 questions = ~8 credits (minimal cost).

## Next Steps

- Audio files are committed to git (no secrets in files)
- App loads audio instantly - no API needed
- Deploy with confidence - works everywhere
