import mongoose from 'mongoose';
import Product from '../models/products.js';
export const getproducts = async (req, res) => {
    try {   
        const products=await Product.find({});
        res.status(200).json({success:true,data:products});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProducts= async (req, res) => {
    const { id } = req.params; 

    const productUpdates = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ message: 'Invalid product ID' });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, productUpdates, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image || !product.description) {
        return res.status(400).json({ message: 'Provide Every Credintials' });
    }
    const newProduct=new Product(product);
    try {
        await newProduct.save();
        res.status(200).json({success:true,data:newProduct});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Product deleted successfully' }); 
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};