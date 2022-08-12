import { FC } from "react";
import { Cell } from "../models/Cell";



interface CellProps {
    cell: Cell,
    selected: boolean,
    click: (cell: Cell) => void,
}

enum AvailabilityEnum {
    NOT_AVAILABLE = '',
    AVAILABLE = 'available',
    ATTACK = 'attack',
}


const CellComponent: FC<CellProps> = ({ click, cell, selected = false }) => {
    function getAvailability(): AvailabilityEnum {
        if (cell.available && cell.figure) return AvailabilityEnum.ATTACK;
        if (cell.available && !cell.figure) return AvailabilityEnum.AVAILABLE;
        return AvailabilityEnum.NOT_AVAILABLE;
    }
    const cn = ['cell', cell.color, selected ? 'selected' : ''].join(' ');
    return (
        <div className={cn} onClick={() => click(cell)}>
            <div className={getAvailability()}>

                {cell.figure?.logo && <img src={cell.figure.logo} alt='' />}
            </div>
        </div>
    );
};

export default CellComponent;