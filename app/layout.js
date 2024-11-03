import { AuthProvider } from "./Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/header";
import NavigationBar from "../components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Handicraft",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div>
            <Header />
            <div className="flex flex-row">
              <div className="">
                <NavigationBar />
              </div>
              <div className="flex flex-grow"> {children}</div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
