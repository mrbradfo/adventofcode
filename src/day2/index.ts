import { readFile } from "fs";

const bagContains = {
  red: 12,
  green: 13,
  blue: 14,
};

const gamesPossible: number[] = [];
const roundPowers: number[] = [];

const day2 = async () => {
  readFile("src/day2/input.txt", "utf-8", (error, data) => {
    if (error) {
      throw Error("Unable to read input.txt");
    }
    const lines = data.split("\n");
    lines.forEach((line) => {
      findPossibleGames(line);
      roundPowers.push(findMinimumCubesForGame(line));
    });
    console.log("*** PART 1 ***");
    console.log(
      "total games possible = ",
      gamesPossible.reduce((prev, cur) => prev + cur)
    );

    console.log("*** PART 2 ***");
    console.log(
      "combined round powers = ",
      roundPowers.reduce((p, c) => p + c)
    );
  });
};
day2();

// part 1
// find ID's of the possible games.
// what is the sum of the IDs of those games?
function findPossibleGames(gameString: string) {
  const { rounds, gameId } = parseGameInfo(gameString);

  if (
    !rounds.some((round) => {
      const { redCubes, greenCubes, blueCubes } = getCubeColors(round);
      const totalRed = redCubes?.reduce((prev, cur) => prev + cur) || 0;
      const totalGreen = greenCubes?.reduce((prev, cur) => prev + cur) || 0;
      const totalBlue = blueCubes?.reduce((prev, cur) => prev + cur) || 0;

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

// part 2
// what is the fewest number of cubes of each color
// that could have been in the bag to make the game possible?
function findMinimumCubesForGame(gameString: string) {
  const { rounds } = parseGameInfo(gameString);
  let redRoundMax = 0;
  let greenRoundMax = 0;
  let blueRoundMax = 0;
  rounds.forEach((round, index) => {
    const { redCubes, greenCubes, blueCubes } = getCubeColors(round);
    const totalRed = redCubes?.reduce((prev, cur) => prev + cur) || 0;
    const totalGreen = greenCubes?.reduce((prev, cur) => prev + cur) || 0;
    const totalBlue = blueCubes?.reduce((prev, cur) => prev + cur) || 0;
    if (totalRed > redRoundMax) {
      redRoundMax = totalRed;
    }
    if (totalGreen > greenRoundMax) {
      greenRoundMax = totalGreen;
    }
    if (totalBlue > blueRoundMax) {
      blueRoundMax = totalBlue;
    }
  });

  return getPower([redRoundMax, greenRoundMax, blueRoundMax]);
}

function parseGameInfo(gameString: string) {
  const roundsString = gameString.split(": ")[1];
  const rounds = roundsString.split(";").map((round) => round.trim());
  const gameIdMatch = gameString.match(/Game (\d+)/)?.map((str) => parseInt(str, 10));
  const gameId = gameIdMatch ? gameIdMatch[1] : 0;
  return {
    rounds,
    gameId,
  };
}

function getCubeColors(round: string) {
  const redCubes = round.match(/(\d+)\sred/g)?.map((str) => parseInt(str.split(" ")[0], 10));
  const greenCubes = round.match(/(\d+)\sgreen/g)?.map((str) => parseInt(str.split(" ")[0], 10));
  const blueCubes = round.match(/(\d+)\sblue/g)?.map((str) => parseInt(str.split(" ")[0], 10));
  return { redCubes, greenCubes, blueCubes };
}

function getPower(roundMinimum: number[]) {
  return roundMinimum.reduce((prev, cur) => prev * cur);
}
