import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import TopBar from "@/src/components/personnal/topBar";
import Sidebar from "@/src/components/personnal/sidebar";
import RightBar from "@/src/components/personnal/rightBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex flex-col w-full h-full max-w-7xl mx-auto">
        <div className="absolute top-0  z-10">
          <TopBar />
        </div>
        <div className="flex flex-row justify-between h-full w-full pt-17">
          <Sidebar />
          <div className="xl:max-w-2xl w-full px-3 lg:px-0">{children}</div>
          <RightBar />
        </div>
      </div>
    </div>
  );
}
