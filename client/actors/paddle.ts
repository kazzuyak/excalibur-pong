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
      y: screenInformation.minimumScreenSize / 2 + screenInformation.halfExtraY,
      color: Color.Blue,
      body: new Body({
        collider: new Collider({
          shape: Shape.Box(
            screenInformation.minimumScreenSize / 20,
            screenInformation.minimumScreenSize / 5,
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
        (this.screenInformation.minimumScreenSize / 10 +
          this.screenInformation.halfExtraY) >=
        0
    ) {
      this.vel.y += delta * (this.screenInformation.minimumScreenSize / -50);
    }
    if (
      engine.input.keyboard.isHeld(Input.Keys.S) &&
      this.pos.y +
        (this.screenInformation.minimumScreenSize / 10 +
          this.screenInformation.halfExtraY) <=
        engine.drawHeight
    ) {
      this.vel.y += delta * (this.screenInformation.minimumScreenSize / 50);
    }
  }

  private onPreCollision(collisionEvent: PreCollisionEvent) {
    if (collisionEvent.other instanceof Ball) {
      const ball = collisionEvent.other;

      if (
        (this.pos.x <
          this.screenInformation.minimumScreenSize / 2 +
            this.screenInformation.halfExtraX &&
          ball.vel.x < 0) ||
        (this.pos.x >
          this.screenInformation.minimumScreenSize / 2 +
            this.screenInformation.halfExtraX &&
          ball.vel.x > 0)
      ) {
        ball.bounce(this.pos.y);
      }
    }
  }
}
