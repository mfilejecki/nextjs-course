import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { getAllEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

const EventsPage = (props) => {
  const { allEvents } = props;
  const router = useRouter();

  const findEventsDataHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <Fragment>
      <EventsSearch onSearchEvents={findEventsDataHandler} />
      <EventList items={allEvents} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const allEvents = await getAllEvents();
  return {
    props: {
      allEvents,
    },
    revalidate: 60,
  };
};

export default EventsPage;
