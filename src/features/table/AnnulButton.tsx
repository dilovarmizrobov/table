import React from 'react';
import {Box, Button, Popover, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {resetSelected, selectTable} from "./tableSlice";

const AnnulButton = () => {
    const {selected, selectedCount} = useAppSelector(selectTable);
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleApply = async () => {
        try {
            await fetch('/cance', {
                method: 'POST',
                body: JSON.stringify(Object.keys(selected))
            })

            setAnchorEl(null);
            dispatch(resetSelected());
        } catch (error: any) {
            console.log('error');
        }
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button aria-describedby={id} variant="contained" onClick={handleClick} disabled={!Boolean(selectedCount)}>
                Аннулировать
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Box sx={{p: 2}}>
                    <Typography>Вы уверены что хотите аннулировать товар(ы):</Typography>
                    <Typography sx={{ pb: 2 }}>{Object.values(selected).map(item => item.name).join(', ')}</Typography>
                    <Box sx={{display: 'flex'}} justifyContent='right'>
                        <Button onClick={handleClose} size='small'>Отклонить</Button>
                        <Button onClick={handleApply} size='small' autoFocus>
                            Применить
                        </Button>
                    </Box>
                </Box>
            </Popover>
        </div>
    );
};

export default AnnulButton;
