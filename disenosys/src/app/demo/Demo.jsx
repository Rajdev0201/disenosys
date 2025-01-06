"use client"
import React, { useState } from 'react';


const ProductList = () => {
  const [products] = useState([
    { id: 1, name: "Laptop", category: "Electronics", price: 1200 },
    { id: 2, name: "Shoes", category: "Fashion", price: 100 },
    { id: 3, name: "Watch", category: "Accessories", price: 200 },
    { id: 4, name: "Phone", category: "Electronics", price: 800 },
  ]);

  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Name");

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const handleSortChange = (criteria) => {
    setSort(criteria);
  };

  const filteredProducts = products.filter((product) =>
    filter === "All" ? true : product.category === filter
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "Name") return a.name.localeCompare(b.name);
    if (sort === "Price") return a.price - b.price;
    return 0;
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Product List</h1>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        {["All", "Electronics", "Fashion", "Accessories"].map((category) => (
          <button
            key={category}
            onClick={() => handleFilterChange(category)}
            className={`px-4 py-2 rounded-md ${
              filter === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Sort Buttons */}
      <div className="flex gap-4 mb-6">
        {["Name", "Price"].map((criteria) => (
          <button
            key={criteria}
            onClick={() => handleSortChange(criteria)}
            className={`px-4 py-2 rounded-md ${
              sort === criteria
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-green-500 hover:text-white"
            }`}
          >
            Sort by {criteria}
          </button>
        ))}
      </div>

      {/* Product Table */}
      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 bg-white rounded-md shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Category
              </th>
              <th className="border border-gray-300 px-4 py-2 text-right">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr
                key={product.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-blue-100`}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.category}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  ${product.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
