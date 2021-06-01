import {
  Actor,
  Body,
  Collider,
  CollisionType,
  Color,
  Shape,
  Vector,
} from "excalibur";

const STARTING_RADIUS = 5;

export class Ball extends Actor {
  private radius: number;
  private visualEffectDuration = 0;
  public bounceCount = 0;

  constructor() {
    super({
      x: 1200 / 2,
      y: 600 / 2,
      color: Color.White,
      vel: new Vector(-300, 50),
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
      (this.pos.x <= 0 && this.vel.x < 0) ||
      (this.pos.x >= 1200 && this.vel.x >= 0)
    ) {
      this.vel.x = -this.vel.x;
    }

    if (
      (this.pos.y <= 0 && this.vel.y < 0) ||
      (this.pos.y >= 600 && this.vel.y >= 0)
    ) {
      this.vel.y = -this.vel.y;
    }
  }

  public bounce(objectY: number) {
    this.bounceCount += 1;
    const yDiff = this.pos.y - objectY;

    this.vel.x *= -1;
    this.vel.y = yDiff * 10;

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
