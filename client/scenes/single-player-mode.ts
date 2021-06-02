import {
  Color,
  Engine,
  FontStyle,
  Label,
  Scene
} from "excalibur";
import { Ball } from "../actors/ball";
import { Wall } from "../actors/goal";
import { Paddle } from "../actors/paddle";
import { ScreenInformation } from "../entities/screen-information";

export class SinglePlayerMode extends Scene {
  private ball!: Ball;
  private score!: Label;

  public onInitialize(engine: Engine) {
    const screenInformation = new ScreenInformation(engine);

    this.ball = new Ball(screenInformation);

    const paddle = new Paddle(screenInformation, {
      x: screenInformation.minimumScreenSize / 10 + screenInformation.halfExtraX,
    });

    const leftWall = new Wall({
      x: screenInformation.halfExtraX,
      y: screenInformation.minimumScreenSize / 2,
      height: screenInformation.minimumScreenSize,
      width: screenInformation.minimumScreenSize / 1000,
    });
    const rightWall = new Wall({
      x: screenInformation.halfExtraX + screenInformation.minimumScreenSize,
      y: screenInformation.minimumScreenSize / 2,
      height: screenInformation.minimumScreenSize,
      width: screenInformation.minimumScreenSize / 1000,
    });
    const upWall = new Wall({
      y: screenInformation.halfExtraY,
      x: screenInformation.minimumScreenSize / 2,
      width: screenInformation.minimumScreenSize,
      height: screenInformation.minimumScreenSize / 1000,
    });
    const downWall = new Wall({
      y: screenInformation.halfExtraY + screenInformation.minimumScreenSize,
      x: screenInformation.minimumScreenSize / 2,
      width: screenInformation.minimumScreenSize,
      height: screenInformation.minimumScreenSize / 1000,
    });

    this.score = new Label({
      text: "Score: 0",
      x:
        screenInformation.minimumScreenSize * 0.8 +
        screenInformation.halfExtraX,
      y:
        screenInformation.minimumScreenSize / 10 + screenInformation.halfExtraY,
      fontSize: screenInformation.minimumScreenSize / 25,
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
    if (this.ball.bouncesLeft > 0) {
      engine.goToScene("root");
      engine.removeScene("singleplayerstage");
    }

    this.score.text = `Score: ${this.ball.bounceCount}`;
  }
}
