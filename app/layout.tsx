import "./globals.css";
import { Providers } from "./providers";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={poppins.className}>
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <main className="flex flex-grow flex-col items-center justify-center">
            <Providers>{children}</Providers>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
