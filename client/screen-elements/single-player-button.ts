import { Color, ScreenElement } from "excalibur";

export class SinglePlayerButton extends ScreenElement {
  constructor() {
    super({
      color: Color.White,
      x: 400,
      y: 150,
      width: 100,
      height: 100
    })
  }
}