"use client";

import FlashMessage, { FlashMessageProps } from "@/components/FlashMessage";
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";

export type NotificationProviderProps = {
  children: React.ReactNode;
};

type NotificationContextData = {
  renderNotification: ({
    message,
    variant,
  }: {
    message: string;
    variant: string;
  }) => void;
};

export const NotificationContextDefaultValues: NotificationContextData = {
  renderNotification: () => {},
};

export const NotificationContext = createContext<NotificationContextData>(
  NotificationContextDefaultValues
);

type NotificationsProps = {
  id: number;
} & FlashMessageProps;

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const notificationWrapper = useRef<HTMLDivElement | null>(null);
  const [notifications, setNotifications] = useState<NotificationsProps[]>([]);

  const renderNotification = useCallback(
    ({ message, variant }: { message: string; variant: string }) => {
      const id = new Date().getTime();
      const newNotification = { id, message, variant } as NotificationsProps;

      setNotifications((prev) => [...prev, newNotification]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 7000);
    },
    []
  );

  return (
    <NotificationContext.Provider value={{ renderNotification }}>
      {children}
      <div ref={notificationWrapper} />
      {notificationWrapper?.current &&
        notifications.map((notification) =>
          ReactDOM.createPortal(
            <FlashMessage
              key={notification.message}
              message={notification.message}
              variant={notification.variant}
            />,
            notificationWrapper.current || document.body
          )
        )}
    </NotificationContext.Provider>
  );
};

const useNotification = () => useContext(NotificationContext);

export { NotificationProvider, useNotification };
