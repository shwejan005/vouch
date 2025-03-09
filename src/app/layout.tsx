import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import ConvexClerkProvider from "@/components/providers/ConvexClerkkProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/ui/Navbar";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import type { Metadata } from "next";
import { League_Spartan, Silkscreen } from "next/font/google";
import { Toaster } from "react-hot-toast";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  display: "swap",
});

export const silkScreen = Silkscreen({
  subsets: ["latin"],
  weight: "400"
})


export const metadata: Metadata = {
  title: "Vouch",
  description: "An Interview Platform built for ease of use and simplicity",
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
