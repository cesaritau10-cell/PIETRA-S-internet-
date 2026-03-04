import { GoogleGenAI, Type, Modality, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function chatWithPietra(message: string, history: any[] = []) {
  const chat = ai.chats.create({
    model: "gemini-3.1-pro-preview",
    config: {
      systemInstruction: `Você é a Pietra, uma assistente virtual especialista em planos de internet para a região de Pelotas e Porto Alegre. 
      Seu objetivo é ajudar os usuários a encontrar o melhor plano de internet. 
      Seja amigável, profissional e direta. 
      Sempre mencione que para mais informações eles podem entrar em contato pelo número 53 984782570.
      Se o usuário perguntar sobre preços atuais, use as informações que você tem ou sugira que eles consultem a tabela de comparação no site.`,
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
}

export async function analyzeBill(base64Image: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: "image/jpeg" } },
        { text: "Analise esta fatura de internet. Extraia o nome da operadora, a velocidade contratada e o valor mensal. Sugira se há opções melhores baseadas em planos de mercado (Vivo, Claro, Oi, Vero) que custam em média R$ 100-150 por 500MB-1GB." }
      ]
    }
  });
  return response.text;
}

export async function searchLatestPlans(query: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: query,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  return response.text;
}

export async function findNearbyStores(lat: number, lng: number) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Encontre lojas de operadoras de internet (Vivo, Claro, Oi, Vero) próximas a mim em Pelotas ou Porto Alegre.",
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: { latitude: lat, longitude: lng }
        }
      }
    },
  });
  
  const text = response.text;
  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
  const mapsLinks = chunks?.filter(c => c.maps).map(c => ({
    title: c.maps?.title,
    uri: c.maps?.uri
  })) || [];

  return { text, mapsLinks };
}

export async function generateSpeech(text: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Diga com voz clara e profissional: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
}

export async function generateDreamSetup(prompt: string, aspectRatio: string = "16:9", size: string = "1K") {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [{ text: `Um setup de home office dos sonhos com internet ultra rápida: ${prompt}` }],
    },
    config: {
      imageConfig: {
        aspectRatio: aspectRatio as any,
        imageSize: size as any
      },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}

export async function animateSetup(base64Image: string) {
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: 'O setup de home office ganha vida com luzes RGB pulsantes e dados fluindo pelas telas, cinematico',
    image: {
      imageBytes: base64Image,
      mimeType: 'image/jpeg',
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  return operation.response?.generatedVideos?.[0]?.video?.uri;
}
