import { Picture } from "../types";

interface GiphyGif {
  id: string;
  username: string;
  title: string;
  images: {
    original: {
      url: string;
    };
    fixed_height: {
      url: string;
    };
  };
}

interface NasaApodItem {
  date: string;
  url: string;
  hdurl?: string;
  media_type: string;
  copyright?: string;
  title?: string;
}

export async function fetchCombinedPictures(limitPerSource: number = 50): Promise<Picture[]> {
  const NASA_KEY = "KpF7efMN3dXNESoDNHvmWIhBbLBdV9U17wW6Cwk7";
  const GIPHY_KEY = "kJL3oVigfvbZ0e5BSjzziT7B90zwDAOP";

  try {
    const [resNasa, resGiphy] = await Promise.all([
      fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&count=${limitPerSource}`),
      fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_KEY}&limit=${limitPerSource}`)
    ]);

    const dataNasa = await resNasa.json();
    const dataGiphy = await resGiphy.json();

    // NASA: Filtrăm strict doar tipul 'image'
    const nasaPictures = dataNasa
      .filter((item: NasaApodItem) => item.media_type === "image")
      .map((item: NasaApodItem) => ({
        id: `nasa-${item.date}`,
        url: item.url, // URL-ul imaginii standard
        author: item.copyright || "NASA",
        title: item.title
      }));

    // GIPHY: Folosim fixed_height pentru afișare, dar păstrăm original pentru download
    const giphyPictures = dataGiphy.data.map((gif: GiphyGif) => ({
      id: `giphy-${gif.id}`,
      url: gif.images.fixed_height.url, // Aceasta este imaginea care se vede în grid
      downloadUrl: gif.images.original.url, // URL-ul pentru download de calitate
      author: gif.username || "Giphy Artist",
      title: gif.title
    }));

    return [...nasaPictures, ...giphyPictures].sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error("Eroare la fetch:", error);
    return [];
  }
}
