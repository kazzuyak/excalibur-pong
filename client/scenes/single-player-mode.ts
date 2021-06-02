import { Color, Engine, Label, Scene, ScreenElement } from "excalibur";
import { Ball } from "../actors/ball";
import { Goal } from "../actors/goal";
import { Paddle } from "../actors/paddle";
import { ScreenInformation } from "../entities/screen-information";

export class SinglePlayerMode extends Scene {
  private paddle!: Paddle;
  private ball!: Ball;
  private goal!: Goal;
  private score!: Label;

  public onInitialize(engine: Engine) {
    const screenInformation = new ScreenInformation(engine);

    this.paddle = new Paddle(screenInformation, {
      x: (screenInformation.minimumScreenSize / 5) + screenInformation.halfExtraX,
    });
    this.ball = new Ball(screenInformation);
    this.goal = new Goal(screenInformation, { x: screenInformation.halfExtraX });
    this.score = new Label({
      text: "Score: 0",
      x: (screenInformation.minimumScreenSize * 0.8) + screenInformation.halfExtraX,
      y: (screenInformation.minimumScreenSize / 10) + screenInformation.halfExtraY,
      fontSize: screenInformation.minimumScreenSize / 25,
      color: Color.White,
    });

    this.add(this.paddle);
    this.add(this.ball);
    this.add(this.goal);
    this.add(this.score);
    this.add(
      new ScreenElement({
        width: screenInformation.minimumScreenSize / 100,
        height: screenInformation.minimumScreenSize,
        x: screenInformation.minimumScreenSize + screenInformation.halfExtraX,
        color: Color.White,
      }),
    );
  }

  public onPostUpdate(engine: Engine) {
    if (this.goal.score > 0) {
      engine.goToScene("root");
      engine.removeScene("singleplayerstage");
    }

    this.score.text = `Score: ${this.ball.bounceCount}`;
  }
}
