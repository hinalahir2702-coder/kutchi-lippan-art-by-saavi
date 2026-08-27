import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kutchi Lippan Art by Saavi — Handmade Decor from Kutch',
  description: 'One-of-a-kind clay and mirror home decor, handmade in Kutch and shared with the world.',
  openGraph: { title: 'Kutchi Lippan Art by Saavi', description: 'Handmade stories from Kutch', images: ['/og.png'] },
  twitter: { card: 'summary_large_image', title: 'Kutchi Lippan Art by Saavi', description: 'Handmade stories from Kutch', images: ['/og.png'] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
