import { defineRoute } from "$fresh/server.ts";
import { stapil } from "../index.tsx";
import SortedGames from "../../islands/SteamGames.tsx";

export default defineRoute(async (_, ctx) => {
  const { name } = ctx.params;
  let player = { steamid: name };

  if (isNaN(parseInt(name))) {
    player = await stapil.User.resolveVanityURL(name);
  }

  const ownedgames = await stapil.Player.getOwnedGames(player.steamid, true);
  return (
    <div class="max-w-screen-md mx-auto">
      <h1 class="text-4xl font-bold">{name} - games</h1>
      <SortedGames games={ownedgames.games} />
    </div>
  );
});
