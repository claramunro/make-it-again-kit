import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 6000; // 6 seconds
    const interval = 50;
    const step = (100 * interval) / duration;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-end bg-black">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/splash-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Loading section */}
      <div className="relative z-10 w-full px-6 pb-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-md space-y-3">
          <div className="flex items-center justify-between text-sm text-white/80">
            <span>Loading...</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-1.5 bg-white/20 [&>div]:bg-primary" 
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
