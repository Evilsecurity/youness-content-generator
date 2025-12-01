import { GoogleGenAI, Type } from "@google/genai";
import { VideoConfig, GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateVideoContent = async (config: VideoConfig): Promise<GeneratedContent> => {
  const modelId = "gemini-2.5-flash"; // Excellent for text generation tasks

  const prompt = `
    Act as a world-class viral video strategist and scriptwriter.
    Create a complete video content package based on the following constraints:
    
    - Niche: ${config.niche}
    - Platform: ${config.platform}
    - Tone: ${config.tone}
    - Length: ${config.length}
    - Target Audience: ${config.audience}

    You must generate:
    1. A unique, high-potential video idea.
    2. A "scroll-stopping" hook (first 3-5 seconds) designed to retain viewers immediately.
    3. A full script formatted for the specific platform (include visual cues in brackets []).
    4. A compelling thumbnail description that creates curiosity.
    5. 3 SEO-optimized, click-worthy titles.
    6. 10 relevant, high-traffic hashtags.
    7. A short, punchy Call to Action (CTA).

    Ensure the content is engaging, human-sounding, and optimized for the algorithm of the selected platform.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      idea: { type: Type.STRING, description: "The core video concept" },
      hook: { type: Type.STRING, description: "The immediate opening line or visual to grab attention" },
      script: { type: Type.STRING, description: "The full video script including visual directions" },
      thumbnail: { type: Type.STRING, description: "Visual description of the thumbnail" },
      titles: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "3 clickable titles" 
      },
      hashtags: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "10 relevant hashtags" 
      },
      cta: { type: Type.STRING, description: "The final call to action" },
    },
    required: ["idea", "hook", "script", "thumbnail", "titles", "hashtags", "cta"],
  };

  try {
    const result = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8, // Slightly creative
      },
    });

    if (!result.text) {
      throw new Error("No content generated");
    }

    const parsed = JSON.parse(result.text) as GeneratedContent;
    return parsed;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content. Please check your API key and try again.");
  }
};
