"use client";

import { useEffect, useState } from "react";
import { fetchAnimeById } from "@/app/action";
import { getTranslation } from "@/services/translate";

// eslint-disable-next-line @next/next/no-async-client-component
export default function AnimeProfilePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [animeData, setAnimeData] = useState(null);
  const [translatedDescription, setTranslatedDescription] =
    useState<string>("");

  const fetchAnimeByIdFun = async (id: string) => {
    const data = await fetchAnimeById(id);
    setAnimeData(data);
    return data;
  };

  const fetchAnimeDescription = async (
    description: string
  ): Promise<string> => {
    const translatedDescription = await getTranslation(description);
    const { translatedText } = translatedDescription.data.translations;
    setTranslatedDescription(translatedText);
    return translatedText;
  };

  useEffect(() => {
    const fetchData = async () => {
      const anime = await fetchAnimeByIdFun(params.id);
      await fetchAnimeDescription(anime.description);
    };

    fetchData();
  }, [params.id]);

  return (
    <>
      {animeData && (
        <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-3 w-2/3">
              <h2 className="font-mono text-4xl font-bold">
                {animeData?.name}
              </h2>
              <p className="font-mono text-xl font-light">
                {animeData.kind} | Total Episodes {animeData.episodes}
              </p>
              <hr className="border w-full border-gray-700" />
              <h3 className="font-mono text-2xl font-light">Description</h3>
              <p className="font-mono text-base text-justify font-extralight">
                {translatedDescription !== ""
                  ? translatedDescription
                  : animeData.description}
              </p>
            </div>
            <div className="flex">
              <img
                src={`https://shikimori.one/${animeData.image.original}`}
                alt="anime-pic"
                className="w-[300px]"
              />
            </div>
          </div>
        </main>
      )}
    </>
  );
}