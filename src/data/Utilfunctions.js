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
    value: 40,
    label: "40",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 60,
    label: "60",
  },
  {
    value: 70,
    label: "70",
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

export const getArray = (len) => {
  const temp = [];
  for (var i = 0; i < len; i++) {
    const test = getRndInteger(1, 70);
    temp.push(test);
  }
  return temp;
};
