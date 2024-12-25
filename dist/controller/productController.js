import ProductModel from '../model/productModel.js';
import { createFactory, getElementById, getAllFactory, deleteElementById } from '../utilities/crudFactory.js';
export const createProductHandler = createFactory(ProductModel, "Product");
export const getProductById = getElementById(ProductModel, "Product");
export const deleteProductById = deleteElementById(ProductModel, "Product");
export const getAllProducts = getAllFactory(ProductModel, "Product");
