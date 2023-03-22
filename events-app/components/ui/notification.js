import { useContext } from "react";

import NotificationContext from "../../store/notification-context";

import styles from "./notification.module.css";

const Notification = (props) => {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  let statusStyles = "";

  if (status === "success") {
    statusStyles = styles.success;
  }

  if (status === "error") {
    statusStyles = styles.error;
  }

  if (status === "pending") {
    statusStyles = styles.pending;
  }

  const activeStyles = `${styles.notification} ${statusStyles}`;

  return (
    <div className={activeStyles} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
