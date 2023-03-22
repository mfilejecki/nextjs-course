import React, { useState, useEffect, useContext } from "react";

import NewComment from "./new-comment";
import CommentList from "./comment-list";
import NotificationContext from "../../store/notification-context";

import styles from "./comments.module.css";

const Comments = (props) => {
  const notificationCtx = useContext(NotificationContext);
  const { eventId } = props;

  const [commentsAreLoaded, setCommentsAreLoaded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setCommentsAreLoaded(false);
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setCommentsAreLoaded(true);
        });
    }
  }, [showComments]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = (commentData) => {
    // send data to API
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Adding a new comment.",
      status: "pending",
    });
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
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
          message: "Successfully added a comment.",
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
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && commentsAreLoaded && <CommentList items={comments} />}
      {showComments && !commentsAreLoaded && <p>Loading...</p>}
    </section>
  );
};

export default Comments;
