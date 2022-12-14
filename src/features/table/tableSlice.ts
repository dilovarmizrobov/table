import {StatusEnum} from "../../utils/enums";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface ProductInterface {
    id: string,
    name: string,
    status: StatusEnum,
    delivery_date: string,
    currency: string,
    volume: number,
    qty: number,
    sum: number,
}

interface TableState {
    loading: boolean;
    query: string;
    products: ProductInterface[];
    selected: {[key: string]: {name: string}};
    selectedCount: number;
}

const initialState: TableState = {
    loading: false,
    query: '',
    products: [],
    selected: {},
    selectedCount: 0,
};

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        queryChange: (state, action: PayloadAction<string>) => {
            state.query = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setProducts: (state, action) => {
            state.products = [...state.products, ...action.payload];
            state.products.sort((a, b) => a.delivery_date.localeCompare(b.delivery_date));
        },
        resetSelected: (state) => {
          state.selected = {};
          state.selectedCount = 0;
        },
        selectAll: (state, action: PayloadAction<{checked: boolean, rows: ProductInterface[]}>) => {
            if (action.payload.checked) {
                action.payload.rows.forEach(item => state.selected[item.id] = {name: item.name})
                state.selectedCount = action.payload.rows.length;
            } else {
                state.selected = {};
                state.selectedCount = 0;
            }
        },
        selectOne: (state, action: PayloadAction<ProductInterface>) => {
            if (state.selected[action.payload.id]) {
                delete state.selected[action.payload.id];
                state.selectedCount--;
            } else {
                state.selected[action.payload.id] = {name: action.payload.name}
                state.selectedCount++;
            }
        },
    },
});

export const {queryChange, setLoading, setProducts, selectAll, selectOne, resetSelected} = tableSlice.actions;

export const selectTable = (state: RootState) => state.table;

export default tableSlice.reducer;
