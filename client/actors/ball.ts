import {
  Actor,
  Body,
  Collider,
  CollisionType,
  Color,
  Shape,
  Vector,
} from "excalibur";
import { ScreenInformation } from "../entities/screen-information";

export class Ball extends Actor {
  private radius: number;
  private readonly startingRadius: number;
  private visualEffectDuration = 0;
  public bounceCount = 0;
  public bouncesLeft = 0;
  public bouncesRight = 0;
  public bouncesUp = 0;
  public bouncesDown = 0;

  constructor(private readonly screen: ScreenInformation) {
    super({
      x: screen.halfX,
      y: screen.halfY,
      color: Color.White,
      vel: new Vector(screen.screenSize / 100, screen.screenSize / 2),
      body: new Body({
        collider: new Collider({
          shape: Shape.Circle(screen.screenSize / 200),
          type: CollisionType.Passive,
        }),
      }),
    });

    this.startingRadius = screen.screenSize / 200;
    this.radius = this.startingRadius;
  }

  public onPostUpdate(_engine: ex.Engine, delta: number) {
    if (this.visualEffectDuration > 0) {
      this.visualEffectDuration -= delta;
      if (this.visualEffectDuration <= 0) {
        this.color = Color.White;
      }
    }

    if (this.pos.x <= this.screen.startingX && this.vel.x < 0) {
      this.vel.x *= -1;
      this.bouncesLeft += 1;
    }

    if (this.pos.x >= this.screen.endingX && this.vel.x >= 0) {
      this.vel.x *= -1;
      this.bouncesRight += 1;
    }

    if (this.pos.y <= this.screen.startingY && this.vel.y < 0) {
      this.vel.y *= -1;
      this.bouncesUp += 1;
    }

    if (this.pos.y >= this.screen.endingY && this.vel.y >= 0) {
      this.vel.y *= -1;
      this.bouncesDown += 1;
    }
  }

  public bounce(objectX: number) {
    this.bounceCount += 1;

    const xDiff = this.pos.x - objectX;
    this.vel.x = xDiff * 4;
    this.vel.y *= -1;

    if (this.vel.y > this.screen.screenSize * -3) {
      this.vel.y *= 1.1;
    }

    if (this.radius > this.startingRadius / 4) {
      this.radius *= 0.9;
      this.body.collider.shape = Shape.Circle(this.radius);
    }

    this.color = Color.Cyan;
    this.visualEffectDuration = 100;
  }
}
