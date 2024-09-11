"use client";

import { FLASH_MESSAGE_EVENT, observe } from "@/utils/events";
import { useEffect, useState } from "react";
import FlashMessage, { FlashMessageProps } from "../FlashMessage";
import { usePathname } from "next/navigation";

const FlashNotification = () => {
  const [showFlash, setShowFlash] = useState<FlashMessageProps | null>(null);
  const [key, setKey] = useState<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleFlashMessage = (data: FlashMessageProps) => {
      setShowFlash(data);
      setKey((prevKey) => prevKey + 1);
    };

    observe(FLASH_MESSAGE_EVENT, handleFlashMessage);

    return () => {};
  }, []);

  useEffect(() => {
    setShowFlash(null);
  }, [pathname]);

  // useEffect(() => {
  //   if (showFlash) {
  //     const timer = setTimeout(() => {
  //       setShowFlash(null);
  //     }, 2000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [showFlash]);

  if (!showFlash) return <></>;

  return <FlashMessage {...showFlash} key={key} />;
};

export default FlashNotification;
