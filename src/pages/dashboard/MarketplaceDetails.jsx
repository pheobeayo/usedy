import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../../components/Banner';
import LoadingSpinner from '../../components/Loader/LoadingSpinner';
import electronic from '../../assets/electronic.svg'
import EditProduct from '../../components/EditProduct';
import BuyProduct from '../../components/BuyProduct';

const MarketplaceDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [allProduct, setAllProduct] = useState([]);
  const address = "";

  useEffect(() => {

    const fetchProducts = async () => {
      const Products = [
        { id: '1', name: 'Product A', price: '100', weight: '5', location: 'NYC', image: electronic, address: '0x1234...' },
        { id: '2', name: 'Product B', price: '200', weight: '10', location: 'LA', image: electronic, address: '0x5678...' }
      ];


      setAllProduct(Products);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (allProduct.length > 0) {
      const foundTransaction = allProduct.find(data => String(data?.id) === id);
      setTransaction(foundTransaction);
    }
  }, [allProduct, id]);

  return (
    <main>
      <Banner />
      {transaction ? (
        <div className='w-[100%] mx-auto'>
          <h2 className='lg:text-[28px] md:text-[28px] text-[20px] text-[#0F160F] font-bold my-6'>Product Details</h2>
          <section className='flex lg:flex-row md:flex-row flex-col justify-between'>
            <div className='lg:w-[45%] md:w-[45%] w-[100%]'>
              <img src={transaction.image} alt='' className='rounded-lg w-[100%]' />
            </div>
            <div className='text-[#0F160F] lg:w-[52%] md:w-[52%] w-[100%]'>
              <h3 className='font-bold mt-4 lg:mt-0 md:mt-0 lg:text-[24px] md:text-[24px] text-[20px] capitalize'>{transaction.name}</h3>
              <p className='font-bold text-[#154A80] lg:text-[24px] md:text-[24px] text-[20px]'>
                {transaction.price} AMB (per unit of measure)
              </p>
              <p className='flex justify-between my-4'>Quantity available: <span>{transaction.weight}</span></p>
              <p className='flex justify-between my-4'>Seller's location: <span>{transaction.location}</span></p>
              {transaction.address === address && (<EditProduct id={id} />)}
              {transaction.address !== address && (<BuyProduct id={id} price={transaction.price} />)}
              <p>Kindly drop a comment upon receipt of your products. <a href='#' className='text-[#154A80] font-bold'>Learn More</a></p>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <LoadingSpinner />
        </div>
      )}
    </main>
  );
};

export default MarketplaceDetails;
