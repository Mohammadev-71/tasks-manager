import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "./components/Theme-provider";


export const metadata: Metadata = {
  title: "Tasks Manager",
  description: "Dara Company's Task Manager and Distributor",
};

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: LayoutProps) {

  const {locale} = await params

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      dir={locale==="en"?"ltr":"rtl"}
      className={`h-full antialiased bg-white dark:bg-zinc-900`}
    > 
      <body className="min-h-full flex ">
        <ThemeProvider
          attribute={'class'}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        
        
      </body>
    </html>
  );
}
