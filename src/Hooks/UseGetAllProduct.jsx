import { useState, useCallback, useEffect } from "react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { ethers } from "ethers";
import useContractInstance from "./useContractInstance"; // Your wrapper to get the GreenEarn contract instance

const useGetAllProduct = () => {
    const [allProduct, setAllProduct] = useState([]);
    const { isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider("eip155");
    const contract = useContractInstance(false); // false = read-only

    const convertIpfsUrl = (url) =>
        url.startsWith("ipfs://")
            ? url.replace("ipfs://", "https://ipfs.io/ipfs/")
            : url;

    const fetchAllProduct = useCallback(async () => {
        try {
            if (!isConnected) return;
            if (!walletProvider) return;

            const res = await contract.useGetAllProduct();
            if (!res || !Array.isArray(res)) return;
            
            const converted = res?.map((item) => ({
                address: item[0] || "",
                name: item[1] || "",
                image: convertIpfsUrl(item[2]) || "",
                location: item[3] || "",
                product: item[4] || "",
                price: item[5] || "",
                weight: item[6] || "",
                sold: item[7] || "",
                inProgress: item[8] || "",
            }));

            setAllProduct((prev) =>
                JSON.stringify(prev) !== JSON.stringify(converted) ? converted : prev
            );
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    }, [isConnected, walletProvider, contract]);

    useEffect(() => {
        fetchAllProduct();

        const filter = {
            address: import.meta.env.VITE_GREENEARN_ADDRESS,
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
