import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { ChatProvider } from "@/context/ChatProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatProvider>
      <html lang="en" className="dark">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Sidebar/>
            <div className="grid h-screen w-full pl-[56px]">
              {children}
            </div>
          </body>
      </html>
    </ChatProvider>
  );
}
