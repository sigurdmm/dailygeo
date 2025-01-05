import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="en">
        <body className="antialiased">
          <div className="min-h-screen">
          <Providers>
            {children}
          </Providers>
          </div>
        </body>
      </html>
  );
}
