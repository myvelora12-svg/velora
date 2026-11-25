"use client";

import { useEffect, useState } from "react";
import { Download, Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QrisDisplayProps {
  src: string;
  alt?: string;
  title?: string;
  caption?: React.ReactNode;
  downloadFilename?: string;
}

export function QrisDisplay({
  src,
  alt = "QRIS My Velora",
  title,
  caption,
  downloadFilename = "qris-my-velora.png",
}: QrisDisplayProps) {
  const [zoomOpen, setZoomOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!zoomOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoomOpen]);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      if (src.startsWith("data:")) {
        const a = document.createElement("a");
        a.href = src;
        a.download = downloadFilename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        toast.success("QRIS berhasil diunduh");
        return;
      }

      const res = await fetch(src);
      if (!res.ok) throw new Error("Fetch failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = downloadFilename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("QRIS berhasil diunduh");
    } catch {
      window.open(src, "_blank", "noopener,noreferrer");
      toast.info("QRIS dibuka di tab baru untuk disimpan");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <figure className="mt-3 rounded-xl border border-[#EAD6E0] bg-[#FBF7F4] p-4 text-center">
        {title && (
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#47023B]">
            {title}
          </p>
        )}

        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          aria-label="Perbesar gambar QRIS"
          className="group relative mx-auto block w-full max-w-xs cursor-zoom-in overflow-hidden rounded-lg border border-[#EAD6E0] bg-white p-2 transition-colors hover:border-[#FA3890]"
        >
          <img
            src={src}
            alt={alt}
            className="mx-auto max-h-80 w-full object-contain"
          />
          <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-[#6E3B65] group-hover:text-[#47023B]">
            <Maximize2 className="h-3 w-3" /> Ketuk untuk perbesar
          </span>
        </button>

        {caption && <figcaption className="mt-2.5 text-xs sm:text-sm text-[#6E3B65]">{caption}</figcaption>}

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setZoomOpen(true)}
            className="border-[#EAD6E0] bg-white text-[#47023B] hover:bg-[#FAF0F5]"
          >
            <Maximize2 className="h-3.5 w-3.5" /> Perbesar QRIS
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={downloading}
            onClick={handleDownload}
            className="border-[#47023B] bg-[#47023B] text-white hover:bg-[#5E074F] hover:text-white"
          >
            <Download className="h-3.5 w-3.5" /> {downloading ? "Mengunduh..." : "Download QRIS"}
          </Button>
        </div>
      </figure>

      {zoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau QRIS diperbesar"
          onClick={() => setZoomOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-[#EAD6E0] bg-white p-4 sm:p-5 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-sm font-bold text-[#47023B]">{title || alt}</span>
              <button
                type="button"
                onClick={() => setZoomOpen(false)}
                aria-label="Tutup pratinjau QRIS"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#EAD6E0] bg-[#FBF7F4] text-[#47023B] hover:bg-[#FAF0F5] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-xl border border-[#EAD6E0] bg-white p-3">
              <img
                src={src}
                alt={alt}
                className="mx-auto max-h-[70vh] w-full object-contain"
              />
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setZoomOpen(false)}
                className="border-[#EAD6E0] bg-white text-[#47023B] hover:bg-[#FAF0F5]"
              >
                Tutup
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={downloading}
                onClick={handleDownload}
                className="bg-[#47023B] hover:bg-[#5E074F] text-white"
              >
                <Download className="h-3.5 w-3.5" /> {downloading ? "Mengunduh..." : "Download QRIS"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
