import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import usePinataUpload from '../Hooks/usePinataUpload';

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

const AddProduct = () => {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showUpload, setShowUpload] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [productName, setProductName] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [error, setError] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseModal = () => setShowForm(false);

  const { uploadToPinata, isUploading } = usePinataUpload();

  const changeHandler = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 1) {
        setError("File size exceeds 1MB. Please choose a smaller file.");
        setSelectedFile(null);
      } else {
        setError("");
        setSelectedFile(file);
        try {
          const uploadedUrl = await uploadToPinata(file);
          setImageUrl(uploadedUrl);
        } catch (error) {
          console.error("File upload failed:", error);
        }
      }
    }
  };


const handleSubmission = async () => {
    try {
      if (!selectedFile) return toast.error("Please select a file first!");

      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        }
      );

      const resData = await res.json();
      setImageUrl(`ipfs://${resData.IpfsHash}`);

      setShowForm(true);
      setShowUpload(false);

      toast.success("Upload Successful", {
        position: "top-center",
      });

    } catch (error) {
      console.log(error);
      toast.error("Upload failed!", {
        position: "top-center",
      });
    }
  };

  const handleAddProduct = () => {
    if (!productName || !imageUrl || !productDesc || !productPrice || !productWeight) {
      return toast.error("All fields are required!");
    }

    // Here you can add logic to store product details locally or send them to a backend
    console.log({
      productName,
      imageUrl,
      productDesc,
      productWeight,
      productPrice
    });

    toast.success("Product Added Successfully!", {
      position: "top-center",
    });

    // Reset form
    setImageUrl("");
    setProductDesc("");
    setProductName("");
    setProductWeight("");
    setProductPrice("");
    setShowForm(false);
  };

  return (
    <div>
      <button 
        className="bg-white text-[#154A80] py-2 px-4 rounded-lg lg:text-[20px] md:text-[20px] font-bold text-[16px] w-[100%] lg:w-[50%] md:w-[50%] my-2 hover:bg-bg-ash hover:text-darkGrey hover:font-bold"
        onClick={handleOpen}
      >
        Add New Products
      </button>

      {showUpload && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, backgroundColor: '#263E59' }}>
            <label className="form-label font-bold text-[20px]">Select a Product Image</label>
            <p>File must not be more than 1MB </p>
            <input type="file" onChange={changeHandler} className='my-4 border border-white rounded p-2 bg-transparent '/>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button 
              className="bg-white text-[#154A80] py-2 px-4 rounded-lg font-bold text-[16px] w-[100%] my-2 hover:bg-bg-ash hover:text-darkGrey hover:font-bold"
              onClick={handleSubmission}
            >
              Submit
            </button>  
          </Box>
        </Modal>
      )}

      {showForm && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='p-8 rounded-lg text-[#0F160F] flex flex-col items-center bg-[#2a2a2a] lg:w-[30%] md:w-[30%] w-[90%] mx-auto'>
            <IoClose className='self-end mb-4 font-bold text-2xl text-white' onClick={handleCloseModal} />

            <input 
              type="text" 
              placeholder='Product Name' 
              className="rounded-lg w-[100%] text-white p-4 bg-[#ffffff23] border border-white/50 backdrop-blur-lg mb-4 outline-none" 
              onChange={(e) => setProductName(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder='Image Url' 
              className="rounded-lg w-[100%] text-white border border-white/50 p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" 
              value={imageUrl} 
              readOnly 
            />
            <input 
              type="text" 
              placeholder='Description' 
              className="rounded-lg w-[100%] border text-white border-white/50 p-4 bg-[#ffffff23] backdrop-blur-lg mb-4 outline-none" 
              onChange={(e) => setProductDesc(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder='Quantity' 
              className="text-white rounded-lg w-[100%] p-4 bg-[#ffffff23] border border-white/50 backdrop-blur-lg mb-4 outline-none" 
              onChange={(e) => setProductWeight(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder='Price' 
              className="text-white rounded-lg w-[100%] p-4 bg-[#ffffff23] border border-white/50 backdrop-blur-lg mb-4 outline-none" 
              onChange={(e) => setProductPrice(e.target.value)} 
            />
            <button 
              className="bg-[#154A80] text-[white] py-2 px-4 rounded-lg lg:text-[20px] md:text-[20px] font-bold text-[16px] w-[100%] my-4" 
              onClick={handleAddProduct}
            >
              List Product &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
