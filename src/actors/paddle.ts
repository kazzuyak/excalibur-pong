import { Actor, CollisionType, Color, Engine, Input } from "excalibur";

export class Paddle extends Actor {
  constructor({ game, x }: { game: Engine; x: number }) {
    super({
      x,
      y: game.drawHeight / 2,
      width: 10,
      height: 100,
      color: Color.Blue
    })

    this.body.collider.type = CollisionType.Fixed;

    game.add(this);
  }

  public onPostUpdate(engine: Engine, delta: number) {
    this.vel.y = 0;
    this.vel.x = 0;

    if (engine.input.keyboard.isHeld(Input.Keys.W)) {
      this.vel.y += delta * -25
    }
    if (engine.input.keyboard.isHeld(Input.Keys.S)) {
      this.vel.y += delta * 25
    }
  }
}