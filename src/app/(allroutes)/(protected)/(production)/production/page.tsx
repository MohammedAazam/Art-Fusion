"use client";

import FeedCard from "@/components/sub-components/FeedCard";
import { useAppSelector } from "@/store";
import { ArtistSelector } from "@/store/artists.slice";
import { useRouter } from "next/navigation";

export default function Page() {
  const Artists = useAppSelector(ArtistSelector.selectAll);
  const router = useRouter();

  return (
    <div className="text-black flex flex-col h-fit w-full gap-4">
      {Artists &&
        Artists.map((artist) => (
          <FeedCard
            className="shadow-lg"
            viewProfile
            key={artist.id}
            feed={artist}
          />
        ))}
    </div>
  );
}
