import React from "react";
import styles from "./comment-list.module.css";

const CommentList = (props) => {
  const { items } = props;
  return (
    <ul className={styles.comments}>
      {items.map((item) => {
        return (
          <li key={item._id}>
            <p>{item.text}</p>
            <div>
              By <address>{item.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
