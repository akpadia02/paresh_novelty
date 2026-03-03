"use client";

import React from "react";
import { useUsers } from "@/lib/firestore/users/read";
import { CircularProgress } from "@nextui-org/react";

export default function Page() {
  const { data: users, error, isLoading } = useUsers();

  return (
    <main className="p-5 flex flex-col gap-4 font-playfair">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold">Customers</h1>
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
        <div className="flex-1 md:pr-5 md:px-0 px-0 rounded-xl flex flex-col gap-3 w-full overflow-x-auto">
          <table className="border-separate border-spacing-y-3 min-w-full">
            <thead>
              <tr>
                <th className="font-semibold border-y bg-[#fbe1e3] px-3 py-2 border-l rounded-l-lg text-left">
                  Sr. No.
                </th>
                <th className="font-semibold border-y bg-[#fbe1e3] px-3 py-2 text-left">
                  Name
                </th>
                <th className="font-semibold border-y bg-[#fbe1e3] px-3 py-2 text-left">
                  Email
                </th>
                <th className="font-semibold border-y bg-[#fbe1e3] px-3 py-2 text-left">
                  Joined On
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => {
                const createdAt =
                  user?.timestampCreate && user.timestampCreate.toDate
                    ? user.timestampCreate.toDate().toLocaleString()
                    : "";

                return (
                  <tr key={user?.uid ?? user?.id ?? index}>
                    <td className="border-y bg-[#fbe1e3] px-3 py-2 border-l rounded-l-lg text-center">
                      {index + 1}
                    </td>
                    <td className="border-y bg-[#fbe1e3] px-3 py-2">
                      {user?.displayName ?? "Customer"}
                    </td>
                    <td className="border-y bg-[#fbe1e3] px-3 py-2">
                      {user?.email ?? "-"}
                    </td>
                    <td className="border-y bg-[#fbe1e3] px-3 py-2 border-r rounded-r-lg text-xs">
                      {createdAt}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

