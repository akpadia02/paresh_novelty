"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <>
      <Toaster />
      <NextUIProvider>{children}</NextUIProvider>
    </>
  );
}

