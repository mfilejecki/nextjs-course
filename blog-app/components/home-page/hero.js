import React from "react";
import Image from "next/image";

import styles from "./hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/femboy.jpg"
          alt="An image of femboy."
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Marcel</h1>
      <p>I blog about not important stuff.</p>
    </section>
  );
};

export default Hero;
