import {ProductInterface} from "./tableSlice";
import {StatusEnum} from "../../utils/enums";

export const fetchDocument = (url: string) => new Promise<{ data: ProductInterface[], url: string }>(resolve =>
    setTimeout(() => resolve({data: generateProducts(), url: url}), 500)
);

const generateProducts = () => {
    return [
        createProduct('1', 'product', StatusEnum.ACTIVE, '14.12.2022', 'RUB', 305, 67, 4.3),
        createProduct('2', 'product', StatusEnum.ARCHIVE, '13.12.2022','RUB', 452, 51, 4.9),
        createProduct('3', 'product', StatusEnum.ARCHIVE, '12.12.2022','RUB', 262, 24, 6.0),
        createProduct('4', 'product', StatusEnum.ACTIVE,  '11.12.2022','RUB',159, 24, 4.0),
        // createData('5', 'product5', StatusEnum.ARCHIVE, '12.12.2022','RUB', 356, 49, 3.9),
        // createData('6', 'product6', StatusEnum.ACTIVE,  '12.12.2022','RUB',408,  87, 6.5),
        // createData('7', 'product7', StatusEnum.ACTIVE,  '11.12.2022','RUB',237,  37, 4.3),
        // createData('8', 'product8', StatusEnum.ARCHIVE, '11.12.2022','RUB', 375,  94, 0.0),
        // createData('9', 'product9', StatusEnum.ARCHIVE, '11.12.2022','RUB', 518,  65, 7.0),
        // createData('10', 'product10', StatusEnum.ACTIVE,  '10.12.2022','RUB',392,  98, 0.0),
        // createData('11', 'product11', StatusEnum.ACTIVE,  '10.12.2022','RUB',318,  81, 2.0),
        // createData('12', 'product12', StatusEnum.ACTIVE,  '10.12.2022','RUB',360,  9, 37.0),
    ]
}

const createProduct = (
    id: string,
    name: string,
    status: StatusEnum,
    delivery_date: string,
    currency: string,
    volume: number,
    qty: number,
    sum: number,
): ProductInterface => ({
    id: id + (Math.round(Math.random() * 1000)),
    name: name + (Math.round(Math.random() * 1000)),
    status,
    delivery_date,
    currency,
    volume,
    qty,
    sum,
});
