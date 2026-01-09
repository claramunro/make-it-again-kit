import * as React from "react";

const LARGE_SCREEN_BREAKPOINT = 1024;

export function useIsLargeScreen() {
  const [isLargeScreen, setIsLargeScreen] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${LARGE_SCREEN_BREAKPOINT}px)`);
    const onChange = () => {
      setIsLargeScreen(window.innerWidth >= LARGE_SCREEN_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsLargeScreen(window.innerWidth >= LARGE_SCREEN_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isLargeScreen;
}
