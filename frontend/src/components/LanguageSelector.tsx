import React from "react";
import { agents, Language } from "../utils/agents";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  currentLanguage: Language;
  onSelectLanguage: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onSelectLanguage,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 p-2">
      {Object.entries(agents).map(([language, agent]) => (
        <button
          key={language}
          onClick={() => onSelectLanguage(language as Language)}
          className={cn(
            "flex items-center space-x-1 px-3 py-2 rounded-full transition-all duration-300",
            "border text-sm font-medium",
            currentLanguage === language
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background hover:bg-accent border-input hover:border-accent"
          )}
        >
          <span>{agent.flag}</span>
          <span>{agent.name}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
