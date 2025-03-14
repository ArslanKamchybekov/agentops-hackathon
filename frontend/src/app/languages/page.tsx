import React from "react";
import Header from "@/components/Header";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from "lucide-react";
import { agents, Language } from "@/utils/agents";

const Languages = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Header />

      <main className="container mx-auto pt-24 px-4 pb-12">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Languages</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Our Language Specialists
          </h1>
          <p className="text-muted-foreground mb-10 max-w-3xl">
            Meet our team of language experts who can assist you with local
            insights, cultural nuances, and real-time translation assistance for
            your travels. Each specialist is fluent in their respective language
            and deeply familiar with the associated cultures.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {Object.keys(agents).map((key) => {
              const agent = agents[key as Language];
              return (
                <div
                  key={agent.id}
                  className={`p-6 rounded-lg border ${agent.color} transition-all hover:shadow-md`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{agent.flag}</span>
                        <h3 className="text-xl font-medium">{agent.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 capitalize">
                        {agent.language} Specialist
                      </p>
                    </div>
                  </div>

                  <p className="mb-4 text-sm">"{agent.greeting}"</p>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/30">
                    <button className="w-full text-center py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                      Chat with {agent.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Lingua Travel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Languages;
