import { Color, Engine, FontStyle, Label, Scene } from "excalibur";
import { Ball } from "../actors/ball";
import { Wall } from "../actors/wall";
import { Paddle } from "../actors/paddle";
import { ScreenInformation } from "../entities/screen-information";

export class SinglePlayerMode extends Scene {
  private ball!: Ball;
  private score!: Label;

  public onInitialize(engine: Engine) {
    const screen = new ScreenInformation(engine);

    this.ball = new Ball(screen);

    const paddle = new Paddle(screen, {
      y: screen.endingY - screen.screenSize / 20,
    });

    const leftWall = new Wall({
      x: screen.startingX,
      y: screen.screenSize / 2,
      height: screen.screenSize,
      width: screen.screenSize / 1000,
    });
    const rightWall = new Wall({
      x: screen.endingX,
      y: screen.screenSize / 2,
      height: screen.screenSize,
      width: screen.screenSize / 1000,
    });
    const upWall = new Wall({
      y: screen.startingY,
      x: screen.screenSize / 2,
      width: screen.screenSize,
      height: screen.screenSize / 1000,
    });
    const downWall = new Wall({
      y: screen.endingY,
      x: screen.screenSize / 2,
      width: screen.screenSize,
      height: screen.screenSize / 1000,
    });

    this.score = new Label({
      text: "Score: 0",
      x: screen.screenSize * 0.8 + screen.startingX,
      y: screen.screenSize / 10 + screen.startingY,
      fontSize: screen.screenSize / 25,
      color: Color.White,
      fontStyle: FontStyle.Italic,
    });

    this.add(paddle);
    this.add(this.ball);
    this.add(this.score);

    this.add(leftWall);
    this.add(upWall);
    this.add(downWall);
    this.add(rightWall);
  }

  public onPostUpdate(engine: Engine) {
    if (this.ball.bouncesDown > 0) {
      engine.goToScene("root");
      engine.removeScene("singleplayerstage");
    }

    this.score.text = `Score: ${this.ball.bounceCount}`;
  }
}
