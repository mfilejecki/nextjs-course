import React, { useState, useEffect } from "react";
import { contactSchema } from "../../lib/contact-form-util";

import styles from "./contact-form.module.css";

const ContactForm = () => {
  const [isInvalidInput, setIsInvalidInput] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");

  useEffect(() => {
    let timer;
    if (isInvalidInput) {
      timer = setTimeout(() => {
        setIsInvalidInput(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isInvalidInput]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const userInput = {
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage,
    };
    const isValid = await contactSchema.isValid(userInput);

    if (!isValid) {
      setIsInvalidInput(true);
      return;
    }

    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(userInput),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>
      {isInvalidInput && (
        <p>Invalid input, please correct it before submitting again.</p>
      )}
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows={5}
            cols={30}
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
