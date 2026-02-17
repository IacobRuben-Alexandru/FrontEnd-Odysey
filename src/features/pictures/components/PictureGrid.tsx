"use client";

import { usePicturesStore } from "../store/pictureStore";
import PictureCard from "./PictureCard";

export default function PicturesGrid() {
  const pictures = usePicturesStore((state) => state.pictures);

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
      {pictures.map((pic) => (
        <PictureCard key={pic.id} picture={pic} />
      ))}
    </div>
  );
}
