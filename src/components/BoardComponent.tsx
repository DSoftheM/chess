import { userInfo } from "os";
import React, { FC, useState } from "react";
import { useEffect } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import CellComponent from "./CellComponent";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
}


const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    const click = (cell: Cell): void => {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            setSelectedCell(null);
        } else {
            setSelectedCell(cell);
        }
    };
    const isSelected = (cell: Cell): boolean => selectedCell?.x === cell.x && selectedCell?.y === cell.y;
    const highlightCells = () => {
        board.highlightCells(selectedCell);
        updateBoard();
    };
    const updateBoard = () => {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    };

    useEffect(() => {
        highlightCells();
    }, [selectedCell]);

    return (
        <div className="board">
            {board.cells.map((row, index) =>
                <React.Fragment key={index}>
                    {row.map(cell =>
                        <CellComponent
                            click={click}
                            cell={cell}
                            key={cell.id}
                            selected={isSelected(cell)} />
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default BoardComponent;
