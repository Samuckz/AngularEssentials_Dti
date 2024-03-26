import { Product } from "./product.model";

export interface pageable{
    first: number,
    prev: number | null,
    next: number | null,
    last: number,
    pages: number | null,
    items: number,
    data: Product[]
}