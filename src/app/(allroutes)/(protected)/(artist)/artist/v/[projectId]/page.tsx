"use client";
import ProjectCard from "@/components/sub-components/ProjectCard";
import ProjectTabView from "@/components/sub-components/ProjectTabView";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store";
import { ProjectSelector } from "@/store/productions.slice";
import { useParams,useRouter } from "next/navigation";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function ProjectViewPage() {
  const id = useParams().projectId;
  const router = useRouter();
  const projectFeed = useAppSelector((state) =>
    ProjectSelector.selectById(state, id)
  );

  if (typeof projectFeed === "undefined") return null;

  return (
    <div className="grid pb-5">
      <div
        className="bg-white sticky -top-2  flex items-center gap-4"
        style={{ padding: "1rem" }}
      >
        <Button
          onClick={() => {
            router.back();
          }}
          variant={"ghost"}
          className="rounded-full p-1 h-10 w-10 hover:bg-indigo-300 hover:text-primary"
        >
          <AiOutlineArrowLeft className="text-xl" />
        </Button>
        <h3 className="text-xl">My Projects</h3>
      </div>
      <ProjectCard
        isViewFull
        feed={projectFeed}
        className="hover:bg-white border-0 hover:border-0 rounded-none"
      />
      <ProjectTabView isForArtist/>
    </div>
  );
}
