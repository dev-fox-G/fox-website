import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/hanken-grotesk";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevFox | Web, Mobile and Custom Software Development",
  description:
    "DevFox is a software company in Punjab, Pakistan. We design and build websites, mobile apps and custom software for businesses worldwide.",
};

export const viewport: Viewport = {
  themeColor: "#12141A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="absolute -top-16 left-4 z-200 rounded-[10px] bg-ink px-4 py-[0.6rem] text-white transition-[top] focus:top-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
