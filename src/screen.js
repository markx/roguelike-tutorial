import { TextGrid, Font, Cell } from "overprint";

const Glyphs = {
  EMPTY: Cell(" "),
  PLAYER: Cell("@"),
  MONSTER: Cell("M", "#0C9"),
  LIT: {
    WALL: Cell("#", "#aaa"),
    FLOOR: Cell(".", "#888")
  },
  UNLIT: {
    WALL: Cell("#", "#555"),
    FLOOR: Cell(".", "#333")
  }
}

class Screen {
  constructor(canvas, width, height) {
    this.grid = new TextGrid(canvas, {
      width,
      height,
      font: Font("Menlo", false, 15)
    });
  }

  renderMap(stage) {
    for (let y=0; y < stage.height; y++) {
      for (let x=0; x < stage.width; x++) {
        let tileType = Glyphs.EMPTY;
        if (stage.isVisible(x, y)) {
          tileType = Glyphs.LIT[stage.map[y][x].type];
        } else if (stage.isSeen(x, y)) {
          tileType = Glyphs.UNLIT[stage.map[y][x].type];
        }
        this.grid.writeCell(x, y, tileType);
      }
    }
  }

  renderPlayer(player) {
    this.grid.writeCell(player.x, player.y, Glyphs.PLAYER);
  }

  renderEntities(stage) {
    for (let entity of stage.entities) {
      if (stage.isVisible(entity.x, entity.y)) {
        this.grid.writeCell(entity.x, entity.y, Glyphs.MONSTER)
      }
    }
  }

  render(stage) {
    this.renderMap(stage);
    this.renderEntities(stage);
    this.renderPlayer(stage.player);
    this.grid.render();
  }
}

export default Screen;
