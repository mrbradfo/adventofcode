import { readFile } from "fs";

const bagContains = {
  red: 12,
  green: 13,
  blue: 14,
};

const gamesPossible: number[] = [];

const day2 = async () => {
  readFile("src/day2/input.txt", "utf-8", (error, data) => {
    if (error) {
      throw Error("Unable to read input.txt");
    }
    const lines = data.split("\n");
    lines.forEach((line) => {
      checkRound(line);
    });
    console.log(gamesPossible);
    console.log(
      "total games possible = ",
      gamesPossible.reduce((prev, cur) => prev + cur)
    );
  });
};
day2();

function checkRound(gameString: string) {
  const roundsString = gameString.split(": ")[1];
  const rounds = roundsString.split(";").map((round) => round.trim());

  const gameIdMatch = gameString.match(/Game (\d+)/)?.map((str) => parseInt(str, 10));
  const gameId = gameIdMatch ? gameIdMatch[1] : 0;

  if (
    !rounds.some((round) => {
      const redMatch = round.match(/(\d+)\sred/g)?.map((str) => parseInt(str.split(" ")[0], 10));
      const greenMatch = round
        .match(/(\d+)\sgreen/g)
        ?.map((str) => parseInt(str.split(" ")[0], 10));
      const blueMatch = round.match(/(\d+)\sblue/g)?.map((str) => parseInt(str.split(" ")[0], 10));

      const totalRed = redMatch?.reduce((prev, cur) => prev + cur) || 0;
      const totalGreen = greenMatch?.reduce((prev, cur) => prev + cur) || 0;
      const totalBlue = blueMatch?.reduce((prev, cur) => prev + cur) || 0;

      if (
        totalRed > bagContains.red ||
        totalGreen > bagContains.green ||
        totalBlue > bagContains.blue
      ) {
        return true;
      }
      return false;
    })
  ) {
    gamesPossible.push(gameId);
  }
}
