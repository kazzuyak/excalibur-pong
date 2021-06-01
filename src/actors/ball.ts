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

export class Ball extends Actor {
  constructor(game: Engine) {
    super({
      x: game.drawWidth / 2,
      y: game.drawHeight / 2,
      width: 8,
      height: 8,
      color: Color.White,
      vel: new Vector(400, 0),
      body: new Body({
        collider: new Collider({
          shape: Shape.Box(1000, 2000),
          type: CollisionType.Passive,
        }),
      }),
    });

    this.on("precollision", (oi) => {
      const yDiff = this.pos.y - oi.other.pos.y;

      this.vel.x = -this.vel.x;
      this.vel.y = yDiff * 10;
    });

    game.add(this);
  }

  public onPreUpdate() {
    if (
      (this.pos.x <= 0 && this.vel.x < 0) ||
      (this.pos.x >= 1200 && this.vel.x >= 0)
    ) {
      this.vel.x = -this.vel.x;
    }

    if ((this.pos.y <= 0 && this.vel.y < 0) || (this.pos.y >= 600 && this.vel.y >= 0)) {
      this.vel.y = -this.vel.y;
    }
  }
}
