import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import hedyLogo from "@/assets/hedy-logo.svg";
import hedyCityBg from "@/assets/hedy-city-bg.png";

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

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 md:p-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hedyCityBg})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/50" />
      
      {/* Centered Container */}
      <div className="relative z-10 w-full max-w-2xl bg-card rounded-3xl shadow-2xl p-6 md:p-10 animate-fade-in">
        {/* Header */}
        <header className="flex justify-center mb-6">
          <img 
            src={hedyLogo} 
            alt="Hedy" 
            className="h-10 md:h-12" 
          />
        </header>

        {/* Main Content */}
        <div className="text-center space-y-6">
          {/* Hero Text */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Your AI-Powered Meeting Companion
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto">
              Hedy coaches you in real-time, so you can confidently lead, contribute, 
              and make a greater impact in every meeting, lecture, and conversation.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-xl bg-muted border border-border">
              <div className="text-2xl mb-2">🎧</div>
              <h3 className="font-semibold text-foreground mb-1">Real-time Listening</h3>
              <p className="text-sm text-muted-foreground">Hedy listens and analyzes conversations as they happen.</p>
            </div>
            <div className="p-4 rounded-xl bg-muted border border-border">
              <div className="text-2xl mb-2">💡</div>
              <h3 className="font-semibold text-foreground mb-1">Smart Insights</h3>
              <p className="text-sm text-muted-foreground">Get actionable suggestions and key points instantly.</p>
            </div>
            <div className="p-4 rounded-xl bg-muted border border-border">
              <div className="text-2xl mb-2">📝</div>
              <h3 className="font-semibold text-foreground mb-1">Auto Highlights</h3>
              <p className="text-sm text-muted-foreground">Never miss important details with automatic highlights.</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="pt-4">
            <div className="relative bg-muted border border-border rounded-2xl p-6">
              <Quote className="absolute top-4 left-4 h-5 w-5 text-primary/40" />
              <div className="min-h-[100px] flex flex-col justify-center">
                <p className="text-base md:text-lg text-foreground/80 italic mb-3">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-foreground">{testimonials[currentTestimonial].author}</p>
                  <p className="text-muted-foreground">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
              
              {/* Testimonial Navigation */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full hover:bg-accent transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonial(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentTestimonial 
                          ? "w-6 bg-primary" 
                          : "w-2 bg-border"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full hover:bg-accent transition-colors"
                >
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button 
              onClick={onComplete} 
              className="w-full h-12 text-base font-semibold"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;