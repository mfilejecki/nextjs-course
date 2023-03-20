import React, { useState, Fragment } from "react";
import { extractFeedback, buildFeedbackPath } from "../api/feedback";

const FeedbackPage = (props) => {
  const [feedbackData, setfeedbackData] = useState();
  const showFeedbackDetailsHandler = (id) => {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setfeedbackData(data.feedback);
      });
  };

  const { feedbackItems } = props;
  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}{" "}
            <button onClick={showFeedbackDetailsHandler.bind(null, item.id)}>
              Show details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
};

export default FeedbackPage;
