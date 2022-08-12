import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Cell {
    public available: boolean = false;
    public id: number = Math.random();

    constructor(
        public board: Board,
        public readonly x: number,
        public readonly y: number,
        public readonly color: Colors,
        public figure: Figure | null,
    ) { }

    public isEnemy(target: Cell) {
        if (target.figure) return this.figure?.color !== target.figure.color;
        return false;
    }

    public isEmpty(): boolean {
        return this.figure === null;
    }

    public isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) return false;
        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);
        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) return false;
        }
        return true;
    }

    public isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) return false;
        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);
        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.x).isEmpty()) return false;
        }
        return true;
    }

    public isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);
        if (absX !== absY) return false;
        const dy = this.y < target.y ? 1 : -1;
        const dx = this.x < target.x ? 1 : -1;
        for (let i = 1; i < absY; i++) {
            if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) return false;
        }
        return true;
    }

    private setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    public moveFigure(target: Cell) {
        if (this.figure && this.figure.canMove(target)) {
            this.figure.moveFigure(target);
            target.setFigure(this.figure);
            this.figure = null;
        }
    }
}