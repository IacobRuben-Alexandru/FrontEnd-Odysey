"use client";

import { useEffect } from "react";
import { fetchCombinedPictures } from "@/src/features/pictures/api/fetchAPI";
import { usePicturesStore } from "@/src/features/pictures/store/pictureStore";
import PicturesGrid from "@/src/features/pictures/components/PictureGrid";

export default function Home() {
  const setPictures = usePicturesStore((s) => s.setPictures);

  useEffect(() => {
    async function load() {
      const pics = await fetchCombinedPictures(20);
      setPictures(pics);
    }
    load();
  }, []);

  return <PicturesGrid />;
}
