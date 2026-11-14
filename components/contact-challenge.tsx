"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type Turnstile = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};

export default function ContactChallenge({
  onVerify, resetKey,
}: {
  onVerify: (token: string) => void;
  resetKey: number;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    const turnstile = (window as Window & { turnstile?: Turnstile }).turnstile;
    if (!ready || !sitekey || !container.current || !turnstile) return;
    const id = turnstile.render(container.current, {
      sitekey,
      action: "contact",
      callback: onVerify,
      "expired-callback": () => onVerify(""),
      "error-callback": () => onVerify(""),
      "timeout-callback": () => onVerify(""),
    });
    return () => turnstile.remove(id);
  }, [ready, sitekey, onVerify, resetKey]);

  if (!sitekey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
        onError={() => onVerify("")}
      />
      <div ref={container} className="my-2.5 min-h-16" />
    </>
  );
}
