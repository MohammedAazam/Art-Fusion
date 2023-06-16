"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { useAppSelector } from "@/store";
import {
  RequestsSelector,
  addRequest,
  removeRequest,
} from "@/store/requests.slice";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DefaultSideBar() {
  const session = useSession();
  const params = useParams();
  const projectId = params.projectId;
  const dispatch = useAppDispatch();
  const requestIds = useAppSelector(RequestsSelector.selectIds);
  const [isRequested, setIsRequested] = useState(false);

  useEffect(() => {
    setIsRequested(requestIds.includes(session.data?.user?.id!));
  }, [projectId, requestIds, session.data?.user,params]);

  return (
    <div
      className="bg-white shadow-lg w-full gap-3 rounded-sm flex flex-col items-center"
      style={{ padding: "5px", paddingTop: "24px", paddingBottom: "24px" }}
    >
      <Avatar style={{ height: "120px", width: "120px" }}>
        <AvatarImage src={session.data?.user?.image ?? "/artist_avatar.jpg"} />
        <AvatarFallback>
          <AvatarImage src="/artist_avatar.jpg" />
        </AvatarFallback>
      </Avatar>
      <h1>{session.data?.user?.name}</h1>
      <span className="bg-indigo-200 text-indigo-700 py-1 px-2 rounded-full text-xs">
        {"Talent"}
      </span>
      <Button
        size={"sm"}
        variant={isRequested ? "secondary" : "default"}
        onClick={() => {
          if (isRequested)
            dispatch(
              removeRequest({ artistId: session.data?.user?.id!, projectId })
            );
          else
            dispatch(
              addRequest({ artistId: session.data?.user?.id!, projectId })
            );
        }}
      >
        {isRequested ? "Cancel Request" : "Send Request"}
      </Button>
    </div>
  );
}
