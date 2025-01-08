import "./globals.css";
import { Providers } from "./providers";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        />
      </head>
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
