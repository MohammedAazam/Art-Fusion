"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { faker } from "@faker-js/faker";
import { Button } from "../ui/button";
import { useAppSelector } from "@/store";
import {
  MembersSelector,
  addProductionMember,
  removeProductionMember,
} from "@/store/productions.slice";
import { RequestsSelector } from "@/store/requests.slice";
import { useAppDispatch } from "@/lib/hooks";
import { useParams } from "next/navigation";

export default function ProjectTabView({
  isForArtist,
}: {
  isForArtist?: boolean;
}) {
  const members = useAppSelector(MembersSelector.selectAll);
  const requests = useAppSelector(RequestsSelector.selectAll);
  const requestsIds = useAppSelector(RequestsSelector.selectIds);
  const membersIds = useAppSelector(MembersSelector.selectIds);
  const dispatch = useAppDispatch();
  const pId = useParams().projectId;

  return (
    <Tabs defaultValue="members" className="w-full h-fit bg-white pb-10">
      <TabsList className="flex text-lg rounded-none justify-between bg-white px-4 h-16 border-b border-b-slate-300">
        <TabsTrigger
          value="members"
          className="bg-white flex justify-center text-base font-medium"
          style={{ flex: "1" }}
        >
          {membersIds.length} Members
        </TabsTrigger>
        {!isForArtist && (
          <TabsTrigger
            value="requests"
            className="bg-white flex justify-center text-base font-medium"
            style={{ flex: "1" }}
          >
            {requestsIds.length} Requests
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="members" className="h-fit">
        <div className="flex flex-col px-5">
          {membersIds.length == 0 ? (
            <div className="flex py-10 h-40 justify-center items-center text-xl text-slate-700">
              No Members yet !
            </div>
          ) : (
            members.map((member) => (
              <div
                key={member.id}
                className="flex py-5 px-12 justify-between items-center"
              >
                <div className="flex items-center">
                  <Avatar className="h-14 w-14 border border-slate-300">
                    <AvatarImage src={member.image ?? "artist_avatar.jpg"} />
                    <AvatarFallback>
                      <AvatarImage />
                    </AvatarFallback>
                  </Avatar>
                  <div className="px-3 py-1">
                    <h1 className="text-lg font-semibold">{member.name}</h1>
                    <span>{member.as}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  {!isForArtist && (
                    <Button
                      onClick={() =>
                        dispatch(
                          removeProductionMember({ userId: member.id, pId })
                        )
                      }
                      variant={"destructive"}
                      size={"sm"}
                    >
                      Remove
                    </Button>
                  )}
                  {/* <Button size={"sm"}>View Profile</Button> */}
                </div>
              </div>
            ))
          )}
        </div>
      </TabsContent>
      <TabsContent value="requests">
        <div className="flex flex-col px-5">
          {requestsIds.length == 0 ? (
            <div className="flex py-10 h-40 justify-center items-center text-xl text-slate-700">
              No Requests yet !
            </div>
          ) : (
            requests.map((member) => (
              <div
                key={member.id}
                className="flex py-5 px-12 justify-between items-center"
              >
                <div className="flex items-center">
                  <Avatar className="h-14 w-14 border border-slate-300">
                    <AvatarImage src={member.image ?? "artist_avatar.jpg"} />
                    <AvatarFallback>
                      <AvatarImage />
                    </AvatarFallback>
                  </Avatar>
                  <div className="px-3 py-1">
                    <h1 className="text-lg font-semibold">{member.name}</h1>
                    <span>{member.as}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    size={"sm"}
                    onClick={() =>
                      dispatch(addProductionMember({ userId: member.id, pId }))
                    }
                  >
                    Accept & Add
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
