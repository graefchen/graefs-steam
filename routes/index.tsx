import { Stapil, ownedGame, playerStats, playerachievement } from "stapil";
import { load } from "$std/dotenv/mod.ts";
import { Game } from "../components/Game.tsx";
import { Player } from "../../stapil/src/api/Player.ts";

/* Getting the environment variable */
const env = await load();
const steam_key = env["STEAM_KEY"];

export const stapil = new Stapil(steam_key);
const player = await stapil.User.resolveVanityURL("graefchem");

// Potential bad way to get all the games ... lol
// interface stapil_game {
//   appid: number;
//   name?: string;
//   playtime_forever: number;
//   img_icon_url?: string;
//   has_community_visible_stats?: boolean;
//   playtime_windows_forever: number;
//   playtime_mac_forever: number;
//   playtime_linux_forever: number;
//   rtime_last_played: number;
//   content_descriptorids?: number[];
//   playtime_disconnected: number;
//   achivements: playerachievement[];
// }

// async function get_games(games: ownedGame[]) : Promise<stapil_game[]> {
//   const g : stapil_game[] = [];
//   if (games.length == 0) {
//     return [];
//   }
//   for(let i = 0; i < games.length; i++) {
//     if (games.at(i) == undefined) {
//       break;
//     }
//     const og = games[i];
//     const pst = (await stapil.UserStats.getPlayerAchievements(player.steamid, og.appid)).playerstats
//     const achvmt = pst != undefined ? pst.achievements : [];
//     const game: stapil_game = {
//       appid: og.appid,
//       name: og.name,
//       playtime_forever: og.playtime_forever,
//       img_icon_url: og.img_icon_url,
//       has_community_visible_stats: og.has_community_visible_stats,
//       playtime_windows_forever: og.playtime_forever,
//       playtime_mac_forever: og.playtime_mac_forever,
//       playtime_linux_forever: og.playtime_linux_forever,
//       rtime_last_played: og.rtime_last_played,
//       playtime_disconnected: og.playtime_disconnected,
//       achivements: achvmt,
//     }
//     g.push(game);
//   }
//   return g;
// }

export default async function Home() {
  const ownedgames = await stapil.Player.getOwnedGames(player.steamid, true);
  const games = ownedgames.games.sort((a, b) => ((a.name != undefined && b.name != undefined && a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1));
  // const g = get_games(games);
  return (
    <div class="max-w-screen-md mx-auto">
      <h1 class="text-4xl font-bold">Welcome to graefs-steam</h1>
      {
        games.map((element) => (
          <Game game={element}/>
        ))
      }
    </div>
  );
}
