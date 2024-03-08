'use client'

import { Inter } from "next/font/google";
import "./styles/globals.css";
import { MessageProvider } from "./contexts/messageContext";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children,} : Readonly<{children: React.ReactNode;}>) 
{

  return (
    <html lang="en">
      <body className={inter.className}>
        <MessageProvider>
          {children}
        </MessageProvider>
      </body>
    </html>
  );
}
