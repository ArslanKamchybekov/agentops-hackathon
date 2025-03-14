"use client";
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
import Link from "next/link";
import {
  Globe,
  Languages,
  Users,
  MessageSquare,
  Award,
  BookOpen,
} from "lucide-react";

const About = () => {
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
              <BreadcrumbPage>About</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="max-w-5xl mx-auto mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            About Lingua Travel
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <p className="text-lg mb-4">
                Lingua Travel was founded with a simple mission: to make
                international travel more accessible by breaking down language
                barriers and providing cultural insights that guidebooks simply
                can't offer.
              </p>
              <p className="text-muted-foreground mb-6">
                Our team of language specialists combines technological
                innovation with deep cultural knowledge to create a seamless
                travel experience. Whether you're planning a trip, currently
                traveling, or just dreaming about your next adventure, our
                agents are here to help you navigate the world with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Our Story
                </button>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  Join Our Team
                </button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="Lingua Travel Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              What Sets Us Apart
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Languages className="h-8 w-8 text-primary" />,
                  title: "Language Expertise",
                  description:
                    "Our agents are fluent in their respective languages and deeply familiar with local dialects and expressions.",
                },
                {
                  icon: <Globe className="h-8 w-8 text-primary" />,
                  title: "Cultural Insights",
                  description:
                    "Beyond translation, we provide meaningful cultural context to help you navigate social norms and customs.",
                },
                {
                  icon: <Users className="h-8 w-8 text-primary" />,
                  title: "Local Connections",
                  description:
                    "Our specialists have extensive networks in their regions, giving you access to authentic local experiences.",
                },
                {
                  icon: <MessageSquare className="h-8 w-8 text-primary" />,
                  title: "Real-time Assistance",
                  description:
                    "Get help when you need it most, whether you're planning ahead or need immediate translation help.",
                },
                {
                  icon: <Award className="h-8 w-8 text-primary" />,
                  title: "Certified Experts",
                  description:
                    "All our language specialists are certified in their fields and undergo rigorous training.",
                },
                {
                  icon: <BookOpen className="h-8 w-8 text-primary" />,
                  title: "Continuous Learning",
                  description:
                    "Our team stays up-to-date with changing cultural trends and language evolutions.",
                },
              ].map((feature, idx) => (
                <div key={idx} className="border rounded-lg p-6 bg-background">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Ready to start your journey?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Connect with our language specialists today and discover a new way
              to experience the world. No more language barriers, just authentic
              travel experiences.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2"
            >
              Start Chatting Now
            </Link>
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

export default About;
