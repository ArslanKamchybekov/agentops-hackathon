"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "@/components/HomePage";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function App() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );
}
