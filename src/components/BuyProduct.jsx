import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';
import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
// import { pharosNetwork } from '../connection';
import { ethers } from 'ethers';
import useContractInstance from '../Hooks/useContractInstance';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  color: 'white',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: 10,
  boxShadow: 24,
  border: '1px solid #1E1D34',
  backgroundColor: '#1E1D34',
  p: 4,
};

const BuyProduct = ({ id, price }) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const { usedyContract } = useContractInstance(true);

  const handleBuyProduct = async () => {
    if (!address) {
      return toast.error("Please connect your wallet", { position: "top-center" });
    }

    if (Number(chainId) !== Number(pharosNetwork.id)) {
      return toast.error("Wrong network. Connect to Pharos", { position: "top-center" });
    }

    if (!usedyContract) {
      return toast.error("Contract is not ready", { position: "top-center" });
    }

    try {
      const total = ethers.parseUnits(price.toString(), 18) * BigInt(amount);
      const tx = await usedyContract.buyProduct(id, amount, { value: total });
      const receipt = await tx.wait();

      if (receipt.status) {
        toast.success("Product purchase successful!", { position: "top-center" });
      } else {
        toast.error("Product purchase failed", { position: "top-center" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Product purchase failed!", { position: "top-center" });
    } finally {
      setOpen(false);
    }
  };

  return (
    <div>
      <button
        className="bg-white text-[#263E59] border border-[#263E59] py-2 px-4 rounded-lg lg:text-[20px] md:text-[20px] font-bold text-[16px] w-[100%] my-2 hover:bg-bg-ash hover:text-darkGrey hover:font-bold"
        onClick={handleOpen}
      >
        Buy Product
      </button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <input
            type="text"
            placeholder="Product ID"
            value={id}
            readOnly
            className="text-white rounded-lg w-[100%] p-4 bg-[#ffffff23] border border-white/50 backdrop-blur-lg mb-4 outline-none hidden"
          />
          <input
            type="number"
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
            className="text-white rounded-lg w-[100%] p-4 bg-[#ffffff23] border border-white/50 backdrop-blur-lg mb-4 outline-none"
          />
          <button
            className="bg-[#263E59] text-[white] py-2 px-4 rounded-lg lg:text-[20px] md:text-[20px] font-bold text-[16px] w-[100%] my-4"
            onClick={handleBuyProduct}
          >
            Buy Product &rarr;
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default BuyProduct;
