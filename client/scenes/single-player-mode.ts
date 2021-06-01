import { Color, Engine, Label, Scene } from "excalibur";
import { Ball } from "../actors/ball";
import { Goal } from "../actors/goal";
import { Paddle } from "../actors/paddle";

export class SinglePlayerMode extends Scene {
  private paddle = new Paddle({ x: 200 });
  private ball = new Ball();
  private goal = new Goal({ x: 0 });
  private score = new Label({
    text: "Score: 0",
    x: 1050,
    y: 50,
    fontSize: 30,
    color: Color.White,
  });

  public onInitialize() {
    this.add(this.paddle);
    this.add(this.ball);
    this.add(this.goal);
    this.add(this.score);
  }

  public onPostUpdate(engine: Engine) {
    if (this.goal.score > 0) {
      engine.goToScene("root");
      engine.removeScene("singleplayerstage");
    }

    this.score.text = `Score: ${this.ball.bounceCount}`;
  }
}
