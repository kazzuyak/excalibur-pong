import {
  Actor,
  Body,
  Collider,
  CollisionType,
  Color,
  Engine,
  Input,
  PreCollisionEvent,
  Shape,
} from "excalibur";
import { ScreenInformation } from "../entities/screen-information";
import { Ball } from "./ball";

export class Paddle extends Actor {
  constructor(
    private readonly screen: ScreenInformation,
    parameters: { y: number },
  ) {
    super({
      y: parameters.y,
      x: screen.halfX,
      color: Color.Blue,
      body: new Body({
        collider: new Collider({
          shape: Shape.Box(screen.screenSize / 5, screen.screenSize / 20),
          type: CollisionType.Fixed,
        }),
      }),
    });

    this.on("precollision", this.onPreCollision);
  }

  public onPostUpdate(engine: Engine, delta: number) {
    this.vel.y = 0;
    this.vel.x = 0;

    if (
      engine.input.keyboard.isHeld(Input.Keys.A) &&
      this.pos.x - this.screen.screenSize / 10 >= this.screen.startingX
    ) {
      this.vel.x += delta * (this.screen.screenSize / -50);
    }
    if (
      engine.input.keyboard.isHeld(Input.Keys.D) &&
      this.pos.x + this.screen.screenSize / 10 <= this.screen.endingX
    ) {
      this.vel.x += delta * (this.screen.screenSize / 50);
    }
  }

  private onPreCollision(collisionEvent: PreCollisionEvent) {
    if (collisionEvent.other instanceof Ball) {
      const ball = collisionEvent.other;

      if (
        (this.pos.y < this.screen.halfY && ball.vel.y < 0) ||
        (this.pos.y > this.screen.halfY && ball.vel.y > 0)
      ) {
        ball.bounce(this.pos.x);
      }
    }
  }
}
