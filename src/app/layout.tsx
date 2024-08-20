import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard'
});

export const metadata: Metadata = {
  title: 'Permeate',
  description: '당신의 향을 찾아보세요.',
  openGraph: {
    title: 'Permeate',
    description: '당신의 향을 찾아보세요.',
    images: [
      {
        url: 'https://gewbjtpztsdnvbqpunpd.supabase.co/storage/v1/object/sign/permeate/kakao1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwZXJtZWF0ZS9rYWthbzEucG5nIiwiaWF0IjoxNzIzODA0Nzk3LCJleHAiOjE3NTUzNDA3OTd9.9_wLYpuTL7LfATvoT535J8tDjXOagHCT2Yv8D4liyg0&t=2024-08-16T10%3A39%3A58.193Z',
        width: 800,
        height: 400,
        alt: 'Permeate - 당신의 향을 찾아보세요.'
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
