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
import { MapPin, ArrowRight, Link } from "lucide-react";

const Destinations = () => {
  const popularDestinations = [
    {
      name: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      language: "French",
    },
    {
      name: "Barcelona, Spain",
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded",
      language: "Spanish",
    },
    {
      name: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8",
      language: "Japanese",
    },
    {
      name: "Rome, Italy",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
      language: "Italian",
    },
    {
      name: "Berlin, Germany",
      image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc",
      language: "German",
    },
    {
      name: "London, UK",
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be",
      language: "English",
    },
  ];

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
              <BreadcrumbPage>Destinations</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Popular Destinations
          </h1>
          <p className="text-muted-foreground mb-10 max-w-3xl">
            Explore our curated selection of destinations around the world. Each
            location comes with a specialized language agent who can help you
            navigate local customs, find hidden gems, and communicate
            effectively during your travels.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {popularDestinations.map((destination, idx) => (
              <div
                key={idx}
                className="group overflow-hidden rounded-lg border border-border bg-background shadow-sm transition-all hover:shadow-md"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{destination.name}</h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {destination.language}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>Explore local attractions</span>
                    </div>
                    <button className="group inline-flex items-center text-primary hover:text-primary/90">
                      <span className="text-sm">Details</span>
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

export default Destinations;
