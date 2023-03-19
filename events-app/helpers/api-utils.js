export const getAllEvents = async () => {
  const response = await fetch(
    "https://react-db887-default-rtdb.europe-west1.firebasedatabase.app/events.json"
  );
  const data = await response.json();
  const allEvents = [];
  for (const key in data) {
    allEvents.push({ ...data[key], id: key });
  }
  return allEvents;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (id) => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
};
