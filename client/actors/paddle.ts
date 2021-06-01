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
import { Ball } from "./ball";

export class Paddle extends Actor {
  constructor({ x }: { x: number }) {
    super({
      x,
      y: 300,
      color: Color.Blue,
      body: new Body({
        collider: new Collider({
          shape: Shape.Box(30, 100),
          type: CollisionType.Fixed,
        }),
      }),
    });

    this.on("precollision", this.onPreCollision);
  }

  public onPostUpdate(engine: Engine, delta: number) {
    this.vel.y = 0;
    this.vel.x = 0;

    if (engine.input.keyboard.isHeld(Input.Keys.W) && this.pos.y - 50 >= 0) {
      this.vel.y += delta * -25;
    }
    if (
      engine.input.keyboard.isHeld(Input.Keys.S) &&
      this.pos.y + 50 <= engine.drawHeight
    ) {
      this.vel.y += delta * 25;
    }
  }

  private onPreCollision(collisionEvent: PreCollisionEvent) {
    if (collisionEvent.other instanceof Ball) {
      const ball = collisionEvent.other;

      if (
        (this.pos.x < 600 && ball.vel.x < 0) ||
        (this.pos.x > 600 && ball.vel.x > 0)
      ) {
        ball.bounce(this.pos.y);
      }
    }
  }
}
