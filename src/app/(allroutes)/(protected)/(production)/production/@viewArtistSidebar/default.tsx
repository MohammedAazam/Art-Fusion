"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store";
import { ArtistSelector } from "@/store/artists.slice";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useParams } from "next/navigation";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";

export default function DefaultViewArtistSideBar() {
  const params = useParams();
  const id = params.artistId;
  const artist = useAppSelector((state) =>
    ArtistSelector.selectById(state, id)
  );

  return (
    <div
      className="bg-white shadow-lg sticky top-[58px] left-0 w-full gap-3 rounded-sm flex flex-col items-center"
      style={{ padding: "5px", paddingTop: "24px", paddingBottom: "24px" }}
    >
      <Avatar className="h-20 w-20">
        <AvatarImage src={artist?.image!} />
        <AvatarFallback>
          <AvatarImage />
        </AvatarFallback>
      </Avatar>
      <h1>{artist?.name}</h1>
      <span className="bg-indigo-200 text-indigo-700 py-1 px-2 rounded-full text-xs">
        {artist?.as}
      </span>
      <Button size={"lg"} className="gap-2">
        Invite <AiOutlineMail className="text-lg" />
      </Button>
    </div>
  );
}
