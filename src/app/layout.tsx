import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

/* Runs before first paint: skip the loader on repeat visits this session
   and for reduced-motion users, and let hero entrance play immediately. */
const loaderSkipScript = `try{if(sessionStorage.getItem("md-loader-seen")||matchMedia("(prefers-reduced-motion: reduce)").matches){var d=document.documentElement;d.setAttribute("data-loader-skip","");d.setAttribute("data-loaded","")}}catch(e){}`;

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Madalitso Daka — Software Engineer, Lusaka",
  description:
    "I find the bugs that pass code review, I report numbers that can be traced, and I ship products that survive contact with real users.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderSkipScript }} />
        <noscript>
          <style>{`#loader{display:none}.line-in,.hero-fade{animation:none!important}main [style*="opacity"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
