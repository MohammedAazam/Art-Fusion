"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import Providers from "./providers";
import { Poppins } from "next/font/google";
import NavBar from "@/components/sub-components/NavBar";

interface props {
  children: React.ReactNode;
}

const roboto = Poppins({
  weight: ["400", "100", "600", "700", "800"],
  subsets: ["devanagari"],
});

export default function RootLayout({ children }: props) {
  const pathName = usePathname();
  return (
    <html lang="en">
      <body
        className="h-[100vh] w-[100vw] overflow-x-hidden"
        style={roboto.style}
      >
        <Providers>
          {pathName !== "/sign-in" && pathName !== "/join" && (
            <NavBar
              isFor={
                pathName.startsWith("/production")
                  ? "PRODUCTION"
                  : pathName.startsWith("/artist")
                  ? "ARTIST"
                  : "DEFAULT"
              }
            />
          )}
          <main
            style={{
              paddingTop:
                pathName !== "/sign-in" && pathName !== "/join"
                  ? "58px"
                  : "0px",
              height: "fit",
              width: "100%",
            }}
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
