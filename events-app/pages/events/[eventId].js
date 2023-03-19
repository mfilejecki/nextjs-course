import React, { Fragment } from "react";
import { getAllEvents, getEventById } from "../../helpers/api-utils";
import EventSummary from "../../components/event-details/event-summary";
import EventLogistics from "../../components/event-details/event-logistics";
import EventContent from "../../components/event-details/event-content";
import ErrorAlert from "../../components/ui/error-alert";

const EventDetailPage = (props) => {
  const { selectedEvent } = props;

  return (
    <Fragment>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        date={selectedEvent.date}
        address={selectedEvent.location}
        image={selectedEvent.image}
        imageAlt={selectedEvent.title}
      />
      <EventContent>
        <p>{selectedEvent.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;
  const selectedEvent = await getEventById(eventId);

  return {
    props: {
      selectedEvent,
    },
  };
};

export const getStaticPaths = async () => {
  const allEvents = await getAllEvents();

  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: false,
  };
};

export default EventDetailPage;
