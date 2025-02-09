import Product from '../models/product.models.js';
import mongoose from 'mongoose';

export const getProduct = async (req, res) => {
    try {
        const products = await products.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("error in getting products", error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
export const createProduct = async (req, res) => {
    const product = req.body; //user will send the data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false, message: 'please provide all fields' });
    }
    const newProduct = new product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("error in creating product", error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(404).send('invalid product id');
    };
    
    try {
      const updatedProduct = await product.findOneAndUpdate({ id, product }, { new: true });
      res.status(200).json({ success: true, data: updatedProduct });
     } catch (error) {
        res.status(500).json({ success: false, message: 'product not found' });
      }
    };

    export const deleteProduct = async (req, res) =>{
        const {id} = req.params;
        try {
            await Product.findOneAndDelete(id); 
            res.status(200).json({ success: true, message: 'Product deleted' });
        } catch (error) {
            console.error("error in deleting product", error.message);
            res.status(404).json({ success: false, message: 'product not found' });
        }
        
    };