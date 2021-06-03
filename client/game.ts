import { Color, DisplayMode, Engine } from "excalibur";
import { MainMenu } from "./scenes/main-menu";

const engine = new Engine({
  backgroundColor: Color.Black,
  antialiasing: true,
  displayMode: DisplayMode.FullScreen,
});

const mainMenu = new MainMenu(engine);

engine.addScene("MainMenu", mainMenu);
engine.goToScene("MainMenu");

engine.start();
