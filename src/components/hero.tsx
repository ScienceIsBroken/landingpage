"use client";

import Script from "next/script";
import WaitlistForm from "./waitlist-form";

interface UnicornStudioOptions {
  elementId: string;
  filePath: string;
  scale: number;
  dpi: number;
  lazyLoad: boolean;
  production: boolean;
  interactivity: {
    mouse: { disableMobile: boolean };
  };
}

declare global {
  interface Window {
    UnicornStudio?: {
      init: () => Promise<void>;
      destroy: () => void;
      addScene: (opts: UnicornStudioOptions) => Promise<void>;
    };
  }
}

export default function Hero() {
  const handleScriptLoad = async () => {
    if (typeof window === "undefined" || !window.UnicornStudio) return;

    try {
      await window.UnicornStudio.addScene({
        elementId: "hero-unicorn",
        filePath: "/unicorn/scene.json",
        scale: 1,
        dpi: 1.5,
        lazyLoad: true,
        production: false,
        interactivity: {
          mouse: { disableMobile: true },
        },
      });
    } catch (error) {
      console.error("Unicorn Studio scene init failed:", error);
    }
  };

  return (
    <div className="rounded-b-[5rem] relative w-full mx-auto lg:min-h-[80vh] flex flex-col items-start lg:flex-row lg:items-stretch gap-12 overflow-hidden pt-24 md:pt-32 lg:pt-40 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#F3F2ED]">
      {/* Unicorn Studio Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div id="hero-unicorn" className="w-full h-full" />
        <Script
          id="unicorn-studio"
          strategy="afterInteractive"
          src="https://cdn.unicorn.studio/v1.4.1/unicornStudio.umd.js"
          onLoad={handleScriptLoad}
        />
      </div>

      {/* Content */}
      <div className="flex-1 text-center lg:text-left max-w-xl relative z-10 mt-4 md:mt-0 lg:ml-[10%] p-6 rounded-lg mx-auto lg:mx-0 w-[90%] lg:w-auto">
        <h1 className="font-logo text-2xl sm:text-3xl lg:text-4xl font-medium text-[#2B3D3B]">
          Want to keep on top of the latest science in your field?
        </h1>
        <p className="text-sm text-[#444444] mb-8">
          <br />
          <br />
          Get bespoke scientific, industry, and policy briefings, tailored to your goals, delivered directly to your inbox.
        </p>
        <div className="max-w-md relative">
          <WaitlistForm />
        </div>
      </div>

      {/* Oasis Query Text */}
      <div className="absolute right-8 text-xs text-[#444444] font-mono text-right
        bottom-4
        [@media(max-width:1021px)]:top-[calc(100%+1rem)]">
        oasis.query --region &quot;EU&quot; --topic &quot;AI in genomics&quot;
        <br />
        ✔︎ Summary generated. Check your inbox
      </div>
    </div>
  );
}
