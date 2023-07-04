import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Swal from "sweetalert2";
import axios from "axios";
import EditMainCategory from "./editCategory/EditMainCategory";
import EditSubCategory from "./editCategory/EditSubCategory";

const btnStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "35px",
  height: "35px",
  background: "#3B336B",
  color: "#fff",
  borderRadius: "5px",
};
function Row({ row, subCatesData, getMainCates, getSubCates }) {
  const [open, setOpen] = useState(false);
  const [mainCateData, setMainCateData] = useState("")
  const [subCateData, setSubCateData] = useState("");
  const [editMainCateOpen, setEditMainCateOpen] = useState(false);
  const [editSubCateOpen, setEditSubCateOpen] = useState(false);

  function handleEditMainCateOpen(row) {
    setEditMainCateOpen(true)
    setMainCateData(row);
  }

  function handleEditSubCateOpen(sub) {
    setEditSubCateOpen(true);
    setSubCateData(sub);
  }

  function handleDeleteMainCate(row) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`maincate/${row.id}`).then(() => {
          Swal.fire("Deleted!", "Your Data has been deleted.", "success").then(() => {
            getMainCates();
          });
        });
      }
    });
  }

  function handleDeleteSubCate(row) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`subcate/${row.id}`).then(() => {
          Swal.fire("Deleted!", "Your Data has been deleted.", "success").then(() => {
            getSubCates();
          });
        });
      }
    });
  }

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width={50}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell width={300} component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.quantity}</TableCell>
        <TableCell align="center">
          <button style={btnStyle} onClick={() => handleEditMainCateOpen(row)}>
            <img src="images/icons/eva_edit-2-fill.png" alt="" />
          </button>
        </TableCell>
        <TableCell align="center">
          <button style={btnStyle} onClick={() => handleDeleteMainCate(row)}>
            <img src="images/icons/trash-icon.png" alt="" />
          </button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{}}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell width={50} style={{ color: "#3B326B" }}></TableCell>
                    <TableCell width={300} style={{ color: "#3B326B" }}>หมวดหมู่ย่อย</TableCell>
                    <TableCell style={{ color: "#3B326B" }}>จำนวนรายการสินค้าในหมวดหมู่</TableCell>
                    <TableCell style={{ color: "#3B326B" }} width={50} align="center">
                      แก้ไข
                    </TableCell>
                    <TableCell style={{ color: "#3B326B" }} width={50} align="center">
                      ลบ
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subCatesData.map((sub) => {
                    if (sub.main_cate_id === row.id) {
                      return (
                        <TableRow key={sub.id}>
                          <TableCell></TableCell>
                          <TableCell>{sub.name}</TableCell>
                          <TableCell>{sub.quantity}</TableCell>
                          <TableCell align="center">
                            <button style={btnStyle} onClick={() => handleEditSubCateOpen(sub)}>
                              <img src="images/icons/eva_edit-2-fill.png" alt="" />
                            </button>
                          </TableCell>
                          <TableCell align="center">
                            <button style={btnStyle} onClick={() => handleDeleteSubCate(sub)}>
                              <img src="images/icons/trash-icon.png" alt="" />
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    } else {
                      return null;
                    }
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <EditMainCategory
        editMainCateOpen={editMainCateOpen}
        setEditMainCateOpen={setEditMainCateOpen}
        mainCateData={mainCateData}
        setMainCateData={setMainCateData}
        getMainCates={getMainCates}
      />
      <EditSubCategory
        editSubCateOpen={editSubCateOpen}
        setEditSubCateOpen={setEditSubCateOpen}
        subCateData={subCateData}
        setSubCateData={setSubCateData}
        getSubCates={getSubCates}
      />
    </>
  );
}

function ProductCateTable({ mainCatesData, subCatesData, getMainCates, getSubCates }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newRows, setNewRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  /* set paginate  */
  useEffect(() => {
    let data = mainCatesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    setNewRows(data);
  }, [page, rowsPerPage, mainCatesData]);

  return (
    <>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell style={{ color: "#3B326B" }}>หมวดหมู่หลัก</TableCell>
              <TableCell style={{ color: "#3B326B" }} align="left">
                จำนวนรายการสินค้าในหมวดหมู่
              </TableCell>
              <TableCell style={{ color: "#3B326B" }} width={60} align="center">
                แก้ไข
              </TableCell>
              <TableCell style={{ color: "#3B326B" }} width={60} align="center">
                ลบ
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newRows?.map((row) => (
              <Row
                key={row.id}
                row={row}
                subCatesData={subCatesData}
                getMainCates={getMainCates}
                getSubCates={getSubCates}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 50, 100]}
        component="div"
        count={mainCatesData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default ProductCateTable;
