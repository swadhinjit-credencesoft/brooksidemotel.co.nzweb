export interface DriveDestination {
  time: string;
  unit: string;
  name: string;
  distance: string;
}

export interface DiningSpot {
  name: string;
  type: string;
  note: string;
}

export const DRIVE_DESTINATIONS: DriveDestination[] = [
  {
    time: "20",
    unit: "min",
    name: "Christchurch International Airport",
    distance: "Approximately 17 km by road",
  },
  {
    time: "25",
    unit: "min",
    name: "Christchurch Central / CBD",
    distance: "Approximately 25 km by road",
  },
  {
    time: "2",
    unit: "min",
    name: "Rolleston Square & Town Centre",
    distance: "Under 2 km — an easy walk or a short drive",
  },
];

export const DINING_HIGHLIGHTS: string[] = [
  "Joe's Garage",
  "Origami",
  "Black & White Coffee Cartel",
  "The Pedal Pusher",
  "The Famous Grouse Hotel",
];
