import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles, Users, Smartphone, MessageCircle, PartyPopper } from "lucide-react";
import hedyLogo from "@/assets/hedy-logo.svg";
import hedyLogoDark from "@/assets/hedy-logo-dark.svg";

interface OnboardingScreenProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    icon: Sparkles,
    title: "Unlock Your Meeting Superpowers with Hedy",
    description: "Hedy coaches you in real-time, so you can confidently lead, contribute, and make a greater impact in every meeting, lecture, and conversation.",
    color: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Users,
    title: "Hedy is always by your side",
    description: "During your meetings or lectures, Hedy listens and analyzes the conversation in real-time.",
    color: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    icon: Smartphone,
    title: "How to get started",
    description: "Simply place your phone or tablet so it can hear the conversation and start a Hedy session. Keep the app open while Hedy is listening.\n\nIn a virtual meeting, play the audio through your speakers so Hedy can hear it.",
    color: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    icon: MessageCircle,
    title: "Start getting insights",
    description: "As soon as there is enough conversation, you can start chatting with Hedy to get insights and suggestions.\n\nYou can also chat with Hedy from your browser at app.hedy.bot.",
    color: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    icon: PartyPopper,
    title: "Be the brightest person in the room",
    description: "Create your account to get started!\n\nFree accounts are limited to 300 minutes per month. Upgrade to Hedy Pro to unlock unlimited sessions!",
    color: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
];

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const isDark = document.documentElement.classList.contains("dark");
  const isLastStep = currentStep === onboardingSteps.length - 1;
  const step = onboardingSteps[currentStep];
  const StepIcon = step.icon;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <img 
          src={isDark ? hedyLogoDark : hedyLogo} 
          alt="Hedy" 
          className="h-7" 
        />
        {!isLastStep && (
          <button
            onClick={handleSkip}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Icon */}
          <div className={`mx-auto w-24 h-24 md:w-32 md:h-32 rounded-3xl ${step.color} flex items-center justify-center`}>
            <StepIcon className={`h-12 w-12 md:h-16 md:w-16 ${step.iconColor}`} />
          </div>

          {/* Text */}
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {step.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground whitespace-pre-line">
              {step.description}
            </p>
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-md mx-auto">
          {/* Progress Dots */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              {onboardingSteps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentStep
                      ? "w-6 bg-primary"
                      : idx < currentStep
                      ? "w-2 bg-primary/50"
                      : "w-2 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <Button 
              onClick={handleNext} 
              className="h-12 px-6 font-semibold gap-2"
            >
              {isLastStep ? "Get Started" : "Next"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
