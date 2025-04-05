import { useState, useEffect } from "react";

const UserSellerProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allProduct, setAllProduct] = useState([]);
  const [allSeller, setAllSeller] = useState([]);
  const address = ""; // Placeholder for user address

  useEffect(() => {
    if (allProduct.length > 0 && allSeller.length > 0) {
      setIsLoading(false);
    }
  }, [allProduct, allSeller]);

  const userSeller = allSeller.find((data) => data?.address === address);
  const userProducts = allProduct.filter((info) => info?.address === address);

  return (
    <div>
      <h2 className="font-titiliumweb text-[20px] text-[#0F160F] lg:text-[24px] md:text-[24px] font-[700] mt-2">
        Listed Products
      </h2>
      <div className="flex mb-6 text-[#0F160F] items-center">
        <img
          src="https://img.freepik.com/free-psd/abstract-background-design_1297-86.jpg"
          alt=""
          className="w-[40px] h-[40px] rounded-full"
        />
        {userSeller ? (
          <p className="ml-4 font-bold">{userSeller.name}</p>
        ) : (
          <p>Unregistered.</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row justify-between flex-wrap md:flex-row">
        {isLoading ? (
          <p>Loading...</p>
        ) : userProducts.length === 0 ? (
          <div className="flex flex-col items-center w-full text-[rgb(15,22,15)]">
            <p>No Product yet!</p>
          </div>
        ) : (
          userProducts.map((info, index) => (
            <div
              key={index}
              className="w-[100%] lg:w-[31%] md:w-[31%] rounded-lg border border-bg-ash/35 bg-bg-gray p-4 mt-6"
            >
              <div className="text-[#0F160F]">
                <img
                  src={info.image}
                  alt=""
                  className="w-[100%] h-[237px] object-cover object-center rounded-lg"
                />
                <h3 className="font-bold mt-4 lg:text-[20px] md:text-[20px] text-[18px] capitalize">
                  {info.name}
                </h3>
                <p className="flex justify-between my-4">
                  Quantity <span>{Number(info.weight)}</span>
                </p>
                <p className="flex justify-between my-4">
                  Seller's location <span>{info.location}</span>
                </p>
                <p className="flex justify-between my-4 font-bold">
                  Price <span>{info.price} AMB</span>
                </p>
                <button className="my-4 border w-[100%] py-2 px-4 border-[#154A80] text-[#154A80] rounded-lg">
                  View details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserSellerProfile;
