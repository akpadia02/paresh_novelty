"use client";

import { useAllOrders } from "@/lib/firestore/orders/read";
import { db } from "@/lib/firebase";
import { Button, CircularProgress, Select, SelectItem } from "@nextui-org/react";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const STATUS_OPTIONS = ["Pending", "Shipped", "Delivered", "Cancelled"];

export default function Page() {
  const [pageLimit, setPageLimit] = useState(10);
  const [lastSnapDocList, setLastSnapDocList] = useState([]);

  useEffect(() => {
    setLastSnapDocList([]);
  }, [pageLimit]);

  const { data: orders, isLoading, error, lastSnapDoc } = useAllOrders({
    pageLimit,
    lastSnapDoc: lastSnapDocList.length === 0 ? null : lastSnapDocList[lastSnapDocList.length - 1],
  });

  const handleNextPage = () => {
    if (!lastSnapDoc) return;
    setLastSnapDocList((prev) => [...prev, lastSnapDoc]);
  };

  const handlePrevPage = () => {
    setLastSnapDocList((prev) => prev.slice(0, -1));
  };

  return (
    <main className="flex-1 md:pr-5 md:px-0 px-5 rounded-xl flex flex-col gap-4 w-full overflow-x-auto py-6 font-playfair">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Orders</h1>
          <p className="text-xs md:text-sm text-gray-600 mt-1">
            Manage all customer orders and update their status.
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="h-[40vh] flex justify-center items-center">
          <CircularProgress />
        </div>
      )}

      {error && !isLoading && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <>
          <div className="w-full overflow-x-auto rounded-2xl border border-[#FEC4C7] bg-white">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="font-semibold bg-[#fbe1e3] px-3 py-2 rounded-l-xl text-left text-xs md:text-sm">
                    Order ID
                  </th>
                  <th className="font-semibold bg-[#fbe1e3] px-3 py-2 text-left text-xs md:text-sm">
                    User Email
                  </th>
                  <th className="font-semibold bg-[#fbe1e3] px-3 py-2 text-left text-xs md:text-sm">
                    Total
                  </th>
                  <th className="font-semibold bg-[#fbe1e3] px-3 py-2 text-left text-xs md:text-sm">
                    Payment
                  </th>
                  <th className="font-semibold bg-[#fbe1e3] px-3 py-2 text-left text-xs md:text-sm">
                    Status
                  </th>
                  <th className="font-semibold bg-[#fbe1e3] px-3 py-2 text-left text-xs md:text-sm">
                    Date
                  </th>
                  <th className="font-semibold bg-[#fbe1e3] px-3 py-2 rounded-r-xl text-left text-xs md:text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <OrderRow key={order?.id} order={order} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button
              isDisabled={isLoading || lastSnapDocList.length === 0}
              className="bg-[#fbe1e3] font-semibold text-xs md:text-sm"
              onPress={handlePrevPage}
            >
              Previous
            </Button>
            <select
              className="px-4 py-1 rounded-full bg-[#fbe1e3] text-xs md:text-sm"
              name="perpage"
              id="perpage"
              value={pageLimit}
              onChange={(e) => setPageLimit(parseInt(e.target.value, 10))}
            >
              <option value={5}>5 Items</option>
              <option value={10}>10 Items</option>
              <option value={20}>20 Items</option>
            </select>
            <Button
              isDisabled={
                isLoading || !lastSnapDoc || (orders?.length ?? 0) < pageLimit
              }
              className="bg-[#fbe1e3] font-semibold text-xs md:text-sm"
              onPress={handleNextPage}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </main>
  );
}

function OrderRow({ order }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (value) => {
    const newStatus = Array.from(value)[0];
    if (!newStatus || newStatus === order?.status) return;

    setIsUpdating(true);
    try {
      await updateDoc(doc(db, `orders/${order?.id}`), {
        status: newStatus,
      });
      toast.success("Order status updated.");
    } catch (error) {
      toast.error(error?.message ?? "Failed to update status.");
    }
    setIsUpdating(false);
  };

  const orderDate = order?.createdAt ?? order?.timestampCreate;
  const createdAtText = orderDate?.toDate
    ? orderDate.toDate().toLocaleString()
    : "";

  const totalAmount =
    order?.totalAmount ??
    order?.items?.reduce(
      (prev, curr) => prev + (curr?.price ?? 0) * (curr?.quantity ?? 0),
      0
    );

  return (
    <tr>
      <td className="border-y bg-[#fbe1e3] px-3 py-2 border-l rounded-l-lg whitespace-nowrap font-mono text-xs">
        {order?.id}
      </td>
      <td className="border-y bg-[#fbe1e3] px-3 py-2 whitespace-nowrap text-sm">
        {order?.userEmail ?? "-"}
      </td>
      <td className="border-y bg-[#fbe1e3] px-3 py-2 whitespace-nowrap text-sm">
        ₹ {totalAmount}
      </td>
      <td className="border-y bg-[#fbe1e3] px-3 py-2 whitespace-nowrap text-sm">
        {order?.paymentMethod ?? order?.paymentMode}
      </td>
      <td className="border-y bg-[#fbe1e3] px-3 py-2 whitespace-nowrap text-sm">
        <span className="px-2 py-1 rounded-md text-xs bg-white">
          {order?.status ?? "Pending"}
        </span>
      </td>
      <td className="border-y bg-[#fbe1e3] px-3 py-2 whitespace-nowrap text-xs">
        {createdAtText}
      </td>
      <td className="border-y bg-[#fbe1e3] px-3 py-2 border-r rounded-r-lg">
        <Select
          size="sm"
          selectedKeys={new Set([order?.status ?? "Pending"])}
          onSelectionChange={handleStatusChange}
          isDisabled={isUpdating}
          className="max-w-[160px]"
        >
          {STATUS_OPTIONS.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </Select>
      </td>
    </tr>
  );
}

