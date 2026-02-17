"use client";

import { Heart, Download } from "lucide-react";
import Image from "next/image";
import { Picture } from "../types";
import { usePicturesStore } from "../store/pictureStore";

async function triggerDownload(imageUrl: string, fileName: string) {
  try {
    const response = await fetch(imageUrl, { mode: 'cors' });
    if (!response.ok) throw new Error("Network response was not ok");
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    const extension = imageUrl.includes(".gif") ? "gif" : "jpg";
    link.download = `${fileName}.${extension}`;
    
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed, falling back to window.open", error);
    window.open(imageUrl, "_blank");
  }
}

export default function PictureCard({ picture }: { picture: Picture }) {
  const toggleFavorite = usePicturesStore((s) => s.toggleFavorite);
  const isFavorite = usePicturesStore((s) =>
    s.favorites.some((p) => p.id === picture.id)
  );

  const handleDownload = (e: React.MouseEvent) => {
  e.stopPropagation();
  window.location.href = `/api/download?url=${encodeURIComponent(picture.url)}`;
};

  return (
    <div className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl bg-gray-100">
      
      {picture.media_type === "video" ? (
        <div className="relative w-full aspect-video">
           <iframe
            src={picture.url}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      ) : (

        <img
          src={picture.url}
          alt={picture.author || "Media"}
          className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Imagine+Indisponibila";
          }}
        />
      )}

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/40 transition-all duration-300">
        
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(picture);
          }}
          className="absolute left-3 top-3 p-2 hover:scale-110 transition-transform"
        >
          <Heart
            size={28}
            className={isFavorite ? "fill-red-500 text-red-500" : "text-white shadow-sm"}
          />
        </button>

        {picture.media_type !== "video" && (
          <button
            type="button"
            onClick={handleDownload}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-all active:scale-90"
          >
            <Download size={20} />
          </button>
        )}

        <div className="absolute bottom-3 left-3 text-white text-xs font-medium truncate w-[80%]">
          {picture.author}
        </div>
      </div>
    </div>
  );
}