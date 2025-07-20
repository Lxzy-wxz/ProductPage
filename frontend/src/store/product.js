import { defaultValueTypes } from "framer-motion";
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.image
    ) {
      return { success: false, message: "All fields are required" };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();
    if (res.ok) {
      set((state) => ({ products: [...state.products, data.data] }));
    } else {
      alert(data.message);
    }
    return { success: true, message: "Product created successfully" };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    if (res.ok) {
      set({ products: data.data });
    } else {
      alert(data.message);
    }
  },
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
      return { success: true, message: "Product deleted successfully" };
    } else {
      return { success: false, message: "Error deleting product" };
    }
  },
  updateProduct: async (id, productUpdates) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productUpdates),
    });
    const data = await res.json();
    if (res.ok) {
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? data.data : product
        ),
      }));
      return { success: true, message: "Product updated successfully" };
    } else {
      return { success: false, message: "Error updating product" };
    }
  },
}));
