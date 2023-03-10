import React from "react";
import EventItem from "./event-item";

const EventList = (props) => {
  const { items } = props;
  return (
    <ul>
      {items.map((event) => (
        <EventItem
          key={event.id}
          title={event.title}
          image={event.image}
          location={event.location}
          date={event.date}
          id={event.id}
        />
      ))}
    </ul>
  );
};

export default EventList;
