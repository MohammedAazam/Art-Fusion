"use client";
import ProjectCard from "@/components/sub-components/ProjectCard";
import { useAppSelector } from "@/store";
import { ProjectSelector } from "@/store/productions.slice";
import Link from "next/link";

export default function Page() {
  const projects = useAppSelector(ProjectSelector.selectAll);
  const isLoading = useAppSelector((state) => state.project.isLoading);

  if (isLoading || !projects) return <h1>Loading projects...</h1>;

  return (
    <div
      className="grid gap-3"
      style={{
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        height: "auto",
      }}
    >
      {projects.map((feed) => (
        <Link
          key={feed.id}
          className="shadow-lg"
          href={`/artist/v/${feed.id}`}
        >
          <ProjectCard className="shadow-md" {...{ feed }} />
        </Link>
      ))}
    </div>
  );
}
