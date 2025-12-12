import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import hedyLogo from "@/assets/hedy-logo.svg";
import hedyLogoDark from "@/assets/hedy-logo-dark.svg";

interface IntroScreenProps {
  onComplete: () => void;
}

const testimonials = [
  {
    quote: "Hedy has completely transformed how I participate in meetings. I feel so much more confident now!",
    author: "Sarah Chen",
    role: "Product Manager at TechCorp",
  },
  {
    quote: "The real-time coaching is incredible. It's like having a personal assistant in every conversation.",
    author: "Michael Rodriguez",
    role: "Sales Director",
  },
  {
    quote: "I never miss important details anymore. Hedy captures everything and helps me stay focused.",
    author: "Emily Thompson",
    role: "UX Designer",
  },
];

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const isDark = document.documentElement.classList.contains("dark");

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-8">
        <img 
          src={isDark ? hedyLogoDark : hedyLogo} 
          alt="Hedy" 
          className="h-8 md:h-10" 
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-24 md:pb-32">
        <div className="max-w-2xl text-center space-y-8">
          {/* Hero Text */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Your AI-Powered Meeting Companion
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
              Hedy coaches you in real-time, so you can confidently lead, contribute, 
              and make a greater impact in every meeting, lecture, and conversation.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="text-2xl mb-2">🎧</div>
              <h3 className="font-semibold text-foreground mb-1">Real-time Listening</h3>
              <p className="text-sm text-muted-foreground">Hedy listens and analyzes conversations as they happen.</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="text-2xl mb-2">💡</div>
              <h3 className="font-semibold text-foreground mb-1">Smart Insights</h3>
              <p className="text-sm text-muted-foreground">Get actionable suggestions and key points instantly.</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="text-2xl mb-2">📝</div>
              <h3 className="font-semibold text-foreground mb-1">Auto Highlights</h3>
              <p className="text-sm text-muted-foreground">Never miss important details with automatic highlights.</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="pt-8">
            <div className="relative bg-card border border-border rounded-2xl p-6 md:p-8">
              <Quote className="absolute top-4 left-4 h-6 w-6 text-primary/30" />
              <div className="min-h-[120px] flex flex-col justify-center">
                <p className="text-lg md:text-xl text-foreground italic mb-4">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-foreground">{testimonials[currentTestimonial].author}</p>
                  <p className="text-muted-foreground">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
              
              {/* Testimonial Navigation */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-muted-foreground" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonial(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentTestimonial 
                          ? "w-6 bg-primary" 
                          : "w-2 bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-md mx-auto">
          <Button 
            onClick={onComplete} 
            className="w-full h-12 text-base font-semibold"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
