import { Engine, Scene } from "excalibur";
import { ScreenInformation } from "../entities/screen-information";
import { Button } from "../html-ui/button";
import { SinglePlayerMode } from "./single-player-mode";


export class MainMenu extends Scene {
  private singlePlayerButton!: Button;

  public onInitialize(engine: Engine) {
    const screen = new ScreenInformation(engine);

    this.singlePlayerButton = new Button(screen, "Single Player");
  }

  public onActivate() {
    this.singlePlayerButton.write()
  }

  public onPostUpdate(engine: Engine) {
    const screen = new ScreenInformation(engine);

    this.singlePlayerButton.update(screen);

    if (this.singlePlayerButton.pressCount > 0) {
      this.singlePlayerButton.resetCount();
      engine.addScene("SinglePlayerMode", new SinglePlayerMode(engine));
      engine.goToScene("SinglePlayerMode");
    }
  }

  public onDeactivate() {
    this.singlePlayerButton.remove();
  }
}
