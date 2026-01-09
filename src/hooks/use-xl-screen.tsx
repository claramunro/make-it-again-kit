import * as React from "react";

const XL_SCREEN_BREAKPOINT = 1280;

export function useIsXlScreen() {
  const [isXlScreen, setIsXlScreen] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${XL_SCREEN_BREAKPOINT}px)`);
    const onChange = () => {
      setIsXlScreen(window.innerWidth >= XL_SCREEN_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsXlScreen(window.innerWidth >= XL_SCREEN_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isXlScreen;
}
