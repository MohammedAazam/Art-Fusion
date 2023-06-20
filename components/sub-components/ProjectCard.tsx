import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import { SlLocationPin } from "react-icons/sl";
import { badgeVariants } from "../ui/badge";
import { cn } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { Project } from "@/store/productions.slice";
import { SupaClient } from "../../utils/supabase";

export default function ProjectCard({
  className,
  isViewFull,
  feed,
}: {
  className?: string;
  isViewFull?: boolean;
  feed: Project;
}) {
  return (
    <div
      className={cn(
        "bg-white flex flex-col w-full overflow-hidden rounded-sm shadow-sm shadow-primary-foreground border border-slate-100 hover:bg-slate-50 hover:border hover:border-primary transition-all duration-300 hover:cursor-pointer",
        className
      )}
    >
      <div className="h-[280px] w-full relative overflow-hidden">
        <Image
          src={
            feed.poster.startsWith("p/")
              ? SupaClient.storage
                  .from("posters")
                  .getPublicUrl(feed.poster, { download: true }).data.publicUrl
              : feed.poster
          }
          fill
          alt={"poster"}
        />
      </div>

      <div className="p-3">
        {/* header */}
        <div className="flex w-full justify-between">
          <div className="flex items-center">
            <div className="flex flex-col pr-3 gap-2">
              <div className="flex items-center gap-3">
                <h1
                  className={
                    "text-lg font-semibold " +
                    (isViewFull
                      ? ""
                      : "whitespace-nowrap max-w-[120px] truncate")
                  }
                >
                  {feed.title}
                </h1>
                <span
                  className={cn(
                    badgeVariants({ variant: "secondary" }),
                    "bg-blue-50 py-1 h-fit text-primary gap-2"
                  )}
                >
                  {feed.no_of_shooting_days} days
                </span>
              </div>
              <div className="flex gap-3">
                <span className="flex gap-2 items-center font-medium">
                  ₹<span className="text-sm">{feed.budget}</span>
                </span>
                <span className="flex gap-2 items-center">
                  <SlLocationPin className="text-lg text-primary" />
                  <span
                    className={
                      "text-sm " +
                      (isViewFull ? "" : "whitespace-nowrap w-28 truncate")
                    }
                  >
                    {feed.address}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex -space-x-4">
            <Avatar className="border-2 border-white">
              <AvatarImage src={faker.image.avatar()} />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-white">
              <AvatarImage src={faker.image.avatar()} />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback className="flex items-center justify-center bg-primary text-white border-2 border-white">
                8+
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* about */}
        <div className={"flex items-center py-5 gap-3"}>
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={feed.user.image ?? "/production_avatar.png"} />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <div className="flex gap-1 justify-center">
              <h3 className="font-medium">{feed.user.name}</h3>
              <span className="text-xs bg-indigo-200 text-indigo-500 rounded-full py-1 px-2">Production House</span>
            </div>
          </div>
        </div>
        {/* skills */}
        <div className="flex gap-3">
          {feed.gener_on_prod?.map((gener, index) => (
            <span
              key={gener + 1}
              className={cn(
                badgeVariants({ variant: "secondary" }),
                "bg-blue-50 py-2 px-3 h-fit text-sm font-semibold text-primary gap-2"
              )}
            >
              {gener}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
