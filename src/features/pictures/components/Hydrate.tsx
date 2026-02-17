"use client";

import { useEffect } from "react";
import { usePicturesStore } from "../store/pictureStore";
import { Picture } from "../types";
import PicturesGrid from "./PictureGrid";

export default function Hydrate({ pictures }: { pictures: Picture[] }) {
  const setPictures = usePicturesStore((state) => state.setPictures);

  useEffect(() => {
    setPictures(pictures);
  }, [pictures, setPictures]);

  return <PicturesGrid />;
}
