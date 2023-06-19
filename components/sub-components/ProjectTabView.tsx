import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { faker } from "@faker-js/faker";
import { Button } from "../ui/button";

export default function ProjectTabView({
  isForArtist,
}: {
  isForArtist?: boolean;
}) {
  return (
    <Tabs defaultValue="members" className="w-full bg-white pb-10">
      <TabsList className="flex text-lg rounded-none justify-between bg-white px-4 h-16 border-b border-b-slate-300">
        <TabsTrigger
          value="members"
          className="bg-white flex justify-center"
          style={{ flex: "1" }}
        >
          Members
        </TabsTrigger>
        {!isForArtist && (
          <TabsTrigger
            value="requests"
            className="bg-white flex justify-center"
            style={{ flex: "1" }}
          >
            Requests
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="members" className="h-32">
        <div className="flex flex-col px-5">
          <div className="py-5 h-10 border-b border-slate-200 flex items-center">
            <h1>234 Members</h1>
          </div>
          <div className="flex py-5 justify-between items-center">
            <div className="flex items-center">
              <Avatar className="h-14 w-14 border border-slate-300">
                <AvatarImage src={faker.image.avatar()} />
                <AvatarFallback>
                  <AvatarImage />
                </AvatarFallback>
              </Avatar>
              <div className="px-3 py-1">
                <h1 className="text-lg font-semibold">
                  {faker.name.fullName()}
                </h1>
                <span>
                  {faker.helpers.arrayElement([
                    "Actor",
                    "Director",
                    "Muscian",
                    "Voice Artist",
                    "Art Director",
                  ])}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              {**/{!isForArtist && (
                <Button variant={"destructive"} size={"sm"}>
                  Remove
                </Button>
              )}
              <Button size={"sm"}>View Profile</Button>*/}
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="requests">
        <div className="flex flex-col px-5">
          <div className="py-5 h-10 border-b border-slate-200 flex items-center">
            <h1>23 Requests</h1>
          </div>
          <div className="flex py-5 justify-between items-center">
            <div className="flex items-center">
              <Avatar className="h-14 w-14 border border-slate-300">
                <AvatarImage src={faker.image.avatar()} />
                <AvatarFallback>
                  <AvatarImage />
                </AvatarFallback>
              </Avatar>
              <div className="px-3 py-1">
                <h1 className="text-lg font-semibold">
                  {faker.name.fullName()}
                </h1>
                <span>
                  {faker.helpers.arrayElement([
                    "Actor",
                    "Director",
                    "Muscian",
                    "Voice Artist",
                    "Art Director",
                  ])}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button size={"sm"}>Accept & Add</Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
