import { useMemo } from "react";
import { ethers } from "ethers";
import useSignerorProvider from "./useSignerorProvider";
import usedyAbi from "../constants/usedyAbi.json"; 
import tokenAbi from "../constants/tokenAbi.json"; 

const useContractInstance = (withSigner = false) => {
  const { signer, readOnlyProvider } = useSignerorProvider();

  const providerOrSigner = withSigner ? signer : readOnlyProvider;

  const usedyContract = useMemo(() => {
    if (!providerOrSigner) return null;
    return new ethers.Contract(
      import.meta.env.VITE_USEDY_ADDRESS,
      usedyAbi,
      providerOrSigner
    );
  }, [providerOrSigner]);

  const usedyTokenContract = useMemo(() => {
    if (!providerOrSigner) return null;
    return new ethers.Contract(
      import.meta.env.VITE_USEDYTOKEN_ADDRESS,
      tokenAbi,
      providerOrSigner
    );
  }, [providerOrSigner]);

  return { usedyContract, usedyTokenContract };
};

export default useContractInstance;
