import { Inter } from "next/font/google";
import "./globals.css";
export const metadata = {
  title: "Vision Miles Calculator",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
