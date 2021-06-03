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

  constructor(private readonly screenInformation: ScreenInformation) {
    super({
      x: screenInformation.halfX,
      y: screenInformation.halfY,
      color: Color.White,
      vel: new Vector(
        screenInformation.screenSize / -2,
        screenInformation.screenSize / 100,
      ),
      body: new Body({
        collider: new Collider({
          shape: Shape.Circle(screenInformation.screenSize / 200),
          type: CollisionType.Passive,
        }),
      }),
    });

    this.startingRadius = screenInformation.screenSize / 200
    this.radius = this.startingRadius;
  }

  public onPostUpdate(_engine: ex.Engine, delta: number) {
    if (this.visualEffectDuration > 0) {
      this.visualEffectDuration -= delta;
      if (this.visualEffectDuration <= 0) {
        this.color = Color.White;
      }
    }

    if (this.pos.x <= this.screenInformation.startingX && this.vel.x < 0) {
      this.vel.x *= -1;
      this.bouncesLeft += 1;
    }

    if (
      this.pos.x >=
        this.screenInformation.endingX &&
      this.vel.x >= 0
    ) {
      this.vel.x *= -1;
      this.bouncesRight += 1;
    }

    if (this.pos.y <= this.screenInformation.startingY && this.vel.y < 0) {
      this.vel.y *= -1;
      this.bouncesUp += 1;
    }

    if (
      this.pos.y >=
        this.screenInformation.endingY &&
      this.vel.y >= 0
    ) {
      this.vel.y *= -1;
      this.bouncesDown += 1;
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

    if (this.radius > (this.startingRadius / 4)) {
      this.radius *= 0.9;
      this.body.collider.shape = Shape.Circle(this.radius);
    }

    this.color = Color.Cyan;
    this.visualEffectDuration = 100;
  }
}
