const Card = ({ No, text, icon }) => {
  return (
    <div>
      <div class="w-64 h-36 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-7 border-2 border-gray-300 rounded-md space-y-3 relative overflow-hidden">
        <div class="w-24 h-24 bg-blue-500 rounded-full absolute -right-5 -top-7">
          <p class="absolute bottom-6 left-7 text-white text-2xl font-garet">
            {No}
          </p>
        </div>
        <div class="fill-violet-500 w-12 h-12 bg-blue-100 rounded shadow-inner text-blue-500">
          <span className="">{icon}</span>
        </div>
        <h1 class="font-medium text-xl font-garet text-gray-800">{text}</h1>
      </div>
    </div>
  );
};

export default Card;
