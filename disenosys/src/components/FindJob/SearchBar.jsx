const SearchBar = () => {
    return (
      <div className="grid grid-cols-12 gap-2 p-4 bg-white shadow-md rounded-md">
        <div className="col-span-12 sm:col-span-6 lg:col-span-11">
        <input
          type="text"
          placeholder="Search by Job title, Position, Keyword..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-sm"
        />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-1">
        <button className="bg-blue-400 text-white px-3 py-2 text-base rounded-md hover:bg-blue-700">
          Find Job
        </button>
        </div>
      </div>
    );
  };
  
  export default SearchBar;
  