import React from 'react';
import {alpha, InputAdornment, SvgIcon, TextField, Toolbar, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {queryChange, selectTable} from "./tableSlice";

const EnhancedTableToolbar = () => {
    const dispatch = useAppDispatch();
    const {query, selectedCount} = useAppSelector(selectTable);
    const numSelected = selectedCount;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Products
                    </Typography>
                    <TextField
                        sx={{width: 300}}
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SvgIcon
                                        fontSize="small"
                                        color="action"
                                    >
                                        <SearchIcon/>
                                    </SvgIcon>
                                </InputAdornment>
                            )
                        }}
                        onChange={(event) => dispatch(queryChange(event.target.value))}
                        placeholder="Поиск"
                        value={query}
                        variant="outlined"
                    />
                </>
            )}
        </Toolbar>
    );
}

export default EnhancedTableToolbar;
