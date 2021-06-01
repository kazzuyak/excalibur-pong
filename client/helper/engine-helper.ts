import { Engine } from "excalibur";

export const getSmallestDraw = (engine: Engine) =>
engine.drawHeight < engine.drawWidth ? engine.drawHeight : engine.drawWidth;