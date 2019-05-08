type Location = {
  latitude: number,
  longitude: number,
  time: number,
};

export default async (location: Location) => {
  console.log(location);
  return Promise.resolve();
};
