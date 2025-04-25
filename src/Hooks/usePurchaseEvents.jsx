import { useState, useEffect } from 'react';
import { readOnlyProvider } from "../../constants/providers";
import { getGreenEarnContract } from "../../constants/contract";
import { useQuery } from '@tanstack/react-query';

const usePurchaseEvents = () => {
    const [purchases, setPurchases] = useState([]);

    const purchaseHandler = (buyerAddress, id, quantity) => {
        setPurchases((prevState) => [
            ...prevState,
            { buyerAddress, id, quantity }
        ]);
    };

    // Function to fetch events and manage event listener
    const fetchEvents = async () => {
        const contract = getGreenEarnContract(readOnlyProvider);

        // Subscribe to the event using contract.on
        contract.on("ProductBought", purchaseHandler);

        // Return cleanup function to remove the listener
        return () => {
            contract.removeListener("ProductBought", purchaseHandler);
        };
    };

    // Updated useQuery usage (passing an object with queryKey and queryFn)
    const { error, isLoading } = useQuery({
        queryKey: ['purchase'], // The query key should be an array
        queryFn: fetchEvents, // The function to fetch data (event listener setup)
        refetchOnWindowFocus: false, // Optional configuration to avoid refetching on window focus
    });

    // Cleanup listener when the component is unmounted
    useEffect(() => {
        const cleanup = () => fetchEvents();
        return () => {
            cleanup(); // Cleanup listener
        };
    }, []); // Empty dependency array means it runs only once on mount/unmount

    return { purchases, isLoading, error };
};

export default usePurchaseEvents;