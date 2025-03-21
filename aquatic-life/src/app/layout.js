import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aquatic Life Detection",
  description: "Detect various aquatic life forms from images",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen`}
      >
        {/* <header className="text-center py-8 bg-blue-700 text-white shadow-lg">
          <h1 className="text-5xl font-extrabold">Aquatic Life Detection</h1>
        </header> */}
        <main className="container mx-auto p-8 bg-black rounded-lg shadow-lg mt-8">
          {children}
        </main>
      </body>
    </html>
  );
}
