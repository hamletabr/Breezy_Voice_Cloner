import * as fs from "fs";
import * as path from "path";

// Mock responses that match PersonalizedAIChat.tsx
const MOCK_RESPONSES: Record<string, string> = {
  service_call:
    "Yes, we offer 24/7 emergency service calls for electrical issues. We can typically arrive within an hour for urgent situations. There is a small emergency surcharge, but your safety is our priority.",
  pricing:
    "Our rewiring services start at 1500 dollars for a single room. For whole house rewiring, pricing depends on the square footage and complexity. We provide free estimates so you know the cost upfront.",
  warranty:
    "Absolutely! We provide a 5 year warranty on all our workmanship. If any issues arise related to our installation, we'll fix it at no additional charge. All materials come with manufacturer warranties as well.",
  availability:
    "We can often schedule same day or next day appointments for most jobs. For routine work like outlet installations, we're very flexible. Emergency calls are always our top priority.",
  experience:
    "Our team has over 20 years of combined experience in residential and commercial electrical work. All our electricians are licensed, insured, and continuously trained on the latest safety codes and technology.",
  permits:
    "Yes, we handle all necessary permits and inspections. Our team is familiar with local building codes and will ensure all work meets requirements. Permit costs are included in our project estimate.",
  inspection:
    "We'd love to! Free electrical inspections are part of our service. We'll assess your home's electrical system, identify any potential issues, and provide you with a detailed written report and recommendations.",
  commercial:
    "Yes, we specialize in both residential and commercial electrical work. We handle everything from small office buildouts to large scale commercial installations with minimal downtime disruption.",
};

async function generateAudioFiles() {
  const apiKey = process.env.ELEVENLABS_API_KEY || "13e57b2100e35308f64bac12302ca1e70a45ae91df2ca1c4509f9df7a6a33138";
  const voiceId = process.env.NEXT_PUBLIC_DEFAULT_VOICE_ID || "60q4sy6Fozw8vNrhtXSM";

  if (!apiKey) {
    console.error("❌ Error: ELEVENLABS_API_KEY not found in environment variables");
    console.error("Please set your API key: export ELEVENLABS_API_KEY=your_key_here");
    process.exit(1);
  }

  const outputDir = path.join(process.cwd(), "public", "audio");

  // Create audio directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`✓ Created directory: ${outputDir}`);
  }

  console.log("\n🎙️  Generating audio files for all questions...\n");

  for (const [questionId, text] of Object.entries(MOCK_RESPONSES)) {
    const filename = `${questionId}.mp3`;
    const filepath = path.join(outputDir, filename);

    try {
      console.log(`⏳ Generating: ${filename}`);

      // Call ElevenLabs API
      const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voiceId, {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          `API Error: ${response.status} - ${error.detail?.message || JSON.stringify(error)}`
        );
      }

      // Write audio to file
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(filepath, buffer);

      console.log(`✓ Saved: ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
    } catch (error) {
      console.error(`❌ Failed to generate ${filename}:`, error instanceof Error ? error.message : error);
      process.exit(1);
    }
  }

  console.log("\n✅ All audio files generated successfully!");
  console.log(`📁 Location: ${outputDir}\n`);
}

generateAudioFiles();
