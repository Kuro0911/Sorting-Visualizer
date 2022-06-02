export const marks = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 30,
    label: "30",
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
export const isSorted = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i + 1] <= arr[i]) {
      return false;
    }
  }
  return true;
};
