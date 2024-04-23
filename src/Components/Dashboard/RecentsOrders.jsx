import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { recentOrders } from "../../utils/data"; // Sesuaikan pathnya
import { getPaymentStatus, getStatus } from "../../utils/utils";

const RecentOrder = () => {
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Mengambil data dari recentOrders dan memasukkannya ke state transactions
    setTransactions(recentOrders());
  }, []); // Menambahkan dependensi kosong agar hanya dijalankan sekali saat komponen dimuat

  const sortedData = [...transactions].sort((a, b) => {
    const valueA = a[orderBy];
    const valueB = b[orderBy];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return order === "asc" ? valueA - valueB : valueB - valueA;
    } else if (typeof valueA === "string" && typeof valueB === "string") {
      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      return 0;
    }
  });

  return (
    <div>
      <h1 className="text-[20px] font-bold px-8">Recent Orders</h1>
      <Card className="mt-5 w-full">
        <CardContent className="sm:w-auto">
          <div className="overflow-x-auto p-4">
            <TableContainer component={Paper}>
              <Table aria-label="custom table">
                <TableHead className="text-black">
                  <TableRow className="text-black font-semibold">
                    <TableCell className="text-black ">ID</TableCell>
                    <TableCell>CREATED AT</TableCell>
                    <TableCell>CUSTOMER</TableCell>
                    <TableCell>PAYMENT</TableCell>
                    <TableCell>STATUS</TableCell>
                    <TableCell>TOTAL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.slice(0, 5).map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-blue-500">
                        {transaction.id}
                      </TableCell>
                      <TableCell>{transaction.Date}</TableCell>
                      <TableCell className="text-blue-500 font-bold">
                        {transaction.Customer}
                      </TableCell>
                      <TableCell>
                        {getPaymentStatus(transaction.Payment)}
                      </TableCell>
                      <TableCell>{getStatus(transaction.Status)}</TableCell>
                      <TableCell>{transaction.Total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </CardContent>
        <div className="p-4">
          <Link className="text-blue-400 font-semibold" to={"/venOrders"}>
            View Full Orders
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RecentOrder;
