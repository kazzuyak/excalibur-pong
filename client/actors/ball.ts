import {
  Actor,
  Body,
  Collider,
  CollisionType,
  Color,

  Shape,
  Vector
} from "excalibur";
import { ScreenInformation } from "../entities/screen-information";

const STARTING_RADIUS = 5;

export class Ball extends Actor {
  private radius: number;
  private visualEffectDuration = 0;
  public bounceCount = 0;

  constructor(private readonly screenInformation: ScreenInformation) {
    super({
      x: (screenInformation.minimumScreenSize / 2) + screenInformation.halfExtraX,
      y: (screenInformation.minimumScreenSize / 2) + screenInformation.halfExtraY,
      color: Color.White,
      vel: new Vector(screenInformation.minimumScreenSize / -2, screenInformation.minimumScreenSize / 100),
      body: new Body({
        collider: new Collider({
          shape: Shape.Circle(STARTING_RADIUS),
          type: CollisionType.Passive,
        }),
      }),
    });

    this.radius = STARTING_RADIUS;
  }

  public onPostUpdate(_engine: ex.Engine, delta: number) {
    if (this.visualEffectDuration > 0) {
      this.visualEffectDuration -= delta;
      if (this.visualEffectDuration <= 0) {
        this.color = Color.White;
      }
    }

    if (
      (this.pos.x <= this.screenInformation.halfExtraX && this.vel.x < 0) ||
      (this.pos.x >= (this.screenInformation.minimumScreenSize + this.screenInformation.halfExtraX)&& this.vel.x >= 0)
    ) {
      this.vel.x = -this.vel.x;
    }

    if (
      (this.pos.y <= this.screenInformation.halfExtraY && this.vel.y < 0) ||
      (this.pos.y >= (this.screenInformation.minimumScreenSize + this.screenInformation.halfExtraY) && this.vel.y >= 0)
    ) {
      this.vel.y = -this.vel.y;
    }
  }

  public bounce(objectY: number) {
    this.bounceCount += 1;

    const yDiff = this.pos.y - objectY;
    this.vel.y = yDiff * 4;
    this.vel.x *= -1;

    if (this.vel.x < 1000) {
      this.vel.x *= 1.1;
    }

    if (this.radius > 1) {
      this.radius *= 0.9;
      this.body.collider.shape = Shape.Circle(this.radius);
    }

    this.color = Color.Cyan;
    this.visualEffectDuration = 100;
  }
}
