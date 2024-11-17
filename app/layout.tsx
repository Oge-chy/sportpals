import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { ClerkProvider} from "@clerk/nextjs";
// import { ClerkProvider,SignInButton,SignedIn,SignedOut, UserButton } from "@clerk/nextjs";

import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Sportpals",
  description: "Connect and Play!",
  icons: {
    icon: "/assets/images/splogo.svg"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.variable}> 
          
          
          {children} 
          </body>
      </html>
    </ClerkProvider>
    
  );
}

{/* <SignedOut>
<SignInButton />
</SignedOut>
<SignedIn>
<UserButton />
</SignedIn> */}