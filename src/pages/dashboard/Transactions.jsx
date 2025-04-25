import React, { useState, useEffect } from "react";
import { useAccount } from "reown/appkit-adapter-ethers";
import { useNavigate } from "react-router-dom";
import useContractInstance from "../../Hooks/useContractInstance";
import useGetSeller from "../../Hooks/useGetSeller";
import UseGetAllProduct from "../../Hooks/UseGetAllProduct";

import ApprovePayment from "../../components/ApprovePayment";
import bgIcon from "../../assets/transaction.png";
import emptyPurchase from "../../assets/order.png";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Transactions = () => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const allSeller = useGetSeller();
  const allProduct = UseGetAllProduct();

  const [value, setValue] = useState("1");
  const [purchase, setPurchase] = useState([]);
  const [approved, setApproved] = useState([]);

  const { usedyContract } = useContractInstance(); // read-only by default

  const userSeller = allSeller.find((data) => data?.address === address);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      if (!usedyContract || !address) return;

      const deploymentBlockNumber = 2710870;

      try {
        const productFilter = usedyContract.filters.ProductBought(address);
        const approveFilter = usedyContract.filters.PaymentApproved(address);

        const [productEvents, approveEvents] = await Promise.all([
          usedyContract.queryFilter(productFilter, deploymentBlockNumber, "latest"),
          usedyContract.queryFilter(approveFilter, deploymentBlockNumber, "latest"),
        ]);

        const convertedProducts = productEvents.map(({ args }) => ({
          address: args[0],
          id: Number(args[1]),
          quantity: Number(args[2]),
        }));

        const convertedApprovals = approveEvents.map(({ args }) => ({
          address: args[0],
          id: Number(args[1]),
          amount: Number(args[2]),
        }));

        setPurchase(convertedProducts);
        setApproved(convertedApprovals);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, [usedyContract, address]);

  return (
    <main className="py-10 px-4 md:px-10">
      <h2 className="text-2xl font-bold mb-6">Transactions</h2>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Purchases" value="1" />
            <Tab label="Approved Payments" value="2" />
          </TabList>
        </Box>

        <TabPanel value="1">
          {purchase?.length ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {purchase.map((item, index) => {
                const product = allProduct.find((p) => p.id === item.id);
                return (
                  <div
                    key={index}
                    className="bg-white shadow rounded-xl p-4 cursor-pointer hover:shadow-md"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <img
                      src={product?.image || bgIcon}
                      alt="product"
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <h3 className="mt-2 font-semibold">{product?.name || "Unknown Product"}</h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center mt-10">
              <img src={emptyPurchase} alt="no purchases" className="mx-auto h-40" />
              <p className="mt-4 text-gray-500">You haven’t made any purchases yet.</p>
            </div>
          )}
        </TabPanel>

        <TabPanel value="2">
          {approved?.length ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {approved.map((item, index) => {
                const product = allProduct.find((p) => p.id === item.id);
                return (
                  <div
                    key={index}
                    className="bg-white shadow rounded-xl p-4"
                  >
                    <img
                      src={product?.image || bgIcon}
                      alt="product"
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <h3 className="mt-2 font-semibold">{product?.name || "Unknown Product"}</h3>
                    <p className="text-sm text-gray-600">Amount: {item.amount}</p>
                    <ApprovePayment productId={item.id} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center mt-10">
              <img src={emptyPurchase} alt="no approvals" className="mx-auto h-40" />
              <p className="mt-4 text-gray-500">No approved payments yet.</p>
            </div>
          )}
        </TabPanel>
      </TabContext>
    </main>
  );
};

export default Transactions;
