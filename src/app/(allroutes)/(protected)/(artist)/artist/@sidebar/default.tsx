"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import React from "react";

export default function DefaultSideBar() {
  const session = useSession();

  return (
    <div
      className="bg-white shadow-lg w-full gap-3 rounded-sm flex flex-col items-center"
      style={{ padding: "5px", paddingTop: "24px", paddingBottom: "24px" }}
    >
      <Avatar style={{height:"120px",width:"120px"}}>
        <AvatarImage src={session.data?.user?.image ?? "/artist_avatar.jpg"} />
        <AvatarFallback>
          <AvatarImage src="/artist_avatar.jpg" />
        </AvatarFallback>
      </Avatar>
      <h1>{session.data?.user?.name}</h1>
      <span className="bg-indigo-200 text-indigo-700 py-1 px-2 rounded-full text-xs">
        Talent
      </span>
    </div>
  );
}
