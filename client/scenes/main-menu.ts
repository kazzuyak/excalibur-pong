import { Engine, Scene } from "excalibur";
import { ScreenInformation } from "../entities/screen-information";
import { Button } from "../html-ui/button";
import { SinglePlayerMode } from "./single-player-mode";


export class MainMenu extends Scene {
  private singlePlayerButton!: Button;

  public onInitialize(engine: Engine) {
    const screen = new ScreenInformation(engine);

    this.singlePlayerButton = new Button(this.singlePlayerButtonOptions(screen));
  }

  public onActivate() {
    this.singlePlayerButton.write()
  }

  public onPostUpdate(engine: Engine) {
    const screen = new ScreenInformation(engine);

    this.singlePlayerButton.update(this.singlePlayerButtonOptions(screen));

    if (this.singlePlayerButton.pressCount > 0) {
      this.singlePlayerButton.resetCount();
      engine.addScene("SinglePlayerMode", new SinglePlayerMode(engine));
      engine.goToScene("SinglePlayerMode");
    }
  }

  public onDeactivate() {
    this.singlePlayerButton.remove();
  }

  private singlePlayerButtonOptions(screen: ScreenInformation) {
    return {
      borderWidth: screen.screenSize * 0.001,
      fontSize: screen.screenSize * 0.06,
      height: screen.screenSize * 0.15,
      width: screen.screenSize * 0.8,
      x: screen.startingX + screen.screenSize * 0.1,
      y: screen.startingY + screen.screenSize * 0.2,
      text: "Single Player",
      buttonId: "single-player-button",
      divId: "single-player-button-div"
    }
  }
}
