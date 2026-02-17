"use client";

import { usePicturesStore } from "@/src/features/pictures/store/pictureStore";
import PictureCard from "@/src/features/pictures/components/PictureCard";
import { useIsMounted } from "@/src/hooks/useIsMounted";

export default function FavoritesPage() {
    const isMounted = useIsMounted();
    const favorites = usePicturesStore((s) => s.favorites);

    if (!isMounted) return null;
    return (
        <div className="p-4">
        <h1 className="mb-6 text-3xl font-bold text-[#7D5233]">Your Favorites ❤️</h1>

        {favorites.length === 0 ? (
            <p>No favorite pictures yet.</p>
        ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {favorites.map((pic) => (
                <PictureCard key={pic.id} picture={pic} />
            ))}
            </div>
        )}
        </div>
    );
}
