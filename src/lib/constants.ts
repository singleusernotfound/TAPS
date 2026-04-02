// Edit this file to change the colleges across the entire website!

export const AVAILABLE_CAMPUSES = [
  { name: "IIT Delhi", members: "2,840", active: true },
  { name: "BITS Pilani", members: "1,930", active: true },
  { name: "DU North Campus", members: "4,120", active: true },
  { name: "Manipal University", members: "3,250", active: false },
  { name: "Christ University", members: "2,100", active: false },
  { name: "VIT Vellore", members: "5,400", active: false },
  // Add your local nearby colleges here!
  // Example:
  // { name: "UCLA", members: "5,200", active: true },
  // { name: "NYU", members: "3,100", active: true },
];

// This extracts just the names for the Dropdowns in the Onboarding flow
export const ONBOARDING_COLLEGES = AVAILABLE_CAMPUSES.map(campus => campus.name);
