import React, { useRef } from "react";

import styles from "./contact-form.module.css";

const ContactForm = () => {
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const messageInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" ref={emailInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" ref={nameInputRef} />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="message">Your Message</label>
          <textarea id="message" rows={5} cols={30} ref={messageInputRef} />
        </div>
        <div className={styles.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
