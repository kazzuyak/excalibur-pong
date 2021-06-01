import { Color, Engine, Label, Scene, ScreenElement } from "excalibur";
import { Ball } from "../actors/ball";
import { Goal } from "../actors/goal";
import { Paddle } from "../actors/paddle";
import { getSmallestDraw } from "../helper/engine-helper";

export class SinglePlayerMode extends Scene {
  private paddle!: Paddle;
  private ball!: Ball;
  private goal!: Goal;
  private score!: Label;

  public onInitialize(engine: Engine) {
    const screenSize = getSmallestDraw(engine);

    this.paddle = new Paddle(engine, { x: screenSize / 5 });
    this.ball = new Ball(engine);
    this.goal = new Goal(engine, { x: 0 });
    this.score = new Label({
      text: "Score: 0",
      x: screenSize * 0.8,
      y: screenSize / 10,
      fontSize: screenSize / 25,
      color: Color.White,
    });

    this.add(this.paddle);
    this.add(this.ball);
    this.add(this.goal);
    this.add(this.score);
    this.add(new ScreenElement({
      width: screenSize / 100,
      height: screenSize,
      x: screenSize,
      color: Color.White
    }))
  }

  public onPostUpdate(engine: Engine) {
    if (this.goal.score > 0) {
      engine.goToScene("root");
      engine.removeScene("singleplayerstage");
    }

    this.score.text = `Score: ${this.ball.bounceCount}`;
  }
}
