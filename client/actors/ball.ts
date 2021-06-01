import {
  Actor,
  Body,
  Collider,
  CollisionType,
  Color,
  Engine,
  Shape,
  Vector,
} from "excalibur";
import { getSmallestDraw } from "../helper/engine-helper";

const STARTING_RADIUS = 5;

export class Ball extends Actor {
  private radius: number;
  private visualEffectDuration = 0;
  private screenSize: number;
  public bounceCount = 0;

  constructor(engine: Engine) {
    super({
      x: getSmallestDraw(engine) / 2,
      y: getSmallestDraw(engine) / 2,
      color: Color.White,
      vel: new Vector(getSmallestDraw(engine) / -2, getSmallestDraw(engine) / 100),
      body: new Body({
        collider: new Collider({
          shape: Shape.Circle(STARTING_RADIUS),
          type: CollisionType.Passive,
        }),
      }),
    });

    this.screenSize = getSmallestDraw(engine);
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
      (this.pos.x <= 0 && this.vel.x < 0) ||
      (this.pos.x >= this.screenSize && this.vel.x >= 0)
    ) {
      this.vel.x = -this.vel.x;
    }

    if (
      (this.pos.y <= 0 && this.vel.y < 0) ||
      (this.pos.y >= this.screenSize && this.vel.y >= 0)
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
