import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import useContractInstance from "./useContractInstance";

const useGetAllProduct = () => {
  const [allProduct, setAllProduct] = useState([]);
  const contract = useContractInstance(false); 

  const convertIpfsUrl = (url) =>
    url.startsWith("ipfs://")
      ? url.replace("ipfs://", "https://ipfs.io/ipfs/")
      : url;

  const fetchAllProduct = useCallback(async () => {
    if (!contract) return;

    try {
      const res = await contract.getAllproduct();
      if (!Array.isArray(res)) return;

      const converted = res.map((item, index) => ({
        id: index + 1,
        address: item[0],
        name: item[1],
        image: convertIpfsUrl(item[2]),
        location: item[3],
        product: item[4],
        price: item[5],
        weight: item[6],
        sold: item[7],
        inProgress: item[8],
      }));

      setAllProduct(converted);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }, [contract]);

  useEffect(() => {
    fetchAllProduct();

    const filter = {
      address: import.meta.env.VITE_USEDY_ADDRESS,
      topics: [ethers.id("ProductListed(address,string,uint)")],
    };

    const provider = new ethers.WebSocketProvider(import.meta.env.VITE_WSS_RPC_PROVIDER);

    const onProductListed = () => {
      fetchAllProduct();
    };

    provider.on(filter, onProductListed);

    return () => {
      provider.off(filter, onProductListed);
    };
  }, [fetchAllProduct]);

  return allProduct;
};

export default useGetAllProduct;
