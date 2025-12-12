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
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Centered Container */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 md:p-10 animate-fade-in">
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Your AI-Powered Meeting Companion
            </h1>
            <p className="text-base md:text-lg text-gray-500 max-w-lg mx-auto">
              Hedy coaches you in real-time, so you can confidently lead, contribute, 
              and make a greater impact in every meeting, lecture, and conversation.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-2xl mb-2">🎧</div>
              <h3 className="font-semibold text-gray-900 mb-1">Real-time Listening</h3>
              <p className="text-sm text-gray-500">Hedy listens and analyzes conversations as they happen.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-2xl mb-2">💡</div>
              <h3 className="font-semibold text-gray-900 mb-1">Smart Insights</h3>
              <p className="text-sm text-gray-500">Get actionable suggestions and key points instantly.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-2xl mb-2">📝</div>
              <h3 className="font-semibold text-gray-900 mb-1">Auto Highlights</h3>
              <p className="text-sm text-gray-500">Never miss important details with automatic highlights.</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="pt-4">
            <div className="relative bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <Quote className="absolute top-4 left-4 h-5 w-5 text-primary/40" />
              <div className="min-h-[100px] flex flex-col justify-center">
                <p className="text-base md:text-lg text-gray-700 italic mb-3">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{testimonials[currentTestimonial].author}</p>
                  <p className="text-gray-500">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
              
              {/* Testimonial Navigation */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-400" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonial(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentTestimonial 
                          ? "w-6 bg-primary" 
                          : "w-2 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button 
              onClick={onComplete} 
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
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
