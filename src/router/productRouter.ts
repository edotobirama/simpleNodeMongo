import Router from 'express'
import {createProductHandler,getProductById,deleteProductById,getAllProducts} from '../controller/productController.js'
import {checkInput} from '../utilities/crudFactory.js'
const ProductRouter = Router()

ProductRouter.get('/', getAllProducts)

ProductRouter.get('/:productId', getProductById)

ProductRouter.delete('/:productId', deleteProductById)

ProductRouter.post('/', checkInput, createProductHandler)

export default ProductRouter