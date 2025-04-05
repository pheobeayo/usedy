import { useEffect, useState } from 'react';
import plastics from "../assets/plastics.svg";
import LoadingSpinner from '../components/Loader/LoadingSpinner';


const MarketplaceHome = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        // data fetching
        setTimeout(() => {
            setProducts([
                { id: 1, name: "Plastics", image: plastics, weight: 10, location: "City A", price: 100 },
                { id: 2, name: "Plastics", image: plastics, weight: 5, location: "City B", price: 50 },
                { id: 3, name: "Plastics", image: plastics, weight: 8, location: "City C", price: 80 }
            ]);
            setIsLoading(false);
        }, 1000);
    }, []);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className='container mx-auto py-12 px-4'>
            {isLoading ? (
               <div className='text-black'><LoadingSpinner /> Loading...</div>
            ) : (
                <>
                    <div className='flex flex-wrap justify-between'>
                        {displayedProducts.map((product) => (
                            <div key={product.id} className='lg:w-[32%] md:w-[32%] w-[100%] p-4 border text-[#0F160F] border-[#0F160F]/20 rounded-lg mb-4 shadow-lg'>
                                <img src={product.image} alt={product.name} className='w-[100%] h-[237px] object-cover object-center rounded-lg' />
                                <h3 className='font-bold mt-4 lg:text-[20px] md:text-[20px] text-[18px] capitalise font-titiliumweb'>{product.name}</h3>
                                <p className='flex justify-between my-4'>Quantity:<span>{product.weight} </span> </p>
                                <p className='flex justify-between my-4'>Seller &apos;s location <span> {product.location} </span></p>
                                <p className='flex justify-between my-4 font-bold'>Price: <span>{product.price} AMB </span></p>
                                <button className='my-4 border w-[100%] py-2 px-4 border-[#154A80] bg-white text-[#154A80] rounded-lg'>View details</button>
                            </div>
                        ))}
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                        <span className='mx-4'>{currentPage}</span>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={startIndex + itemsPerPage >= products.length}>Next</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default MarketplaceHome;
