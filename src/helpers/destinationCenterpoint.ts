export const getCenterLocation = (people: { lat: number; lng: number }[]) => {
  const totalPeople = people.length;
  const totalLatitude = people.reduce((total, person) => total + person.lat, 0);
  const totalLongitude = people.reduce(
    (total, person) => total + person.lng,
    0
  );

  return {
    lat: totalLatitude / totalPeople,
    lng: totalLongitude / totalPeople,
  };
};
