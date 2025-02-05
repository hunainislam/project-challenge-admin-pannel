"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { allproduct } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";

// Updated Interface with missing fields
interface Products {
  _id: string;
  title: string;
  description: string;
  productImage: string;
  price: string;
  tags: string[];
  discountPercentage: number;
  isNew: boolean;
  sold: number;
  profit: number;
}

const TableTwo = () => {
  const [apiProducts, setAPIProducts] = useState<Products[]>([]);
  const [newProduct, setNewProduct] = useState<Products>({
    _id: "",
    title: "",
    description: "",
    productImage: "",
    price: "",
    tags: [],
    discountPercentage: 0,
    isNew: false,
    sold: 0,
    profit: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products: Products[] = await sanityFetch({ query: allproduct });
        setAPIProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setAPIProducts([
      ...apiProducts,
      { ...newProduct, _id: Date.now().toString() },
    ]);
    setNewProduct({
      _id: "",
      title: "",
      description: "",
      productImage: "",
      price: "",
      tags: [],
      discountPercentage: 0,
      isNew: false,
      sold: 0,
      profit: 0,
    });
  };

  const handleRemoveProduct = (id: string) => {
    setAPIProducts(apiProducts.filter((product) => product._id !== id));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Products
        </h4>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Sold</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Profit</p>
        </div>
      </div>

      {/* Table Rows */}
      {apiProducts.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          {/* Product Name & Image */}
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 overflow-hidden rounded-md">
                <Image
                  src={product.productImage}
                  width={60}
                  height={50}
                  alt="Product"
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.title}
              </p>
            </div>
          </div>

          {/* Category */}
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.tags.join(", ")}
            </p>
          </div>

          {/* Price */}
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${product.price}
            </p>
          </div>

          {/* Sold */}
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.sold}</p>
          </div>

          {/* Profit */}
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">${product.profit}</p>
          </div>

          {/* Remove Button */}
          <div className="col-span-1 flex items-center">
            <button
              className="mt-2 text-red-500 hover:text-[#b88e2f]"
              onClick={() => handleRemoveProduct(product._id)}
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                  fill=""
                />
                <path
                  d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                  fill=""
                />
                <path
                  d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                  fill=""
                />
                <path
                  d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                  fill=""
                />
              </svg>
            </button>
          </div>
        </div>
      ))}

      {/* Add Product Form */}
      <div className="space-y-4 border-t border-stroke p-4 dark:border-strokedark">
        <h5 className="text-lg font-medium">Add New Product</h5>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Product title"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
              className="w-full rounded-md border p-2 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Image URL</label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={newProduct.productImage}
              onChange={(e) =>
                setNewProduct({ ...newProduct, productImage: e.target.value })
              }
              className="w-full rounded-md border p-2 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Price ($)</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: e.target.value,
                })
              }
              className="w-full rounded-md border p-2 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Sold Quantity
            </label>
            <input
              type="number"
              placeholder="0"
              value={newProduct.sold}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  sold: Math.max(0, parseInt(e.target.value) || 0),
                })
              }
              className="w-full rounded-md border p-2 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Profit</label>
            <input
              type="number"
              placeholder="0"
              value={newProduct.profit}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  profit: Math.max(0, parseInt(e.target.value) || 0),
                })
              }
              className="w-full rounded-md border p-2 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium">Tags</label>
            <input
              type="text"
              placeholder="tag1, tag2, tag3"
              value={newProduct.tags.join(", ")}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  tags: e.target.value.split(",").map((tag) => tag.trim()),
                })
              }
              className="w-full rounded-md border p-2 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>
        </div>

        <button
          className="rounded-md bg-[#b88e2f] px-6 py-2 text-white transition-colors hover:bg-[#a57d2a]"
          onClick={handleAddProduct}
          disabled={!newProduct.title || !newProduct.price}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default TableTwo;
