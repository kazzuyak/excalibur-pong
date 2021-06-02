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
    private readonly screenInformation: ScreenInformation,
    { x }: { x: number },
  ) {
    super({
      x,
      y: screenInformation.screenSize / 2 + screenInformation.startingY,
      color: Color.Blue,
      body: new Body({
        collider: new Collider({
          shape: Shape.Box(
            screenInformation.screenSize / 20,
            screenInformation.screenSize / 5,
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
        (this.screenInformation.screenSize / 10 +
          this.screenInformation.startingY) >=
        0
    ) {
      this.vel.y += delta * (this.screenInformation.screenSize / -50);
    }
    if (
      engine.input.keyboard.isHeld(Input.Keys.S) &&
      this.pos.y +
        (this.screenInformation.screenSize / 10 +
          this.screenInformation.startingY) <=
        engine.drawHeight
    ) {
      this.vel.y += delta * (this.screenInformation.screenSize / 50);
    }
  }

  private onPreCollision(collisionEvent: PreCollisionEvent) {
    if (collisionEvent.other instanceof Ball) {
      const ball = collisionEvent.other;

      if (
        (this.pos.x <
          this.screenInformation.screenSize / 2 +
            this.screenInformation.startingX &&
          ball.vel.x < 0) ||
        (this.pos.x >
          this.screenInformation.screenSize / 2 +
            this.screenInformation.startingX &&
          ball.vel.x > 0)
      ) {
        ball.bounce(this.pos.y);
      }
    }
  }
}
