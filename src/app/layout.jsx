import AuthProvider from "@/provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "Stanpe | Home",
  description: "Stanpe is a tanks management website.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-primary bg-slate-50 text-slate-700">
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
