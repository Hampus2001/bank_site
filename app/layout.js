import "./globals.css";
import AccountContext from "@/context/AccountContext";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AccountContext>
        <body>{children}</body>
      </AccountContext>
    </html>
  );
}
