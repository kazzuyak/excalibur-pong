import { Engine } from "excalibur";

export class ScreenInformation {
  public readonly screenSize: number;
  public readonly extraY: number;
  public readonly startingY: number;
  public readonly extraX: number;
  public readonly startingX: number;
  public readonly endingX: number;

  constructor(engine: Engine) {
    this.screenSize = engine.drawHeight < engine.drawWidth ? engine.drawHeight : engine.drawWidth;;

    this.extraY = engine.drawHeight - this.screenSize;
    this.startingY = this.extraY / 2;

    this.extraX = engine.drawWidth - this.screenSize;
    this.startingX = this.extraX / 2;

    this.endingX = this.screenSize + this.startingX;

  }
}