import { Color, DisplayMode, Engine } from "excalibur";
import { SinglePlayerMode } from "./scenes/single-player-mode";
import { SinglePlayerButton } from "./screen-elements/single-player-button";

const engine = new Engine({
  backgroundColor: Color.Black,
  antialiasing: false,
  displayMode: DisplayMode.FullScreen,
});

const button = new SinglePlayerButton();

button.on("pointerup", () => {
  if (engine.rootScene.isCurrentScene()) {
    engine.addScene("singleplayerstage", new SinglePlayerMode(engine));
    engine.goToScene("singleplayerstage");
  }
});

engine.add(button);

engine.start();
