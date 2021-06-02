import {
  Actor,
  Body,
  Collider,

  CollisionType,
  Color,
  Shape
} from "excalibur";

export class Wall extends Actor {
  constructor(parameters: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) {
    super({
      x: parameters.x,
      y: parameters.y,
      color: Color.White,
      body: new Body({
        collider: new Collider({
          shape: Shape.Box(parameters.width, parameters.height),
          type: CollisionType.Fixed,
        }),
      }),
    });
  }
}
