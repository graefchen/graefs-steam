import { ownedGame } from "stapil";
import { Game } from "../components/Game.tsx";
import { useRef, useState } from "preact/hooks";

interface SortedGamesProps {
  games: ownedGame[];
}

export default function SortedGames({ games }: SortedGamesProps) {
  const [my_games, setGames] = useState(games.sort((a, b) => {
    return (a.name != undefined && b.name != undefined &&
        a.name.toLowerCase() > b.name.toLowerCase())
      ? 1
      : -1;
  }));
  const inputRef = useRef<HTMLInputElement | null>(null);

  const sortName = () => {
    let copy = [...my_games];
    copy = copy.sort((a, b) => {
      return (a.name != undefined && b.name != undefined &&
          a.name.toLowerCase() > b.name.toLowerCase())
        ? 1
        : -1;
    });

    setGames(copy);
  };

  const sortPlaytime = () => {
    let copy = [...my_games];
    copy = copy.sort((a, b) => {
      return (a.name != undefined && b.name != undefined &&
          a.playtime_forever <= b.playtime_forever)
        ? 1
        : -1;
    });

    setGames(copy);
  };

  const searchGame = () => {
    let copy = [...games];
    if (inputRef.current?.value === "") {
      setGames(games);
    } else {
      copy = copy.filter((e) => {
        if (inputRef.current?.value && e.name) {
          return e.name.toLowerCase().includes(
            inputRef.current.value.toLowerCase(),
          );
        }
      });
      setGames(copy);
    }
  };

  return (
    <>
      <button class="border-2 border-black p-2" onMouseDown={sortName}>
        Sort Name
      </button>
      <button class="border-2 border-black p-2" onMouseDown={sortPlaytime}>
        Sort Playtime
      </button>
      <input
        id="search"
        name="search"
        type="search"
        ref={inputRef}
        placeholder="Search for a game..."
        class="border-2 border-black p-2"
        onInput={searchGame}
      >
      </input>
      {my_games.map((element) => <Game game={element} />)}
    </>
  );
}
