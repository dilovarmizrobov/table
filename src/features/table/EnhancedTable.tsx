import React, {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {ProductInterface, selectAll, selectOne, selectTable, setLoading, setProducts} from "./tableSlice";
import {
    Box, Checkbox, Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableRow, Typography,
} from "@mui/material";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import {fetchDocument} from "./tableAPI";
import LoadingTableBody from "./LoadingTableBody";
import AnnulButton from "./AnnulButton";

const queryFilter = (rows: ProductInterface[], query: string) => {
    return rows.filter(prod => prod.name.includes(query))
};

const calculateTotalVolume = (rows: ProductInterface[]) => {
    let total = 0;

    for (let i = 0; i < rows.length; i++) {
        total += rows[i].volume;
    }

    return total;
}

const calculateTotalQty = (rows: ProductInterface[]) => {
    let total = 0;

    for (let i = 0; i < rows.length; i++) {
        total += rows[i].qty;
    }

    return total;
}

export default function EnhancedTable() {
    const dispatch = useAppDispatch();
    const {products, loading, query, selected, selectedCount} = useAppSelector(selectTable);
    const rows = useMemo(() => queryFilter(products, query), [products, query]);
    const totalVolume = useMemo(() => calculateTotalVolume(rows), [rows]);
    const totalQty = useMemo(() => calculateTotalQty(rows), [rows]);

    useEffect(() => {
        (async () => {
            try {
                dispatch(setLoading(true));
                const products1 = await fetchDocument('/documents1');
                const products2 = await fetchDocument('/documents2');

                dispatch(setProducts([...products1.data, ...products2.data]))
            } catch (error: any) {
                console.log('error');
            } finally {
                dispatch(setLoading(false));
            }
        })()
    }, [dispatch]);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2}}>
                <EnhancedTableToolbar/>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            numSelected={selectedCount}
                            onSelectAll={(e) => dispatch(selectAll({checked: e.target.checked, rows}))}
                            rowCount={rows.length}
                        />
                        {
                            rows.length > 0 ? (
                                <TableBody>
                                    {rows.map((row, index) => {
                                        const isItemSelected = Boolean(selected[row.id]);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={() => dispatch(selectOne(row))}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={labelId}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.status}</TableCell>
                                                <TableCell align="right">{row.delivery_date}</TableCell>
                                                <TableCell align="right">{row.currency}</TableCell>
                                                <TableCell align="right">{row.volume}</TableCell>
                                                <TableCell align="right">{row.qty}</TableCell>
                                                <TableCell align="right">{row.sum}</TableCell>
                                                <TableCell align="right">{Math.round(row.qty * row.sum)}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            ) : <LoadingTableBody loading={loading}/>
                        }
                    </Table>
                </TableContainer>
                <Box sx={{p: 2}}>
                    <Box sx={{display: 'flex', mb: 2}}>
                        <Typography sx={{mr: 2}}>Общий обьем: {totalVolume}</Typography>
                        <Typography>Общее количество: {totalQty}</Typography>
                    </Box>
                    <AnnulButton/>
                </Box>
            </Paper>
        </Box>
    );
}

