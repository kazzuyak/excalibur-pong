import { Color, Engine, Label, Scene } from "excalibur";
import { TwoPI } from "excalibur/dist/Util/Util";
import { Ball } from "../actors/ball";
import { Paddle } from "../actors/paddle";
import { Wall } from "../actors/wall";
import { ScreenInformation } from "../entities/screen-information";
import { Button } from "../html-ui/button";

export class LocalMultiPlayerMode extends Scene {
  private ball!: Ball;
  private downPaddle!: Paddle;
  private topPaddle!: Paddle;
  private topScoreLabel!: Label;
  private downScoreLabel!: Label;
  private screen!: ScreenInformation;
  private playAgainButton?: Button;
  private goBackButton?: Button;
  private downScoreCount = 0;
  private topScoreCount = 0;

  public onInitialize(engine: Engine) {
    this.screen = new ScreenInformation(engine);

    this.ball = new Ball(this.screen);

    this.downPaddle = new Paddle(this.screen, {
      y: this.screen.endingY - this.screen.screenSize / 20,
    });
    this.topPaddle = new Paddle(this.screen, {
      y: this.screen.startingY + this.screen.screenSize / 20,
    });

    const leftWall = new Wall({
      x: this.screen.startingX,
      y: this.screen.screenSize / 2,
      height: this.screen.screenSize,
      width: this.screen.screenSize / 500,
    });
    const rightWall = new Wall({
      x: this.screen.endingX,
      y: this.screen.screenSize / 2,
      height: this.screen.screenSize,
      width: this.screen.screenSize / 500,
    });
    const middleWall = new Wall({
      y: this.screen.halfY,
      x: this.screen.halfX,
      width: this.screen.screenSize,
      height: this.screen.screenSize / 500,
    });
    const upWall = new Wall({
      y: this.screen.startingY,
      x: this.screen.screenSize / 2,
      width: this.screen.screenSize,
      height: this.screen.screenSize / 500,
    });
    const downWall = new Wall({
      y: this.screen.endingY,
      x: this.screen.screenSize / 2,
      width: this.screen.screenSize,
      height: this.screen.screenSize / 500,
    });

    this.topScoreLabel = new Label({
      text: `Score: ${this.topScoreCount}`,
      x: this.screen.startingX + this.screen.screenSize * 0.05,
      y: this.screen.halfY - this.screen.screenSize * 0.02,
      fontSize: this.screen.screenSize / 35,
      color: Color.White,
      rotation: TwoPI * 0.75
    });

    this.downScoreLabel = new Label({
      text: `Score: ${this.downScoreCount}`,
      x: this.screen.endingX - this.screen.screenSize * 0.05,
      y: this.screen.halfY + this.screen.screenSize * 0.02,
      fontSize: this.screen.screenSize / 35,
      color: Color.White,
      rotation: TwoPI * 0.25
    });

    this.add(this.downPaddle);
    this.add(this.topPaddle);
    this.add(this.ball);
    this.add(this.topScoreLabel);
    this.add(this.downScoreLabel);

    this.add(middleWall);
    this.add(leftWall);
    this.add(upWall);
    this.add(downWall);
    this.add(rightWall);
  }

  public onPostUpdate(engine: Engine) {
    this.topScoreLabel.text = `Score: ${this.topScoreCount}`;
    this.downScoreLabel.text = `Score: ${this.downScoreCount}`;

    if (this.ball.bouncesDown > 0 || this.ball.bouncesUp > 0) {
      this.downScoreCount += this.ball.bouncesUp > 0 ? 1: 0;
      this.topScoreCount += this.ball.bouncesDown > 0 ? 1: 0;

      this.ball.reset();
    }

    if (this.downScoreCount >= 5 || this.topScoreCount >= 5) {
      this.ball.pause();
      this.topPaddle.pause();
      this.downPaddle.pause();

      if (this.playAgainButton === undefined) {
        this.playAgainButton = new Button({
          borderWidth: this.screen.screenSize * 0.001,
          fontSize: this.screen.screenSize * 0.06,
          height: this.screen.screenSize * 0.15,
          width: this.screen.screenSize * 0.65,
          x: this.screen.startingX + this.screen.screenSize * 0.25,
          y: this.screen.startingY + this.screen.screenSize * 0.2,
          text: "Play Again",
          buttonId: "play-again-button",
          divId: "play-again-button-div"
        });
      }

      if (this.goBackButton === undefined) {
        this.goBackButton = new Button({
          borderWidth: this.screen.screenSize * 0.001,
          fontSize: this.screen.screenSize * 0.06,
          height: this.screen.screenSize * 0.15,
          width: this.screen.screenSize * 0.15,
          x: this.screen.startingX + this.screen.screenSize * 0.1,
          y: this.screen.startingY + this.screen.screenSize * 0.2,
          text: "<",
          buttonId: "go-back-button",
          divId: "go-back-button-div"
        });
      }

      if (this.playAgainButton.pressCount > 0) {
        this.playAgainButton?.remove();
        this.goBackButton?.remove();
        engine.goToScene("root");
        engine.removeScene("LocalMultiplayerPlayerMode");
        engine.addScene("LocalMultiplayerPlayerMode", new LocalMultiPlayerMode(engine));
        engine.goToScene("LocalMultiplayerPlayerMode");
      }

      if (this.goBackButton.pressCount > 0) {
        this.playAgainButton?.remove();
        this.goBackButton?.remove();
        engine.goToScene("MainMenu");
        engine.removeScene("LocalMultiplayerPlayerMode");
      }
    }
  }
}
