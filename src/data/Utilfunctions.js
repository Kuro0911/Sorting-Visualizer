export const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 80,
    label: "80",
  },
  {
    value: 90,
    label: "90",
  },
  {
    value: 100,
    label: "100",
  },
];

export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
