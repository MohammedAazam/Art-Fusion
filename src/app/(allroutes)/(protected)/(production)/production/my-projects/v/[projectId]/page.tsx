"use client";
import ProjectCard from "@/components/sub-components/ProjectCard";
import ProjectTabView from "@/components/sub-components/ProjectTabView";
import { useAppSelector } from "@/store";
import { ProjectSelector } from "@/store/productions.slice";
import { useParams } from "next/navigation";
import React from "react";

export default function ProjectViewPage() {
  const id = useParams().projectId;
  const projectFeed = useAppSelector((state) =>
    ProjectSelector.selectById(state, id)
  );

  if (typeof projectFeed === "undefined") return null;

  return (
    <div className="grid gap-3 px-5 pb-5">
      <ProjectCard
        isViewFull
        feed={projectFeed}
        className="hover:bg-white border-0 hover:border-0 rounded-none"
      />
      <ProjectTabView />
    </div>
  );
}
