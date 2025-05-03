import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useState, useCallback, useEffect } from "react";
import useContractInstance from "./useContractInstance";
import { ethers } from "ethers";

const useGetSeller = () => {
  const [allSeller, setAllSeller] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sellerCount, setSellerCount] = useState(0);

  const contract = useContractInstance(false); // read-only
  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");

  const fetchAllSeller = useCallback(async () => {
    if (!contract || !walletProvider) return;

    setLoading(true);
    try {
      const sellers = await contract.getallSeller();

      if (!Array.isArray(sellers)) return;

      const mapped = sellers.map((item) => ({
        address: item[0],
        id: item[1],
        name: item[2],
        location: item[3],
        mail: item[4],
        product: item[5],
        weight: item[6],
        payment: item[7],
      }));

      setAllSeller((prev) =>
        JSON.stringify(prev) !== JSON.stringify(mapped) ? mapped : prev
      );
      setSellerCount(mapped.length);
      setError(null);
    } catch (err) {
      console.error("Error fetching sellers:", err);
      setError("Failed to load seller data");
    } finally {
      setLoading(false);
    }
  }, [contract, walletProvider]);

  useEffect(() => {
    if (!isConnected) return;

    fetchAllSeller();

    const filter = {
      address: import.meta.env.VITE_USEDY_ADDRESS,
      topics: [ethers.id("ProfileCreated(address,string,uint)")],
    };

    const provider = new ethers.WebSocketProvider(
      import.meta.env.VITE_WSS_RPC_PROVIDER
    );

    provider.on(filter, fetchAllSeller);

    return () => {
      provider.off(filter, fetchAllSeller);
    };
  }, [isConnected, fetchAllSeller]);

  return {
    allSeller,
    loading,
    error,
    sellerCount,
  };
};

export default useGetSeller;
