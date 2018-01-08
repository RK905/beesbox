export class Product {

    

    constructor(
        public desc: string, 
        public id: number, 
        public inStock: number,
        public name: string, 
        public unitPrice: number,
        public options?: any[], 
    ) {

        }
}