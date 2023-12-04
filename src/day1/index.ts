import { readFile } from "fs";

function isDigit(char: string) {
  return /^\d+$/.test(char);
}

const getFirstDigit = (line: string): string => {
  const digit = line.split("").find((char) => isDigit(char));
  if (digit === undefined) {
    throw new Error("No digit found in the input string");
  }
  return digit;
};

const getLastDigit = (line: string): string => {
  const reversedLine = line.split("").reverse().join("");
  return getFirstDigit(reversedLine);
};

// combine first digit and last digit
const day1 = () => {
  console.log("******* Day 1 *******");
  // read input file
  readFile("src/day1/input.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // read each line
    const lines = data.split("\n");

    const total = lines.reduce((prev, current, i) => {
      const firstDigit = getFirstDigit(current);
      const lastDigit = getLastDigit(current);
      const sum = firstDigit + lastDigit;
      return (parseInt(prev, 10) + parseInt(sum, 10)).toString();
    }, "0");

    console.log("TOTOAL = ", total);
  });
};

day1();
