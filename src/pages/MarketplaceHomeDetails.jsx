import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import glass from "../assets/glass.svg";
import LoadingSpinner from '../components/Loader/LoadingSpinner';

const MarketplaceHomeDetails = () => {
    const { id } = useParams();
    const [transaction, setTransaction] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        
        const mockProducts = [
            {  id: '1', name: 'Product A', price: '100', weight: '5', location: 'NYC', image: glass, address: "0x1234567890123456789012345678901234567890" },
            {  id: '1', name: 'Product A', price: '100', weight: '5', location: 'NYC', image: glass, address: "0x9876543210987654321098765432109876543210" }
        ];
        const foundTransaction = mockProducts.find(data => data.id === id);
        setTransaction(foundTransaction);
    }, [id]);

    const truncateAddress = (address) => {
        if (!address) return '';
        return `${address.slice(0, 20)}...`;
    };

    return (
        <main>
            {transaction ? (
                <div className='w-[95%] mx-auto p-8'>
                    <h2 className='lg:text-[28px] md:text-[28px] text-[18px] text-[#0F160F] font-bold mb-2'>Product Details</h2>
                    <section className='flex lg:flex-row md:flex-row flex-col justify-between'>
                        <div className='lg:w-[45%] md:w-[45%] w-[100%]'>
                            <img src={transaction.image} alt={transaction.name} className='rounded-lg w-[100%]' />
                        </div>
                        <div className='text-[#0F160F] lg:w-[52%] md:w-[52%] w-[100%]'>
                            <h3 className='font-bold mt-4 lg:mt-0 md:mt-0 lg:text-[24px] md:text-[24px] text-[20px]'>{transaction.name}</h3>
                            <p className='mb-4 font-bold text-[#015C28] lg:text-[24px] md:text-[24px] text-[20px]'>{transaction.price} AMB (per unit of measure)</p>
                            <p className='flex justify-between my-4'>Quantity available: <span>{transaction.weight}</span></p>
                            <p className='flex justify-between my-4'>Seller's location: <span>{transaction.location}</span></p>
                            <p className='flex justify-between my-4'>Seller's wallet address: <span>{truncateAddress(transaction.address)}</span></p>
                            <button className='bg-[#015C28] w-[100%] py-2 text-white mb-4' onClick={() => setShowModal(true)}>Edit information</button>
                            <button className='bg-white w-[100%] py-2 text-[#154A80] border border-[#154A80] mb-4' onClick={() => setShowModal(true)}>Add Comment</button>
                            <p>Kindly drop a comment upon receipt of your products. <a href="#" className='text-[#154A80] font-bold'>Learn More</a></p>
                        </div>
                    </section>
                </div>
            ) : (
                <div><LoadingSpinner/> </div>
            )} 
            {showModal && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'>
                    <div className='bg-white p-8 rounded-lg text-[#0F160F] flex flex-col items-center'>
                        <IoClose className='self-end mb-4 font-bold text-2xl' onClick={() => setShowModal(false)} />
                        <p className='mb-4'>Kindly connect your wallet to proceed</p>
                    </div>         
                </div>
            )}
        </main>
    );
}

export default MarketplaceHomeDetails;
