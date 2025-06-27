"use client";
import { useState } from "react";

const Filtercard = () => {
  const dataDummy = [
    {
      id: 1,
      name: "Filter 1",
      description: "Description for filter 1",
      ratting: "4.5",
    },
    {
      id: 2,
      name: "Filter 2",
      description: "Description for filter 2",
      ratting: "4.5",
    },
    {
      id: 3,
      name: "Filter 3",
      description: "Description for filter 3",
      ratting: "4.1",
    },
    {
      id: 4,
      name: "Filter 4",
      description: "Description for filter 4",
      ratting: "4.2",
    },
    {
      id: 5,
      name: "Filter 5",
      description: "Description for filter 5",
      ratting: "4.3",
    },
    {
      id: 6,
      name: "Filter 6",
      description: "Description for filter 6",
      ratting: "4.4",
    },
  ];
  const [data, setData] = useState(dataDummy);
  const [fliter, setFilter] = useState("");
  const [cart,setCart] = useState([]);
  console.log(cart)
  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    setFilter(selectedValue);
    const data = dataDummy.filter((item) => item.ratting === selectedValue);
    setData(data);
  };

  const reset = () => {
    setFilter("");
    setData(dataDummy);
  };

  const addtoCart = (item) => {
     if(item){
        const res = dataDummy.find((cartItem) => cartItem.id === item.id);
        console.log(res)
        setCart([...cart,res]); //it combine previous cart and new item
     }
  }
  return (
    <div>
      <div className="flex justify-center items-center mt-6">
        <select
          className="border border-gray-300 rounded-md p-2"
          value={fliter}
          onChange={handleFilterChange}
        >
          <option value="" disabled selected>
            Filter by
          </option>
          <option value="4.5">Ratting 4.5</option>
          <option value="4.4">Ratting 4.4</option>
          <option value="4.3">Ratting 4.3</option>
          <option value="4.2">Ratting 4.2</option>
          <option value="4.1">Ratting 4.1</option>
        </select>
        <button
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={reset}
        >
          Reset
        </button>
        <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md relative">cart <span>{cart?.length || 0}</span></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 font-sans h-auto mx-auto flex justify-center items-center">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-start"
          >
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <p className="text-gray-600 mt-2">{item.ratting}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => addtoCart(item)}
              >Add Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filtercard;
