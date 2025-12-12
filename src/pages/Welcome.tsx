import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SplashScreen from "./SplashScreen";
import IntroScreen from "./IntroScreen";
import AuthScreen from "./AuthScreen";
import OnboardingScreen from "./OnboardingScreen";

type WelcomeStep = "splash" | "intro" | "auth" | "onboarding";

const Welcome = () => {
  const [step, setStep] = useState<WelcomeStep>("splash");
  const navigate = useNavigate();

  // Check if user has completed onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("hedyOnboardingComplete");
    if (hasCompletedOnboarding === "true") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleComplete = () => {
    localStorage.setItem("hedyOnboardingComplete", "true");
    navigate("/", { replace: true });
  };

  return (
    <>
      {step === "splash" && (
        <SplashScreen onComplete={() => setStep("intro")} />
      )}
      {step === "intro" && (
        <IntroScreen onComplete={() => setStep("auth")} />
      )}
      {step === "auth" && (
        <AuthScreen onComplete={() => setStep("onboarding")} />
      )}
      {step === "onboarding" && (
        <OnboardingScreen onComplete={handleComplete} />
      )}
    </>
  );
};

export default Welcome;
