import { useState } from 'react';
import { toast } from 'react-toastify';
import { ErrorDecoder } from 'ethers-decode-error';
import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import { pharosNetwork } from '../connection'
import abi from '../constants/usedyAbi.json';
import useContractInstance from './useContractInstance';

const useCreateProfile = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const { usedyContract } = useContractInstance(true);
  const errorDecoder = ErrorDecoder.create([abi]);

  const createProfile = async (sellerName, location, mail) => {
    if (!address) {
      return toast.error("Please connect your wallet", { position: "top-center" });
    }

    if (Number(chainId) !== Number(pharosNetwork.id)) {
      return toast.error("Wrong network. Connect to Pharos", { position: "top-center" });
    }

    if (!usedyContract) {
      return toast.error("Contract is not ready", { position: "top-center" });
    }

    setIsCreating(true);

    try {
      const tx = await usedyContract.createProfile(sellerName, location, mail);
      const receipt = await tx.wait();

      if (receipt.status) {
        toast.success("Profile creation successful!", { position: "top-center" });
        return true;
      } else {
        toast.error("Profile creation failed", { position: "top-center" });
        return false;
      }
    } catch (err) {
      const decodedError = await errorDecoder.decode(err);
      toast.error(`Failed to create profile - ${decodedError.reason}`, {
        position: "top-center",
      });
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  return { createProfile, isCreating };
};

export default useCreateProfile;
