import { ScreenInformation } from "../entities/screen-information";

export class Button {
  public pressCount = 0;
  private readonly id = this.constructor.name;
  private readonly ui: HTMLElement | null;
  private element!: HTMLElement | null;
  private isWritten = false;

  constructor(
    private screen: ScreenInformation,
    private readonly text: string,
  ) {
    this.ui = document.getElementById("ui");

    this.write();
  }

  public update(screen: ScreenInformation) {
    if (
      screen.halfX !== this.screen.halfX ||
      screen.halfY !== this.screen.halfY
    ) {
      this.screen = screen;
      this.remove();

      this.write();
    }
  }

  public resetCount() {
    this.pressCount = 0;
  }

  public remove() {
    this.element?.remove();
    this.isWritten = false;
  }

  public write() {
    if (this.isWritten || this.ui === null) {
      return;
    }

    this.ui.innerHTML += `
      <button
      id=${this.id}
      style="
        height: ${this.screen.screenSize * 0.15}px;
        width: ${this.screen.screenSize * 0.8}px;
        left: ${this.screen.startingX + this.screen.screenSize * 0.1}px;
        top: ${this.screen.startingY + this.screen.screenSize * 0.15}px;
        border-color: white;
        position: absolute;
        color: white;
        cursor: pointer;
        background-color: transparent;
        border-width: ${this.screen.screenSize * 0.01}px;
        font-size: ${this.screen.screenSize * 0.06}px;
        font-family: 'Times New Roman', Times, serif;
        touch-action: none;
      ">
        ${this.text}
      </button>`;

    this.element = document.getElementById(this.id);

    if (this.element === null) {
      return;
    }

    this.element.addEventListener(
      "pointerup",
      () => {
        this.pressCount += 1;
      }
    );

    this.isWritten = true;
  }
}
