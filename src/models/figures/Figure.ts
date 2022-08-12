import { Colors } from "../Colors";
import logo from '../../assets/black-king.png';
import { Cell } from "../Cell";

export enum FigureNames {
    FIGURE = 'фигура',
    KING = 'король',
    KNIGHT = 'конь',
    PAWN = 'пешка',
    QUEEN = 'ферзь',
    ROOK = 'ладья',
    BISHOP = 'слон',
}

export class Figure {
    public logo: string | null = null; // string?
    public name: FigureNames = FigureNames.FIGURE;
    public id: number = this.cell.id; // Math.random()?

    constructor(
        public color: Colors,
        public cell: Cell,
    ) { this.cell.figure = this }

    public canMove(target: Cell): boolean {
        if (target.figure?.color === this.color) return false;
        if (target.figure?.name === FigureNames.KING) return false;
        return true;
    }

    public moveFigure(target: Cell): void {

    }
}