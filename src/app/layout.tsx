import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MS-39 Guided Femto LASIK | Amanat Eye Hospital",
  description: "Because your eyes deserve more than a standard measurement. Learn about MS-39 Guided Femto LASIK at Amanat Eye Hospital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" style={{ '--font-inter': "'Inter', sans-serif", '--font-poppins': "'Poppins', sans-serif" } as any}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-inter">{children}</body>
    </html>
  );
}
