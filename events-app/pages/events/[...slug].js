import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";

const FilteredEventsPage = () => {
  const router = useRouter();
  console.log(router.query.slug);
  const filteredData = router.query.slug;

  if (!filteredData) {
    return <p className="center">Loading ...</p>;
  }
  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return <p>Invalid filter.</p>;
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter.</p>;
  }
  return (
    <Fragment>
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
