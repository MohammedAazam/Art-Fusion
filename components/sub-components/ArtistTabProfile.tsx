import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Image from "next/image";
import { faker } from "@faker-js/faker";
 
export default function ArtistTabProfile() {
  return (
    <div>
      <Tabs defaultValue="gallery" className="w-full bg-white ">
        <TabsList className="flex text-lg rounded-none justify-between bg-white px-4 h-16 border-b border-b-slate-300">
          <TabsTrigger
            value="gallery"
            className="bg-white flex justify-center"
            style={{ flex: "1" }}
          >
            Gallery
          </TabsTrigger>
          <TabsTrigger
            value="prev_projects"
            className="bg-white flex justify-center"
            style={{ flex: "1" }}
          >
            Previous Projects
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="gallery"
          className="grid gap-2 px-2 pb-5"
          style={{
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            height: "auto",
          }}
        >
          <div className="h-[260px] relative max-w-full overflow-hidden">
            <Image
              src={faker.image.abstract(290, 180, true)}
              alt={"gallery"}
              fill
            />
          </div>
          <div className="h-[260px] relative max-w-full overflow-hidden">
            <Image
              src={faker.image.abstract(290, 180, true)}
              alt={"gallery"}
              fill
            />
          </div>
          <div className="h-[260px] relative max-w-full overflow-hidden">
            <Image
              src={faker.image.abstract(290, 180, true)}
              alt={"gallery"}
              fill
            />
          </div>
          <div className="h-[260px] relative max-w-full overflow-hidden">
            <Image
              src={faker.image.abstract(290, 180, true)}
              alt={"gallery"}
              fill
            />
          </div>
          <div className="h-[260px] relative max-w-full overflow-hidden">
            <Image
              src={faker.image.abstract(290, 180, true)}
              alt={"gallery"}
              fill
            />
          </div>
          <div className="h-[260px] relative max-w-full overflow-hidden">
            <Image
              src={faker.image.abstract(390, 280, true)}
              alt={"gallery"}
              fill
            />
          </div>
        </TabsContent>
        <TabsContent value="prev_projects">
          <div className="h-52 flex justify-center items-center">
            <h1>No projects</h1>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
