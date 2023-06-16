"use client";

import { useAppDispatch } from "@/lib/hooks";
import { useAppSelector } from "@/store";
import { ArtistSelector, fetchIntialArtist } from "@/store/artists.slice";
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
    ArtistSelector.selectIds
  ).length;
  const pathname = usePathname();
  const isCreateProductionPage = pathname === "/production/create-production";
  const isArtistPage = pathname.startsWith("/production/v");

  if (!isAlereadyArtistsExist) dispatch(fetchIntialArtist());

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
      {!isCreateProductionPage && (
        <div
          className="h-full w-full sticky top-14"
          style={{ gridColumnStart: 1, gridColumnEnd: 4 }}
        >
          {isArtistPage ? viewArtistSidebar : sidebar}
        </div>
      )}
      <div
        className="h-full w-full col-span-2"
        style={{
          gridColumnStart: isCreateProductionPage ? 3 : 4,
          gridColumnEnd: isCreateProductionPage ? 11 : 12,
        }}
      >
        {children}
      </div>
    </main>
  );
}
