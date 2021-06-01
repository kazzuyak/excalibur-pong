import { Color, DisplayMode, Engine, Resolution } from "excalibur";
import { Ball } from "./actors/ball";
import { Paddle } from "./actors/paddle";

const game = new Engine({
  width: 1200,
  height: 600,
  backgroundColor: Color.Black
});

new Paddle({game, x: 100 });
new Paddle({game, x: 1100 });
new Ball(game);

game.start();
