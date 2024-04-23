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
import { MdOutlineArrowDropDown, MdEdit, MdDelete } from "react-icons/md";
import { TbFileExport, TbReload } from "react-icons/tb";
import { FaFileCsv } from "react-icons/fa";
import { ArrowUpward, ArrowDownward, Search } from "@mui/icons-material";
import { getStatusProducts, getStatusResep } from "../../utils/utils";

// Import data produkInovasi
import { produkInovasi } from "../../utils/data"; // Sesuaikan pathnya

const ProductsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [exportOpen, setexportOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [limit, setLimit] = useState(1000); // State untuk menyimpan nilai limit produk yang ditampilkan
  const [orderByOptions, setOrderByOptions] = useState([
    "termurah",
    "termahal",
    "terbaru",
    "terlaris",
    "etalase",
  ]);

  const [selectedOrderBy, setSelectedOrderBy] = useState(""); // Nilai orderby default

  useEffect(() => {
    // Set data produk menggunakan data produkInovasi
    setProducts(produkInovasi);
    setLoading(false);
  }, []);

  const toggleExport = () => {
    setexportOpen(!exportOpen);
  };

  const handleChangeLimit = (event) => {
    setLimit(event.target.value);
  };

  const handleSort = (property) => {
    let orderByValue = property;

    // Jika properti yang di-pass sama dengan orderBy yang sedang digunakan, ubah urutan (asc/desc)
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");

    // Atur orderByValue sesuai dengan nama kolom yang diperlukan untuk API request
    switch (property) {
      case "no":
        orderByValue = "id";
        break;
      case "thumbnail":
        orderByValue = "thumbnail";
        break;
      case "name":
        orderByValue = "name";
        break;
      case "price":
        orderByValue = "price";
        break;
      case "quantity":
        orderByValue = "quantity";
        break;
      case "sku":
        orderByValue = "sku";
        break;
      case "order":
        orderByValue = "order";
        break;
      case "CreatedAt":
        orderByValue = "created_at";
        break;
      case "status":
        orderByValue = "status";
        break;
      default:
        break;
    }

    setOrderBy(orderByValue);
    setLoading(true); // Set loading ke true saat proses fetching data baru
    // getProductsData(); // Ambil produk berdasarkan orderBy yang baru
  };

  const handleOrderByChange = (event) => {
    setSelectedOrderBy(event.target.value);
    setLoading(true); // Set loading to true while fetching new data
    // getProductsData(event.target.value); // Fetch products based on the selected orderby
  };

  const handleReloadClick = () => {
    // getProductsData(); // Fetch products based on
  };

  const filteredData = products.filter((product) => {
    const productName = product.name.toLowerCase();
    const etalaseName = product.category ? product.category.toLowerCase() : "";
    return (
      etalaseName.includes(searchTerm.toLowerCase()) ||
      productName.includes(searchTerm.toLowerCase())
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Fungsi untuk mengubah jumlah baris per halaman
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (rowId) => {
    // deleteProducts(rowId)
    //   .then(() => {
    //     // Perbarui daftar transaksi setelah penghapusan berhasil
    //     setProducts((prevTransactions) =>
    //       prevTransactions.filter((transaction) => transaction.id !== rowId)
    //     );
    //     Swal.fire("Success", "Transaction deleted successfully", "success");
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     Swal.fire("Error", "Failed to delete transaction", "error");
    //   });
    const updatedProducts = products.filter((product) => product.id !== rowId);
    setProducts(updatedProducts);
  };

  const confirmDelete = (rowId) => {
    // Swal.fire({
    //   title: "Are You sure, want to delete?",
    //   text: "Row will be deleted",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonText: "Yes",
    //   cancelButtonText: "No",
    //   cancelButtonColor: "#FFC107",
    //   confirmButtonColor: "#0DCAF0",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     handleDelete(rowId); //
    //   }
    // });
    const isConfirmed = window.confirm("Are you sure, want to delete?");
    if (isConfirmed) {
      handleDelete(rowId);
    }
  };

  return (
    <Card className="mt-5 w-full">
      <div className="p-2 flex flex-col md:flex-row justify-between">
        <div className="relative">
          <select
            value={selectedOrderBy}
            onChange={handleOrderByChange}
            className="px-4 py-2 bg-white rounded-lg border border-gray-300"
          >
            {orderByOptions.map((option, index) => (
              <option key={index} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginLeft: "auto", marginRight: "16px" }}
          InputProps={{
            endAdornment: <Search />,
          }}
        />
        <div className="action flex text-white flex-col sm:w-[100%] md:flex-row space-x-0 md:space-x-3 font-semibold text-[12px] ">
          <div className="relative">
            <button
              className="flex px-4 py-2 bg-[#2dd4bf] rounded-lg"
              onClick={toggleExport}
            >
              <TbFileExport className="mr-1 mt-[2px] bg-[#2dd4bf]" />
              Export <MdOutlineArrowDropDown className="bg-[#2dd4bf]" />
            </button>
            {exportOpen && (
              <div className="absolute w-[100px] text-black p-2 right-0 mt-2 border border-gray-300 rounded-lg">
                <ul className="p">
                  <li className=" p-1 font-medium items-center hover:bg-[#2dd4bf] rounded-lg ">
                    {" "}
                    <CSVLink className="flex" {...csvLinkProps}>
                      <FaFileCsv className="mr-1" />
                      <p className="mt-[-2px]">Csv</p>
                    </CSVLink>
                  </li>
                  <li className="flex cursor-pointer p-1 font-medium items-center hover:bg-[#2dd4bf] rounded-lg ">
                    <FaFileCsv className="mr-1" />
                    <p onClick={handleExportToExcel}>Excel</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button
            className="bg-[#2dd4bf] flex justify-between p-2 h-[2.5rem] w-full md:w-[6rem] rounded-md mt-2 md:mt-0"
            onClick={handleReloadClick}
          >
            <TbReload className="text-lg mt-1" />
            Reload
          </button>

          <Link to="/VenCreateProduct">
            <button className="bg-[#2dd4bf] flex justify-between p-2 h-[2.5rem] w-full md:w-[6rem] rounded-lg mt-2 md:mt-0">
              <TbReload className="text-lg mt-1" />
              Create
            </button>
          </Link>
        </div>
      </div>

      <CardContent className="sm:w-auto">
        <div className="overflow-x-auto">
          <TableContainer component={Paper} className="min-w-full">
            <Table aria-label="custom table" className="min-w-full table-fixed">
              <TableHead className="text-black">
                <TableRow className="text-black">
                  <TableCell className="text-black w-1/10">
                    <Button onClick={() => handleSort("no")}>
                      No
                      {orderBy === "no" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>

                  <TableCell className="w-1/10">
                    <Button onClick={() => handleSort("thumbnail")}>
                      Thumbnail
                      {orderBy === "thumbnail" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>
                  <TableCell className="w-2/10">
                    <Button onClick={() => handleSort("name")}>
                      Name
                      {orderBy === "name" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>
                  <TableCell className="w-1/10">
                    <Button onClick={() => handleSort("price")}>
                      Price
                      {orderBy === "price" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>
                  <TableCell className="w-1/10">
                    <Button onClick={() => handleSort("quantity")}>
                      Quantity
                      {orderBy === "quantity" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>
                  <TableCell className="w-1/10">
                    <Button onClick={() => handleSort("Category")}>
                      Kategori
                      {orderBy === "category" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>
                  <TableCell className="w-1/10">
                    <Button onClick={() => handleSort("pemeriksaan?")}>
                      pemeriksaan?
                      {orderBy === "pemeriksaan?" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>
                  <TableCell className="w-2/10">
                    <Button onClick={() => handleSort("CreatedAt")}>
                      Created At
                      {orderBy === "CreatedAt" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>
                  <TableCell className="w-1/10">
                    <Button onClick={() => handleSort("status")}>
                      Status
                      {orderBy === "status" ? (
                        <span>
                          {order === "desc" ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )}
                        </span>
                      ) : null}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => (
                    <TableRow key={product?.id}>
                      <TableCell className="whitespace-nowrap w-1/10">
                        {product?.id}
                      </TableCell>
                      <TableCell className="w-1/10">
                        <img
                          className="h-14 w-14"
                          src={product.thumbnail} // Update this to use product.thumbnail
                          alt=""
                        />
                      </TableCell>
                      <TableCell className="w-2/10">{product?.name}</TableCell>
                      <TableCell className="w-1/10">{product?.price}</TableCell>
                      <TableCell className="w-1/10">
                        {product?.quantity}
                      </TableCell>
                      <TableCell className="w-1/10">
                        {product?.category}
                      </TableCell>
                      <TableCell className="w-1/10">
                        {getStatusResep(product?.isresep)}
                      </TableCell>
                      <TableCell className="w-2/10">
                        {product?.CreatedAt}
                      </TableCell>
                      <TableCell className="w-1/10">
                        {getStatusProducts(product?.status)}
                      </TableCell>
                      <TableCell className="w-1/10">
                        <div className="flex gap-2">
                          <Link to={`/VenProducts/edit/${product.id}`}>
                            <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                              <MdEdit />
                            </button>
                          </Link>
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded-md"
                            onClick={() => confirmDelete(product.id)}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length} // Change this to use the filteredData length
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsTable;
