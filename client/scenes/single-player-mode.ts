import { Color, Engine, FontStyle, Label, Scene } from "excalibur";
import { Ball } from "../actors/ball";
import { Paddle } from "../actors/paddle";
import { Wall } from "../actors/wall";
import { ScreenInformation } from "../entities/screen-information";
import { Button } from "../html-ui/button";

export class SinglePlayerMode extends Scene {
  private ball!: Ball;
  private paddle!: Paddle;
  private score!: Label;
  private screen!: ScreenInformation;
  private playAgainButton?: Button;
  private goBackButton?: Button;

  public onInitialize(engine: Engine) {
    this.screen = new ScreenInformation(engine);

    this.ball = new Ball(this.screen);

    this.paddle = new Paddle(this.screen, {
      y: this.screen.endingY - this.screen.screenSize / 20,
    });

    const leftWall = new Wall({
      x: this.screen.startingX,
      y: this.screen.screenSize / 2,
      height: this.screen.screenSize,
      width: this.screen.screenSize / 400,
    });
    const rightWall = new Wall({
      x: this.screen.endingX,
      y: this.screen.screenSize / 2,
      height: this.screen.screenSize,
      width: this.screen.screenSize / 400,
    });
    const upWall = new Wall({
      y: this.screen.startingY,
      x: this.screen.screenSize / 2,
      width: this.screen.screenSize,
      height: this.screen.screenSize / 400,
    });
    const downWall = new Wall({
      y: this.screen.endingY,
      x: this.screen.screenSize / 2,
      width: this.screen.screenSize,
      height: this.screen.screenSize / 400,
    });

    this.score = new Label({
      text: "Score: 0",
      x: this.screen.screenSize * 0.8 + this.screen.startingX,
      y: this.screen.screenSize / 10 + this.screen.startingY,
      fontSize: this.screen.screenSize / 25,
      color: Color.White,
      fontStyle: FontStyle.Italic,
    });

    this.add(this.paddle);
    this.add(this.ball);
    this.add(this.score);

    this.add(leftWall);
    this.add(upWall);
    this.add(downWall);
    this.add(rightWall);
  }

  public onPostUpdate(engine: Engine) {
    this.score.text = `Score: ${this.ball.bounceCount}`;

    if (this.ball.bouncesDown > 0) {
      this.ball.pause();
      this.paddle.pause();

      if (this.playAgainButton === undefined) {
        this.playAgainButton = new Button({
          borderWidth: this.screen.screenSize * 0.003,
          fontSize: this.screen.screenSize * 0.06,
          height: this.screen.screenSize * 0.15,
          width: this.screen.screenSize * 0.65,
          x: this.screen.startingX + this.screen.screenSize * 0.25,
          y: this.screen.startingY + this.screen.screenSize * 0.4,
          text: "Play Again",
          buttonId: "play-again-button",
          divId: "play-again-button-div"
        });
      }

      if (this.goBackButton === undefined) {
        this.goBackButton = new Button({
          borderWidth: this.screen.screenSize * 0.003,
          fontSize: this.screen.screenSize * 0.06,
          height: this.screen.screenSize * 0.15,
          width: this.screen.screenSize * 0.15,
          x: this.screen.startingX + this.screen.screenSize * 0.1,
          y: this.screen.startingY + this.screen.screenSize * 0.4,
          text: "<",
          buttonId: "go-back-button",
          divId: "go-back-button-div"
        });
      }

      if (this.playAgainButton.pressCount > 0) {
        this.playAgainButton?.remove();
        this.goBackButton?.remove();
        engine.goToScene("root");
        engine.removeScene("SinglePlayerMode");
        engine.addScene("SinglePlayerMode", new SinglePlayerMode(engine));
        engine.goToScene("SinglePlayerMode");
      }

      if (this.goBackButton.pressCount > 0) {
        this.playAgainButton?.remove();
        this.goBackButton?.remove();
        engine.goToScene("MainMenu");
        engine.removeScene("SinglePlayerMode");
      }
    }
  }
}
