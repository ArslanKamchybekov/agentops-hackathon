import { Globe } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Globe className="w-6 h-6 text-primary" />
          <Link href="/" className="text-lg font-medium">
            Navigato
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/languages" className="text-sm">
            Languages
          </Link>
          <Link href="/destinations" className="text-sm">
            Destinations
          </Link>
          <Link href="/about" className="text-sm">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
