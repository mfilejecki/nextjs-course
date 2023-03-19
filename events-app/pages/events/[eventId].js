import React, { Fragment } from "react";
import Head from "next/head";
import { getFeaturedEvents, getEventById } from "../../helpers/api-utils";
import EventSummary from "../../components/event-details/event-summary";
import EventLogistics from "../../components/event-details/event-logistics";
import EventContent from "../../components/event-details/event-content";

const EventDetailPage = (props) => {
  const { selectedEvent } = props;

  if (!selectedEvent) {
    return (
      <div className="center">
        <p> Loading ...</p>;
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{selectedEvent.title}</title>
        <meta name="description" content={selectedEvent.description} />
      </Head>
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

  if (!selectedEvent) {
    return { notFound: true };
  }

  return {
    props: {
      selectedEvent,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const allEvents = await getFeaturedEvents();

  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default EventDetailPage;
