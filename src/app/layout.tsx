import { Header } from '@root/components/shared';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Providers } from '@root/components/shared/provider';
import NextTopLoader from 'nextjs-toploader';

// Определяем базовый URL в зависимости от окружения
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Шрифт Nunito для кириллицы
const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

// Метаданные для главной страницы
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Black Temple - Гайды по World of Warcraft',
  description:
    'Гайды по World of Warcraft: рейды, мифик+, классы и специализации. Узнайте, как выживать и побеждать в WoW!',
  keywords: [
    'World of Warcraft',
    'WoW гайды',
    'рейды',
    'мифик+',
    'классы WoW',
    'гайды по WoW',
    'Black Temple',
  ],
  openGraph: {
    title: 'Black Temple - Гайды по World of Warcraft',
    description:
      'Гайды по World of Warcraft: рейды, мифик+, классы и специализации. Узнайте, как выживать и побеждать в WoW!',
    url: `${baseUrl}/`, // Абсолютный URL
    siteName: 'Black Temple',
    images: [
      {
        url: `${baseUrl}/assets/meta/main-page.png`, // Абсолютный путь
        width: 1200,
        height: 630,
        alt: 'Black Temple - Гайды по World of Warcraft',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Black Temple - Гайды по World of Warcraft',
    description:
      'Гайды по World of Warcraft: рейды, мифик+, классы и специализации. Узнайте, как выживать и побеждать в WoW!',
    images: [`${baseUrl}/assets/meta/main-page.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <head>
        <Script id='wowhead-tooltips-config'>
          {`const whTooltips = {colorLinks: true, iconizeLinks: true, renameLinks: true};`}
        </Script>
        <Script
          src='https://wow.zamimg.com/js/tooltips.js'
          strategy='afterInteractive'
        />
        <link data-rh='true' rel='icon' href='/favicon.png' />
      </head>
      <body className={nunito.className}>
        <main className='min-h-screen'>
          <Providers>
            <Header />
            <NextTopLoader />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
