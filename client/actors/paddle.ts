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
    { x }: { x: number },
  ) {
    super({
      x,
      y: screen.halfY,
      color: Color.Blue,
      body: new Body({
        collider: new Collider({
          shape: Shape.Box(
            screen.screenSize / 20,
            screen.screenSize / 5,
          ),
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
      engine.input.keyboard.isHeld(Input.Keys.W) &&
      this.pos.y -
        (this.screen.screenSize / 10 +
          this.screen.startingY) >=
        0
    ) {
      this.vel.y += delta * (this.screen.screenSize / -50);
    }
    if (
      engine.input.keyboard.isHeld(Input.Keys.S) &&
      this.pos.y +
        (this.screen.screenSize / 10 +
          this.screen.startingY) <=
        engine.drawHeight
    ) {
      this.vel.y += delta * (this.screen.screenSize / 50);
    }
  }

  private onPreCollision(collisionEvent: PreCollisionEvent) {
    if (collisionEvent.other instanceof Ball) {
      const ball = collisionEvent.other;

      if (
        (this.pos.x <
          this.screen.halfX &&
          ball.vel.x < 0) ||
        (this.pos.x >
          this.screen.halfX &&
          ball.vel.x > 0)
      ) {
        ball.bounce(this.pos.y);
      }
    }
  }
}
