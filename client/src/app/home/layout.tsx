import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider"

import { cn } from "../../lib/utils"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Home - GymGrid",
  description: "GymGrid is a workout tracking app that helps you track your workouts and progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
    </html>
  );
}
