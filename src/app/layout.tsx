import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ConvexClerkProvider from "@/components/providers/ConvexClerkkProvider";
import Navbar from "@/components/ui/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

const leagueSpartan = localFont({
  src: "/fonts/LeagueSpartan-VariableFont_wght.ttf",
  variable: "--font-league-spartan", // Custom CSS variable for font
  weight: "100 900", // Weight range supported by the font
  display: "swap", // Ensures faster font rendering
});

export const silkscreenBold = localFont({
  src: "/fonts/Silkscreen-Bold.ttf",
  variable: "--font-silkscreen", // Custom CSS variable for font
  weight: "700", // Specify the weight for bold
  display: "swap", // Ensures faster font rendering
});

export const metadata: Metadata = {
  title: "Vouch",
  description: "A Cool Interview Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${leagueSpartan.className} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SignedIn>
              <div className="min-h-screen">
                <Navbar />
                <main>
                  {children}
                </main>
              </div>
            </SignedIn>

            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
