export interface WCProduct {
    $key: string;
    name: string;
    type: string;
    regular_price: string;
    description: string;
    short_description: string;
    categories: Array<{ id: number }>;
    images?: Array<{ src: string, position: number }>;
}