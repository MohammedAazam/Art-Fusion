"use client";

import { useAppDispatch } from "@/lib/hooks";
import { useAppSelector } from "@/store";
import { ProjectSelector, fetchIntialProduction } from "@/store/productions.slice";
import { usePathname } from "next/navigation";

interface props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  viewArtistSidebar: React.ReactNode;
}

export default function RootLayout({
  children,
  sidebar,
  viewArtistSidebar,
}: props) {
  const dispatch = useAppDispatch();
  const isAlereadyArtistsExist = useAppSelector(
    ProjectSelector.selectIds
  ).length;
  const pathname = usePathname();
  const isArtistPage = pathname.startsWith("/artist/v/");

  if (!isAlereadyArtistsExist) dispatch(fetchIntialProduction());

  return (
    <main
      className="h-full w-full grid gap-3"
      style={{
        paddingRight: "80px",
        paddingLeft: "80px",
        paddingTop: "30px",
        paddingBottom: "30px",
        gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
        height: "full",
      }}
    >
        <div
          className="h-full w-full sticky top-14"
          style={{ gridColumnStart: 1, gridColumnEnd: 4 }}
        >
          {isArtistPage ? viewArtistSidebar : sidebar}
        </div>
      <div
        className="h-full w-full col-span-2"
        style={{
          gridColumnStart: 4,
          gridColumnEnd:  12,
        }}
      >
        {children}
      </div>
    </main>
  );
}
