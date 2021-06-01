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
import { getSmallestDraw } from "../helper/engine-helper";
import { Ball } from "./ball";

export class Paddle extends Actor {
  private screenSize: number;

  constructor(engine: Engine, { x }: { x: number }) {
    super({
      x,
      y: getSmallestDraw(engine) / 2,
      color: Color.Blue,
      body: new Body({
        collider: new Collider({
          shape: Shape.Box(
            getSmallestDraw(engine) / 20,
            getSmallestDraw(engine) / 5,
          ),
          type: CollisionType.Fixed,
        }),
      }),
    });

    this.screenSize = getSmallestDraw(engine);
    this.on("precollision", this.onPreCollision);
  }

  public onPostUpdate(engine: Engine, delta: number) {
    this.vel.y = 0;
    this.vel.x = 0;

    if (engine.input.keyboard.isHeld(Input.Keys.W) && this.pos.y - (this.screenSize / 10) >= 0) {
      this.vel.y += delta * (this.screenSize / -50);
    }
    if (
      engine.input.keyboard.isHeld(Input.Keys.S) &&
      this.pos.y + (this.screenSize / 10) <= engine.drawHeight
    ) {
      this.vel.y += delta * (this.screenSize / 50);
    }
  }

  private onPreCollision(collisionEvent: PreCollisionEvent) {
    if (collisionEvent.other instanceof Ball) {
      const ball = collisionEvent.other;

      if (
        (this.pos.x < (this.screenSize / 2) && ball.vel.x < 0) ||
        (this.pos.x > (this.screenSize / 2) && ball.vel.x > 0)
      ) {
        ball.bounce(this.pos.y);
      }
    }
  }
}
