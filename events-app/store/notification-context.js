import { createContext, useState, useEffect } from "react";
const initialState = {
  notification: null,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
};

const NotificationContext = createContext(initialState);
export const NotificationContextProvider = (props) => {
  const [activeNotification, setActiveNotification] = useState();

  const showNotificationHandler = (notificationData) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status == "success" ||
        activeNotification.status == "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
