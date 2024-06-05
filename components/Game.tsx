import { ownedGame } from "stapil";

export function joinWidth(join: string, left: string, right: string): string {
  if (left == "") {
    return right;
  }
  if (right == "") {
    return left;
  }

  if (left.endsWith(join)) {
    if (right.startsWith(join)) {
      return left + right.substring(join.length);
    }
    return left + right;
  } else {
    if (right.startsWith(join)) {
      return left + right;
    }
    return left + join + right;
  }
}

function playtime_to_string(time: number): string {
  let hours: string = "";
  let minutes: string = "";
  if (time === 0) {
    return "";
  }

  if (time >= 60) {
    const numHours: number = Math.floor(time / 60);
    hours = `${numHours} hour${numHours == 1 ? "" : "s"}`;
  }
  const numMinutes: number = time % 60;
  minutes = `${numMinutes} minute${numMinutes == 1 ? "" : "s"}`;

  return joinWidth(", ", hours, minutes);
}

interface GameProps {
  game: ownedGame;
}

export function Game({ game }: GameProps) {
  const s = playtime_to_string(game.playtime_forever);
  return (
    <div>
      <h2 class="text-2xl">{game.name}</h2>
      <img
        src={`https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`}
      />
      <p>{s !== "" ? `Playtime: ${s}` : ""}</p>
      <hr></hr>
    </div>
  );
}
