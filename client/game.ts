import { Color, Engine } from "excalibur";
import { SinglePlayerButton } from "./screen-elements/single-player-button";
import { SinglePlayerMode } from "./scenes/single-player-mode";

const engine = new Engine({
  width: 1200,
  height: 600,
  backgroundColor: Color.Black,
  antialiasing: false,
});

const button = new SinglePlayerButton();

button.on("pointerup", () => {
  engine.addScene("singleplayerstage", new SinglePlayerMode(engine));
  engine.goToScene("singleplayerstage");
});

engine.add(button);

engine.start();
