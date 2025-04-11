import { useState } from "react";

export const FullScreenModal = () => {
  const [showPrompt, setShowPrompt] = useState<boolean>(true);

  const handleFullscreen = async () => {
    const elem = document.documentElement;
    try {
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        await (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).mozRequestFullScreen) {
        await (elem as any).mozRequestFullScreen();
      } else if ((elem as any).msRequestFullscreen) {
        await (elem as any).msRequestFullscreen();
      }
      console.log("Fullscreen mode activated");
      setShowPrompt(false);
    } catch (err) {
      console.error("Fullscreen request failed:", err);
    }
  };

  return (
    showPrompt && (
      <div className="h-screen w-full flex items-center justify-center">
        <div>
          <h2>Enter Fullscreen Mode</h2>
          <p>Click to enhance your viewing experience.</p>
          <button onClick={handleFullscreen}>Go Fullscreen</button>
        </div>
      </div>
    )
  );
};
