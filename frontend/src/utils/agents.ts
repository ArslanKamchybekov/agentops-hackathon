export type Language =
  | "english"
  | "french"
  | "spanish"
  | "japanese"
  | "italian"
  | "german";

export interface Agent {
  id: string;
  language: Language;
  name: string;
  flag: string;
  greeting: string;
  specialties: string[];
  color: string;
}

export const agents: Record<Language, Agent> = {
  english: {
    id: "eng-001",
    language: "english",
    name: "Emma",
    flag: "🇬🇧",
    greeting:
      "Hello! I'm Emma, your travel concierge. How can I assist with your travel plans today?",
    specialties: [
      "General travel advice",
      "Global destinations",
      "Travel planning",
    ],
    color: "bg-blue-100 border-blue-200",
  },
  french: {
    id: "fra-001",
    language: "french",
    name: "Sophie",
    flag: "🇫🇷",
    greeting:
      "Bonjour! Je suis Sophie, votre guide française. Comment puis-je vous aider avec votre voyage en France?",
    specialties: ["French cuisine", "Wine regions", "Parisian landmarks"],
    color: "bg-indigo-100 border-indigo-200",
  },
  spanish: {
    id: "esp-001",
    language: "spanish",
    name: "Carlos",
    flag: "🇪🇸",
    greeting:
      "¡Hola! Soy Carlos, su guía española. ¿Cómo puedo ayudarle con su viaje a España?",
    specialties: ["Tapas culture", "Flamenco shows", "Mediterranean beaches"],
    color: "bg-red-100 border-red-200",
  },
  japanese: {
    id: "jpn-001",
    language: "japanese",
    name: "Yuki",
    flag: "🇯🇵",
    greeting:
      "こんにちは！私は由紀、あなたの日本ガイドです。日本旅行のお手伝いをいたします。",
    specialties: [
      "Traditional ryokans",
      "Cherry blossom season",
      "Tokyo neighborhoods",
    ],
    color: "bg-pink-100 border-pink-200",
  },
  italian: {
    id: "ita-001",
    language: "italian",
    name: "Marco",
    flag: "🇮🇹",
    greeting:
      "Ciao! Sono Marco, la tua guida italiana. Come posso aiutarti con il tuo viaggio in Italia?",
    specialties: ["Roman history", "Venetian canals", "Tuscan vineyards"],
    color: "bg-green-100 border-green-200",
  },
  german: {
    id: "deu-001",
    language: "german",
    name: "Hans",
    flag: "🇩🇪",
    greeting:
      "Hallo! Ich bin Hans, Ihr deutscher Reiseführer. Wie kann ich Ihnen bei Ihrer Reise nach Deutschland helfen?",
    specialties: ["Bavarian castles", "Black Forest hiking", "Berlin culture"],
    color: "bg-yellow-100 border-yellow-200",
  },
};

export const getAgentByLanguage = (language: Language): Agent => {
  return agents[language];
};
