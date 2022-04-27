import { db } from "./";
import { Product } from '../models';
import { IProduct } from "../interfaces";

export const getProductBySlug = async (slug: string):Promise<IProduct | null> => {
    await db.connect();
    const product = await Product.findOne({slug}).lean();
    if(!product) return null;
    await db.disconnect();
    return JSON.parse(JSON.stringify(product));
}

interface ProductSlug {
    slug: string;
}

export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
    await db.connect();
    const products = await Product.find().select('slug -_id').lean();
    await db.disconnect();
    return JSON.parse(JSON.stringify(products));
} 

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
    term = term.toString().toLowerCase();
    await db.connect();
    const products = await Product.find({
        $text: { $search: term }
    })
    .select('title images inStock price slug -_id') 
    .lean();
    await db.disconnect();
    return JSON.parse(JSON.stringify(products));
}

export const getAllProducts = async (): Promise<IProduct[]> => {
    await db.connect();
    const products = await Product.find()
    .select('title images slug -_id') 
    .lean();
    await db.disconnect();
    return JSON.parse(JSON.stringify(products));
}