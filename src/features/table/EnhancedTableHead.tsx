import React from 'react';
import {Checkbox, TableCell, TableHead, TableRow} from "@mui/material";

interface HeadCell {
    disablePadding: boolean;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        numeric: true,
        disablePadding: false,
        label: 'Status',
    },
    {
        numeric: true,
        disablePadding: false,
        label: 'Delivery Date',
    },
    {
        numeric: true,
        disablePadding: false,
        label: 'Currency',
    },
    {
        numeric: true,
        disablePadding: false,
        label: 'Volume',
    },
    {
        numeric: true,
        disablePadding: false,
        label: 'Qty',
    },
    {
        numeric: true,
        disablePadding: false,
        label: 'Sum',
    },
    {
        numeric: true,
        disablePadding: false,
        label: 'Total',
    },
];

interface EnhancedTableHeadProps {
    numSelected: number;
    onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}

const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = ({ onSelectAll, numSelected, rowCount}) => (
    <TableHead>
        <TableRow>
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={onSelectAll}
                    inputProps={{
                        'aria-label': 'select all desserts',
                    }}
                />
            </TableCell>
            {headCells.map((headCell) => (
                <TableCell
                    key={headCell.label}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                >
                    {headCell.label}
                </TableCell>
            ))}
        </TableRow>
    </TableHead>
);

export default EnhancedTableHead;
