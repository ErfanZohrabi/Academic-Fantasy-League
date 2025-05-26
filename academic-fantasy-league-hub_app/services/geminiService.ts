import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RESEARCH_ASSISTANT_MODEL } from '../constants'; // GEMINI_API_KEY_ENV_VAR not needed here
import { GeminiResponse } from "../types";

// IMPORTANT: The API key MUST be an environment variable `process.env.API_KEY`.
// This service assumes it's running in an environment where `process.env.API_KEY` is set.
// For frontend-only scenarios, API calls should ideally be proxied through a backend for security.
// If `process.env.API_KEY` is not available or is a placeholder, Gemini features will be mocked.

const apiKey = process.env.API_KEY; 

let ai: GoogleGenAI | null = null;
let geminiInitialized = false;

if (apiKey && apiKey !== "YOUR_API_KEY_HERE" && apiKey !== "FAKE_API_KEY_FOR_DEV"  && apiKey.length > 10) { // Basic check for a seemingly real key
    try {
        ai = new GoogleGenAI({ apiKey });
        geminiInitialized = true;
        console.info("GoogleGenAI initialized successfully.");
    } catch (error) {
        console.error("Failed to initialize GoogleGenAI:", error);
        // AI features will be mocked if initialization fails.
    }
} else {
    console.warn("Gemini API key not found, is a placeholder, or too short. AI features will be mocked.");
}


export const generateResearchIdea = async (prompt: string): Promise<GeminiResponse> => {
  if (!geminiInitialized || !ai) {
    console.log("Gemini API not initialized, returning mock research idea.");
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    return {
      text: `Mocked AI Response: Based on your prompt "${prompt}", a fascinating research idea would be to explore the "Synergistic Effects of Quantum Entanglement on Feline Napping Patterns". This could involve observing cats in various states of quantum superposition and measuring their REM sleep cycles. Consider funding sources like the Institute for Whimsical Science. Furthermore, investigating the socio-economic impact of such research could yield interesting insights into public perception of advanced theoretical physics in everyday life.`,
    };
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: RESEARCH_ASSISTANT_MODEL,
        contents: `Generate a novel research idea based on the following prompt. Be creative and suggest potential interdisciplinary connections or unique methodologies if applicable. Prompt: "${prompt}"`,
        config: {
          temperature: 0.8, // Slightly more creative
          topK: 40,
          topP: 0.95,
        }
    });
    
    const textOutput = response.text;

    if (typeof textOutput !== 'string') {
        console.error("Unexpected response format from Gemini API (research idea):", response);
        throw new Error("Invalid response format from AI.");
    }
    
    return { text: textOutput };

  } catch (error) {
    console.error('Error calling Gemini API (research idea):', error);
    return {
        text: `Sorry, I encountered an error while brainstorming research ideas. Please ensure your API key is correctly configured and try again. Details: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};

export const generateGrantProposalSnippet = async (topic: string, section: string): Promise<GeminiResponse> => {
    if (!geminiInitialized || !ai) {
        console.log("Gemini API not initialized, returning mock grant proposal snippet.");
        await new Promise(resolve => setTimeout(resolve, 1200));
        return {
            text: `Mocked Grant Snippet for Topic: "${topic}" (Section: ${section}):\n\nThis research endeavors to address the critical knowledge gap in the domain of ${topic.toLowerCase()} by employing a novel, multi-faceted methodological approach. The ${section.toLowerCase()} section will meticulously detail the specific aims, underscore the innovative aspects of this study, and project its significant contributions to advancing the field. Expected outcomes include not only a paradigm shift in our fundamental understanding but also tangible, practical applications designed to benefit society at large, fostering further research and development.`
        };
    }

    const systemInstruction = `You are an expert academic grant writer. Your goal is to produce concise, impactful, and persuasive text for grant proposals. Focus on clarity, novelty, and potential impact. Avoid jargon where possible or explain it briefly. The tone should be formal and confident.`;
    const userPrompt = `Generate a concise and compelling paragraph (approximately 3-5 sentences) for a grant proposal.
    Research Topic: "${topic}"
    Proposal Section: "${section}"
    
    Please ensure the generated text is highly relevant to the specified section and topic.`;
    
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: RESEARCH_ASSISTANT_MODEL,
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.65, // More focused for grant writing
                topK: 50,
                topP: 0.95,
            }
        });
        const textOutput = response.text;

        if (typeof textOutput !== 'string') {
            console.error("Unexpected response format from Gemini API (grant snippet):", response);
            throw new Error("Invalid response format from AI for grant proposal.");
        }
        return { text: textOutput };

    } catch (error) {
        console.error('Error generating grant snippet with Gemini API:', error);
        return {
            text: `Apologies, an error occurred while drafting the grant snippet. Please check your API setup and try again. Details: ${error instanceof Error ? error.message : String(error)}`
        };
    }
};
