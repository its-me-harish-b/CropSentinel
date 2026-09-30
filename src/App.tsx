import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import Detect from "./pages/Detect";
import About from "./pages/About";
import PestLibrary from "./pages/PestLibrary";
import PestDetails from "./pages/PestDetails";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 
import Forgot from "./pages/Forgot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* 1. Login is now the default starting page */}
            <Route path="/" element={<Login />} />

            {/* 2. Register Route Added Here */}
            <Route path="/register" element={<Register />} />

            {/* 3. The main dashboard/landing page is moved to "/home" */}
            <Route path="/home" element={<Index />} />

            <Route path="/detect" element={<Detect />} />
            <Route path="/about" element={<About />} />
            <Route path="/pest-library" element={<PestLibrary />} />
            <Route path="/pest-details/:pestId" element={<PestDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
  
           {/* 2. Add this NEW Route */}
            <Route path="/forgot-password" element={<Forgot />} />

            <Route path="/home" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;