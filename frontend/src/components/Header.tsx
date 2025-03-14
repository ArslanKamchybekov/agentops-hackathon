import React from "react";
import { Globe } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center space-x-2">
          <Globe className="w-6 h-6 text-primary" />
          <span className="text-lg font-medium">Lingua Travel</span>
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <a
            href="#"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            Destinations
          </a>
          <a
            href="#"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            Languages
          </a>
          <a
            href="#"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
