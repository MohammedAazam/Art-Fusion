"use client"

interface props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: props) {
  return <div className="w-[100vw] h-[100vh]">{children}</div>;
}
