import { useAppKitProvider } from "@reown/appkit/react";
import { useEffect, useMemo, useState } from "react";
import { getProvider, readOnlyProvider, wssProvider } from "../constants/providers";


const useSignerOrProvider = () => {
  const [signer, setSigner] = useState(null);
  const { walletProvider } = useAppKitProvider("eip155");

  const provider = useMemo(() => {
    return walletProvider ? getProvider(walletProvider) : null;
  }, [walletProvider]);

  useEffect(() => {
    const fetchSigner = async () => {
      if (!provider) {
        setSigner(null);
        return;
      }

      try {
        const newSigner = await provider.getSigner();
        if (!signer || newSigner.address !== signer.address) {
          setSigner(newSigner);
        }
      } catch (err) {
        console.error("Failed to get signer:", err);
        setSigner(null);
      }
    };

    fetchSigner();
  }, [provider, signer]);

  return {
    signer,
    provider, 
    readOnlyProvider, 
    wssProvider, 
  };
};

export default useSignerOrProvider;
