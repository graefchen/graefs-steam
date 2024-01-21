import { ownedGame } from "stapil";

export function Game(props: { game: ownedGame }) {
  return (
    <div>
      <h2 class="text-2xl">{props.game.name}</h2>
      <img src={`https://cdn.akamai.steamstatic.com/steam/apps/${props.game.appid}/header.jpg`}/>
      <p>Playtime: {props.game.playtime_forever} minutes</p>
      <hr></hr>
    </div>
  )
}