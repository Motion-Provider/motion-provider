"use client";

import { ImageOff } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Device, Markup } from "../types/playground";

const FRAME_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="referrer" content="no-referrer">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src 'self' https: http: data: blob:; media-src 'self' https: http: blob:; base-uri 'none'; form-action 'none';">
<style>
  html { min-height:100%; background:#131110; color:#f4ede8; color-scheme:dark; }
  body { margin:0; min-height:100vh; overflow-wrap:anywhere; font:16px/1.5 system-ui,sans-serif; }
  img, video { max-width:100%; }
  [data-mp-layer]:hover { outline:1px dashed #f99a6570; outline-offset:2px; }
  [data-mp-selected] { outline:1px solid #ff965f !important; outline-offset:4px !important; }
  .mp-image-fallback { display:grid; height:100%; min-height:60px; place-items:center; background:#211b18; color:#ccc0b8; font-size:13px; }
</style>
</head>
<body></body>
</html>`;

export function Sandbox({
  markup,
  device,
  css,
  onSelect,
  children,
}: {
  markup: Markup;
  device: Device;
  css: string;
  onSelect: (id: string) => void;
  children: ReactNode;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [frameDocument, setFrameDocument] = useState<Document | null>(null);

  useEffect(() => {
    const document = frame.current?.contentDocument;
    if (document?.URL === "about:srcdoc" && document.body)
      setFrameDocument(document);
  }, [markup.layers.length]);

  useEffect(() => {
    const body = frameDocument?.body;
    if (!body) return;

    const select = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (typeof target?.closest !== "function") return;
      if (target.closest("a")) event.preventDefault();

      const id = target
        .closest("[data-mp-layer]")
        ?.getAttribute("data-mp-layer");
      if (id) onSelect(id);
    };
    const preventSubmit = (event: SubmitEvent) => event.preventDefault();

    body.addEventListener("click", select);
    body.addEventListener("submit", preventSubmit);

    return () => {
      body.removeEventListener("click", select);
      body.removeEventListener("submit", preventSubmit);
    };
  }, [frameDocument, onSelect]);

  if (!markup.layers.length) {
    return (
      <div className="grid min-h-80 flex-1 place-items-center text-center text-muted">
        <div className="space-y-3">
          <ImageOff className="mx-auto size-6" />
          <p>Import HTML or choose a preset to start.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-90 flex-1 justify-center overflow-hidden bg-[var(--canvas)] bg-[radial-gradient(var(--grid)_1px,transparent_1px)] bg-size-[16px_16px] p-3 sm:p-4">
      <div
        className={`relative flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--canvas-line)] bg-[#131110] ${device === "mobile" ? "max-w-97.5" : ""}`}
      >
        <iframe
          ref={frame}
          title="Component preview"
          sandbox="allow-same-origin"
          srcDoc={FRAME_HTML}
          referrerPolicy="no-referrer"
          className="min-h-82.5 w-full flex-1 scheme-dark"
          onLoad={(event) =>
            setFrameDocument(event.currentTarget.contentDocument)
          }
        />

        {frameDocument &&
          createPortal(
            <>
              {css && <style>{css}</style>}
              {markup.styles.length > 0 && (
                <style>{markup.styles.join("\n")}</style>
              )}
            </>,
            frameDocument.head,
          )}

        {frameDocument && createPortal(children, frameDocument.body)}
      </div>
    </div>
  );
}
