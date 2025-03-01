import express from 'express'
import { listProduct, addProduct, removeProduct, singleProduct } from '../controllers/productcontroller.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'

const productRouter = express.Router()

productRouter.post('/add', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 2 }, { name: 'image3', maxCount: 3 }, { name: 'image4', maxCount: 4 }]), addProduct)
productRouter.post('/remove', adminAuth, removeProduct)
productRouter.post('/single', singleProduct)
productRouter.get('/list', listProduct)


export default productRouter