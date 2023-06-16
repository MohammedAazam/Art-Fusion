"use client";
import { Inter } from "next/font/google";
import { Button } from "../ui/button";
import NavButton from "../ui/navbutton";
import { AiFillHeart } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const italiana = Inter({ weight: "700", subsets: ["latin"] });

export default function NavBar({
  isFor = "DEFAULT",
}: {
  isFor?: "PRODUCTION" | "ARTIST" | "DEFAULT";
}) {
  const session = useSession();
  const pathname = usePathname();

  return (
    <nav className="bg-[rgba(255,255,255,0.8)] backdrop-blur-sm z-40  h-[58px] fixed w-full top-0 left-0 flex items-center shadow-sm px-10 justify-between">
      <Link
        href={
          isFor == "PRODUCTION"
            ? "/production"
            : isFor == "ARTIST"
            ? "/artist"
            : "/"
        }
      >
        <h1 style={italiana.style} className="text-xl font-bold text-primary">
          Art Fusion
        </h1>
      </Link>
      <div className="gap-8 flex items-center">
        {isFor == "PRODUCTION" ? (
          <>
            <NavButton
              href="/production"
              className={
                pathname == "/production"
                  ? "border-b border-primary"
                  : ""
              }
            >
              Talents
            </NavButton>
            <NavButton className={
                pathname == "/production/my-projects"
                  ? "border-b border-primary"
                  : ""
              } href="/production/my-projects">Projects</NavButton>
            <NavButton
              href="/production/favourites"
              className="hover:bg-pink-100 p-2 rounded-full"
            >
              <AiFillHeart className="text-xl text-pink-500" />
            </NavButton>
            <NavButton href="/production/my-profile">
              <Avatar>
                <AvatarImage src={session.data?.user?.image!} />
                <AvatarFallback>
                  <AvatarImage />
                </AvatarFallback>
              </Avatar>
            </NavButton>
          </>
        ) : (
          <>
            <Link href={"/sign-in"}>
              <Button size={"sm"} variant={"ghost"}>
                Login as Talent
              </Button>
            </Link>
            <Link href={"/sign-in"}>
              <Button size={"sm"}>Hire Talent</Button>
            </Link>
            <Link href={"/join"}>
              <Button size={"sm"} variant={"outline"}>
                Apply as Talent
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
