import { Engine } from "excalibur";

export class ScreenInformation {
  public readonly minimumScreenSize: number;
  public readonly extraY: number;
  public readonly halfExtraY: number;
  public readonly extraX: number;
  public readonly halfExtraX: number;

  constructor(engine: Engine) {
    this.minimumScreenSize = engine.drawHeight < engine.drawWidth ? engine.drawHeight : engine.drawWidth;;

    this.extraY = engine.drawHeight - this.minimumScreenSize;
    this.halfExtraY = this.extraY / 2;

    this.extraX = engine.drawWidth - this.minimumScreenSize;
    this.halfExtraX = this.extraX / 2;
  }
}