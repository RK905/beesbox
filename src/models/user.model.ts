import { Product } from '../models/product.model';


export class Setting {

    constructor(
        public gender: string,
        public birthday: string, 
        public partner: boolean
    ) {}
}

export class User {

    constructor(
        public displayName: string,
        public email: string,
        public isAdmin: boolean,
        public userId: number,
        public cart: Product[],
        public userSettings?: Setting
        ) {
            
        }
}