import { useEffect, useState } from "react";

export function useDevMode() {
  const urlParams = new URLSearchParams(window.location.search);
  const devFromUrl = urlParams.get("hb_dev") === "1";

  const [isDevMode, setIsDevMode] = useState(devFromUrl);

  useEffect(() => {
    localStorage.setItem("dev", isDevMode ? "1" : "0");
  }, [isDevMode]);


  useEffect(() => {
    window.toggleDevMode = () => setIsDevMode((prev) => !prev);
  }, []);

  return [isDevMode, setIsDevMode];
}
