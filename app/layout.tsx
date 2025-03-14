import { Montserrat } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/app/globals.css";
import Nav from "@/my-components/Nav";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Product Feedback Bot",
  description: "An AI agent to gain feedback for your product, idea or webpage based on digital avatars of real people",
};

const geistSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={geistSans.className} suppressHydrationWarning>
      <body className='bg-background text-foreground w-screen h-screen'>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          <main className='h-full w-screen flex flex-1  bg-black  flex-col' id='main-content'>
            <Nav />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
