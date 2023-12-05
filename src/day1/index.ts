import { readFile } from "fs";

const spelledNumbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function isDigit(char: string) {
  return /^\d+$/.test(char);
}

function getDigit(line: string, first: boolean): string {
  const matcher =
    /[0-9]|(?=(one))|(?=(two))|(?=(three))|(?=(four))|(?=(five))|(?=(six))|(?=(seven))|(?=(eight))|(?=(nine))/g;
  const matches = line.matchAll(matcher);
  const matchArray = Array.from(matches);
  if (matchArray == null) {
    throw new Error("No digit found in the input string");
  }
  const filtered = matchArray
    .map((match) => match.filter((item) => item !== "" && item !== undefined))
    .flat();

  let foundDigit = first ? filtered[0] : filtered.slice(-1)[0]; // eg 1 or one
  if (!isDigit(foundDigit)) {
    foundDigit = spelledNumbers.findIndex((number) => number === foundDigit).toString();
  }
  return foundDigit;
}

function day1() {
  console.log("******* Day 1 *******");
  readFile("src/day1/input.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const lines = data.split("\n");
    const total = lines.reduce((prev, current, i) => {
      const firstDigit = getDigit(current.toLowerCase(), true);
      const lastDigit = getDigit(current.toLowerCase(), false);
      const number = firstDigit + lastDigit;
      return (parseInt(prev, 10) + parseInt(number, 10)).toString();
    }, "0");

    console.log("TOTOAL = ", total);
  });
}

day1();
