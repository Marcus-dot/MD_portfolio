import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import { CONFIG } from "@/content/config";
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

const TITLE = "Madalitso Daka — Software Engineer, Lusaka";
const DESCRIPTION =
  "I care how engineering decisions compound: architecture, data flows, and the trade-offs that decide whether a system holds up under growth or breaks under complexity. I build for the former.";

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Madalitso Daka",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  colorScheme: "dark",
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
          <style>{`#loader{display:none}.line-in,.hero-fade{animation:none!important}main [style*="opacity"]{opacity:1!important;transform:none!important}.scroll-type span{color:var(--text)!important}`}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
