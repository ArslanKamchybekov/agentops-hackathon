import React from "react";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import { Globe, MapPin, Languages, BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Header />

      <main className="container mx-auto pt-24 px-4">
        <section className="text-center max-w-3xl mx-auto py-12 mb-8 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              Your Multilingual Travel Assistant
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Travel the world with confidence
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with specialized language agents who can provide local
            insights, cultural nuances, and real-time translation assistance for
            your travels.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              {
                icon: <Globe className="h-6 w-6" />,
                title: "Global Coverage",
                description:
                  "Access local expertise for destinations worldwide",
              },
              {
                icon: <Languages className="h-6 w-6" />,
                title: "Multiple Languages",
                description: "Communicate in the language of your destination",
              },
              {
                icon: <MapPin className="h-6 w-6" />,
                title: "Local Insights",
                description: "Get authentic recommendations from local experts",
              },
              {
                icon: <BookOpen className="h-6 w-6" />,
                title: "Cultural Guide",
                description:
                  "Learn about customs and traditions before you arrive",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-4 rounded-xl bg-background border border-border hover:shadow-md transition-shadow"
              >
                <div className="p-2 rounded-full bg-primary/10 text-primary mb-3">
                  {feature.icon}
                </div>
                <h3 className="font-medium mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8 mb-16">
          <ChatInterface />
        </section>

        <section className="text-center max-w-2xl mx-auto py-12">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to plan your next adventure?
          </h2>
          <p className="text-muted-foreground mb-6">
            Our specialized language agents are here to help you navigate
            foreign destinations with ease.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Start Planning
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
              Learn More
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Navigato. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
