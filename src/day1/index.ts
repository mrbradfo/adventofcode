import { readFile } from "fs";

function isDigit(char: string) {
  return /^\d+$/.test(char);
}

const getFirstDigit = (line: string): number => {
  const digit = line.split("").find((char) => isDigit(char));
  if (digit === undefined) {
    throw new Error("No digit found in the input string");
  }
  return parseInt(digit, 10);
};

const getLastDigit = (line: string): number => {
  const reversedLine = line.split("").reverse().join("");
  return getFirstDigit(reversedLine);
};

// const getLastDigit = (line: string) => {};

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
    console.log("line 1", lines[2]);
    console.log("first digit is ", getFirstDigit(lines[2]));
    console.log("last digit is ", getLastDigit(lines[2]));
    console.log("the sum is ", getFirstDigit(lines[2]) + getLastDigit(lines[2]));

    const total = lines.reduce((prev, current) => {
      const firstDigit = getFirstDigit(line);
      const lastDigit = getLastDigit(line);
      const sum = firstDigit + lastDigit;
      return sum.toString();
    });

    console.log("TOTOAL = ", total);
  });
};

day1();
