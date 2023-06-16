import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import { SlBadge, SlLocationPin } from "react-icons/sl";
import { badgeVariants } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Artist } from "@/store/artists.slice";
import Link from "next/link";
import { LikeButton } from "../ui/LikeButton";

export default function FeedCard({
  feed,
  onClick,
  className,
  viewProfile,
}: {
  feed: Artist;
  onClick?: () => void;
  className?: string;
  viewProfile?: boolean;
}) {
  return (
    <div
      onClick={() => onClick && onClick()}
      className={cn(
        "bg-white px-8 py-6 flex flex-col rounded-sm border-b border-slate-200 transition-all duration-300",
        className
      )}
    >
      {/* header */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-12 w-12">
            <AvatarImage src={feed.image!} />
            <AvatarFallback>
              <AvatarImage />
            </AvatarFallback>
          </Avatar>
          <div className={"flex flex-col px-3 gap-2"}>
            <div className="flex items-center gap-3">
              <h1 className="text-md font-medium">{feed.name}</h1>
              <span
                className={cn(
                  badgeVariants({ variant: "secondary" }),
                  "bg-blue-50 py-1 h-fit text-primary gap-2"
                )}
              >
                {feed.age} years old
              </span>
            </div>
            <div className="flex gap-4">
              <span className={"flex gap-2 items-center"}>
                <SlBadge className="text-lg text-primary" />
                <span className="text-sm">{feed.as}</span>
              </span>
              <span className={"flex gap-2 items-center"}>
                <SlLocationPin className="text-lg text-primary" />{" "}
                <span className="text-sm">{feed.address}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <LikeButton postId={feed.id} />
          {viewProfile && (
            <Link href={`/production/v/${feed.id}`}>
              <Button
                onClick={() => {
                  console.log("liked");
                }}
                size={"sm"}
              >
                View Profile
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* about */}
      <p className="py-3 text-md text-slate-500">{feed.about}</p>

      {/* skills */}
      <div className="flex gap-3 overflow-hidden">
        {feed.skills &&
          feed.skills.map((skill, index) => {
            return (
              <span
                key={skill + index}
                className={cn(
                  badgeVariants({ variant: "secondary" }),
                  "bg-blue-50 py-2 px-3 h-fit text-sm font-semibold text-primary gap-2"
                )}
              >
                {skill}
              </span>
            );
          })}
      </div>
    </div>
  );
}
