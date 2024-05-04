"use client";
import dynamic from "next/dynamic";
import React from "react";

const FooterToolbar = dynamic(
  () => import("@ant-design/pro-components/").then((mod) => mod.FooterToolbar),
  {
    ssr: false,
  }
);

export const Footer: React.FC<{ ele: React.ReactNode }> = ({ ele }) => {
  return <FooterToolbar>{ele}</FooterToolbar>;
};
