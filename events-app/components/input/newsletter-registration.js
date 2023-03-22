import React, { useRef, useContext } from "react";

import { emailSchema } from "../../validations/NewsletterValidation";
import NotificationContext from "../../store/notification-context";

import styles from "./newsletter-registration.module.css";

const NewsletterRegistration = () => {
  const notificationCtx = useContext(NotificationContext);
  const emailInputRef = useRef();
  const registrationHandler = async (event) => {
    event.preventDefault();
    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current.value;
    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    // optional: validate input
    const isValid = await emailSchema.isValid({ email: enteredEmail });
    if (!isValid) {
      console.log("Email is not valid.");
      return;
    }
    // send valid data to API
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong.");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter.",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong.",
          status: "error",
        });
      });
  };

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
