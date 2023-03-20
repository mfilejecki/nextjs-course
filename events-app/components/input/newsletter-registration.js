import React, { useRef } from "react";
import { emailSchema } from "../../validations/NewsletterValidation";
import styles from "./newsletter-registration.module.css";

const NewsletterRegistration = () => {
  const emailInputRef = useRef();
  const registrationHandler = async (event) => {
    event.preventDefault();
    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current.value;
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
      .then((response) => response.json())
      .then((data) => console.log(data));
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
