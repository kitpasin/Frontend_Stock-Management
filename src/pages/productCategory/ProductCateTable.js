import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
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
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(name, calories, fat, carbs) {
  return {
    name,
    calories,
    fat,
    carbs,
    subcate: [
      {
        subName: "มาม่าเกาหลี",
        amount: 250,
      },
      {
        subName: "มาม่าอินโด",
        amount: 250,
      },
    ],
  };
}

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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.calories}</TableCell>
        <TableCell align="center">
          <button style={btnStyle}>
            <img src="images/icons/eva_edit-2-fill.png" alt="" />
          </button>
        </TableCell>
        <TableCell align="center">
          <button style={btnStyle}>
            <img src="images/icons/trash-icon.png" alt="" />
          </button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                หมวดหมู่ย่อย
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ชื่อหมวดหมู่</TableCell>
                    <TableCell>จำนวนรายการสินค้าในหมวดหมู่</TableCell>
                    <TableCell width={50} align="center">
                      Edit
                    </TableCell>
                    <TableCell width={50} align="center">
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.subcate.map((sub) => (
                    <TableRow key={sub.subName}>
                      <TableCell component="th" scope="row">
                        {sub.subName}
                      </TableCell>
                      <TableCell>{sub.amount}</TableCell>
                      <TableCell align="center">
                        <button style={btnStyle}>
                          <img src="images/icons/eva_edit-2-fill.png" alt="" />
                        </button>
                      </TableCell>
                      <TableCell align="center">
                        <button style={btnStyle}>
                          <img src="images/icons/trash-icon.png" alt="" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData("มาม่า", 159, 6.0, 24),
  createData("ขนม", 237, 9.0, 37),
  createData("อาหารกล่อง", 262, 16.0, 24),
  createData("ฝ่ายผลิต", 305, 3.7, 67),
  createData("ท็อปปิ้ง", 356, 16.0, 49),
  createData("แอลกอฮอล์", 159, 6.0, 24),
  createData("น้ำยาซัก", 237, 9.0, 37),
  
];

function ProductCateTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [newRows, setNewRows] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  /* set paginate  */
  useEffect(() => {
    let data = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    setNewRows(data);
  }, [page, rowsPerPage]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>หมวดหมู่หลัก</TableCell>
              <TableCell align="left">จำนวนรายการสินค้าในหมวดหมู่</TableCell>
              <TableCell width={60} align="center">
                Edit
              </TableCell>
              <TableCell width={60} align="center">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newRows?.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default ProductCateTable;
