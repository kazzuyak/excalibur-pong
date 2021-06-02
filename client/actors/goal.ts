import {
  Actor,
  Body,
  Collider,
  CollisionStartEvent,
  CollisionType,
  Color,
  Shape
} from "excalibur";
import { ScreenInformation } from "../entities/screen-information";
import { Ball } from "./ball";

export class Goal extends Actor {
  public score = 0;
  private visualEffectDuration = 0;
  private readonly onGoalCallback?: Function;

  constructor(screenInformation: ScreenInformation, { x, onGoalCallback }: { x: number; onGoalCallback?: Function }) {
    super({
      x,
      y: screenInformation.minimumScreenSize / 2,
      color: Color.Blue,
      body: new Body({
        collider: new Collider({
          shape: Shape.Box(screenInformation.minimumScreenSize / 100, screenInformation.minimumScreenSize),
          type: CollisionType.Fixed,
        }),
      }),
    });

    this.onGoalCallback = onGoalCallback;
    this.on("collisionstart", this.onCollisionStart);
  }

  public onPostUpdate(_engine: ex.Engine, delta: number) {
    if (this.visualEffectDuration > 0) {
      this.visualEffectDuration -= delta;

      if (this.visualEffectDuration <= 0) {
        this.color = Color.Blue;
      }
    }
  }

  private onCollisionStart(collisionEvent: CollisionStartEvent) {
    if (collisionEvent.other instanceof Ball) {
      this.score += 1;

      this.visualEffectDuration = 100;
      this.color = Color.Red;
    }

    this.onGoalCallback && this.onGoalCallback();
  }
}
