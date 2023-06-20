"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { AiOutlineShop } from "react-icons/ai";
import { Button } from "../ui/button";
import { Database } from "../../types/supabase";
import { SupaClient } from "../../utils/supabase";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export type Profile = Database["public"]["Tables"]["user"]["Row"];

export const ProfilePage = ({ isForArtist }: { isForArtist?: boolean }) => {
  const session = useSession();
  const user = session.data?.user;
  const [profile, setProfile] = useState<null | Profile>(null);

  const fetchUserProfie = useCallback(async () => {
    if (!user) return;
    setProfile(
      (await SupaClient.from("user").select("*").eq("id", user.id).single())
        .data
    );
  }, [user]);

  useEffect(() => {
    if (user?.id) fetchUserProfie();
  }, [user?.id]);

  return (
    <div
      className="bg-white rounded-lg shadow-md"
      style={{ padding: "28px", gap: "10px" }}
    >
      <div
        className="flex items-center flex-col gap-3"
        style={{ marginBottom: "10px" }}
      >
        <Avatar className="h-36 w-36">
          <AvatarImage
            src={
              profile?.image ?? isForArtist
                ? "/artist_avatar.jpg"
                : "/production_avatar.png"
            }
          />
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <h1 className="text-slate-900 text-3xl font-bold">{profile?.name}</h1>
        <span className="bg-indigo-200 flex w-fit items-center gap-2 p-1 rounded-full px-3 text-indigo-800">
          {isForArtist ? null : <AiOutlineShop className="text-lg" />}
          {profile?.role_type == "ARTIST"
            ? "Talent/Technician"
            : "Production House"}
        </span>
      </div>
      <div className="flex flex-col w-full gap-3 px-20">
        <div className="flex flex-col gap-2 w-full">
          <Label>Email</Label>
          <Input
            readOnly
            type="email"
            value={profile?.email!}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label>D.O.B</Label>
          <Input
            readOnly
            type="date"
            value={profile?.date_of_birth!}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label>Age</Label>
          <Input readOnly type="age" value={profile?.age!} className="w-full" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label>Address</Label>
          <Input
            readOnly
            type="adress"
            value={profile?.address!}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label>About</Label>
          <Textarea readOnly value={profile?.about!} className="w-full" />
        </div>
      </div>
      {/* <p className="text-gray-600 mb-2">
          <span className="font-semibold">Date of Birth:</span> {dob}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Company Name:</span> {companyName}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Location:</span> {location}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Email:</span> {email}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Phone:</span> {phone}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Bio:</span> {bio}
        </p> */}
      <Button size={"lg"} className="w-full mt-3" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
};
