import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { Inter } from "next/font/google";
import zhCN from "antd/locale/zh_CN";
import "./globals.css";
import { DataProvider } from "@utils/use-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider locale={zhCN}>
            <DataProvider>{children}</DataProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
