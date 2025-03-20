import "./globals.css";
import AccountContext from "@/context/AccountContext";
import Navbar from "@/navbar/page";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Navbar />
      <AccountContext>
        <body>{children}</body>
      </AccountContext>
    </html>
  );
}
