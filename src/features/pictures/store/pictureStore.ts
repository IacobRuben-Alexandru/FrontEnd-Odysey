import { create } from "zustand";
import { Picture } from "../types";

interface PictureStore {
  pictures: Picture[];
  favorites: Picture[];
  cart: Picture[];

  setPictures: (pics: Picture[]) => void;
  toggleFavorite: (pic: Picture) => void;
  addToCart: (pic: Picture) => void;
}

export const usePicturesStore = create<PictureStore>((set) => ({
  pictures: [],
  favorites: [],
  cart: [],

  setPictures: (pics) => set({ pictures: pics }),

  toggleFavorite: (pic) =>
    set((state) => ({
      favorites: state.favorites.some((p) => p.id === pic.id)
        ? state.favorites.filter((p) => p.id !== pic.id)
        : [...state.favorites, pic]
    })),

  addToCart: (pic) =>
    set((state) => ({
      cart: [...state.cart, pic]
    }))
}));
