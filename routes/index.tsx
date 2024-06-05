import { Stapil } from "stapil";
import { load } from "$std/dotenv/mod.ts";
import { joinWidth } from "../components/Game.tsx";

/* Getting the environment variable */
const env = await load();
const steam_key = env["STEAM_KEY"];
export const stapil = new Stapil(steam_key);

export default async function Home() {
  const sid = (await stapil.User.resolveVanityURL("graefchem")).steamid;
  const friends = await stapil.User.getFriendList(sid);
  let names = `${sid}`;
  friends.friendslist.friends.forEach(async (e) => {
    names = joinWidth(",", names, e.steamid);
  });
  const f = await stapil.User.getPlayerSummaries(names);

  return (
    <div class="max-w-screen-md mx-auto">
      <h1 class="text-4xl font-bold">Welcome to graefs-steam</h1>
      <ul>
        {f.players.map((e) => {
          return (
            <li>
              <a href={`profile/${e.profileurl.split("/").at(4)}`}>
                {e.personaname}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
