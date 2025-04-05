import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  color: 'white',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: 10,
  boxShadow: 24,
  border: '1px solid #42714262',
  backgroundColor: '#1E1D34',
  p: 4,
};

const BuyProduct = ({ id, price }) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleBuyProduct = () => {
    // Simulate purchase logic (no real transaction)
    const total = price * amount;

    console.log('Simulated purchase:');
    console.log('Product ID:', id);
    console.log('Amount:', amount);
    console.log('Total Price:', total);

    // Reset modal
    setOpen(false);
  };

  return (
    <div>
      <div>
        <button
          className="bg-white text-[#154A80] border border-[#154A80] py-2 px-4 rounded-lg lg:text-[20px] md:text-[20px] font-bold text-[16px] w-[100%] my-2 hover:bg-bg-ash hover:text-darkGrey hover:font-bold"
          onClick={handleOpen}
        >
          Buy Product
        </button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
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
              className="bg-[#154A80] text-[white] py-2 px-4 rounded-lg lg:text-[20px] md:text-[20px] font-bold text-[16px] w-[100%] my-4"
              onClick={handleBuyProduct}
            >
              Buy Product &rarr;
            </button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default BuyProduct;
