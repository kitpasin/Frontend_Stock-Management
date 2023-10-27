/* eslint-disable */
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import EditSupplier from "./editSupplier/EditSupplier";
import { Autocomplete, TextField } from "@mui/material";

import "./suppliers.scss";
import { svProductAll } from "../../services/product.service";

/* import Components */
import HeadPageComponent from "../../components/layout/headpage/headpage";
import axios from "axios";
import Swal from "sweetalert2";
import PulseLoader from "react-spinners/PulseLoader";
import ProductSupplier from "./ProductSupplier";
import { useSelector } from "react-redux";

function Suppliers() {
  const [loading, setLoading] = useState(true);
  const uPermission = useSelector((state) => state.auth.userPermission);
  const [productData, setProductData] = useState([]);
  const [productAll, setProductAll] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [suppliersData, setSuppliersData] = useState([]);
  const [mainCatesData, setMainCatesData] = useState([]);
  const [mainCates, setMainCates] = useState([]);
  const [cellData, setCellData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);

  function handleOpen(cellValue) {
    setOpen(true);
    setCellData(cellValue);
  }

  async function getSuppliers() {
    const response = await axios.get("suppliers");
    const data = response.data;
    setSuppliersData(data.suppliers);
    setSupplier(data.suppliers);
    setLoading(false);
  }
  async function getMainCates() {
    const response = await axios.get("maincates");
    const data = response.data.mainCates;
    setMainCatesData(data);
  }

  function filterData(_id) {
    if (_id !== 0) {
      const data = productData.filter((item) => item.supplier_id === _id);
      const supplier = suppliersData.filter((item) => item.id === _id);
      setProductAll(data);
      setSupplier(supplier);
    } else {
      setProductAll(productData);
      setSupplier(suppliersData);
    }
  }

  function filterTel(_tel) {
    if (_tel !== 0) {
      const supplier = suppliersData.filter((item) => item.tel === _tel);
      const data = productData.filter(
        (item) => item.supplier_id === supplier[0].id
      );

      setProductAll(data);
      setSupplier(supplier);
    } else {
      setProductAll(productData);
      setSupplier(suppliersData);
    }
  }

  const searchSupplier = (e) => {
    const text = e.target.value.toLowerCase();
    const pp = [];
    if (!text || text.trim() === "") {
      setProductAll(productData);
      setSupplier(suppliersData);
    } else {
      const supplier = suppliersData?.filter(
        (item) =>
          item.name.includes(text) ||
          item.address.includes(text) ||
          item.agent.includes(text) ||
          item.tel.includes(text) ||
          item.line_id.includes(text) ||
          item.email.includes(text)
      );
      if (supplier.length > 0) {
        supplier?.map((item) => {
          productData?.map((product) => {
            if (product.supplier_id === item.id) {
              pp.push(product);
            }
          });
        });
        setProductAll(pp);
      } else {
        setProductAll([]);
      }
      setSupplier(supplier);
    }
  };

  useEffect(() => {
    getSuppliers();
    getMainCates();
    svProductAll().then((res) => {
      const result = res.data;
      setProductData(result);
      setProductAll(result);
    });
  }, []);

  function handleDeleteSupplier(cellValue) {
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
        axios.delete(`supplier/${cellValue.row.id}`).then(() => {
          Swal.fire("Deleted!", "Your Data has been deleted.", "success").then(
            () => {
              getSuppliers();
            }
          );
        });
      }
    });
  }

  const navigate = useNavigate();
  const handleLink = () => {
    navigate("/createsupplier");
  };

  const buttonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "35px",
    height: "35px",
    borderRadius: "5px",
    backgroundColor: "#3B336B",
  };

  const columns = [
    {
      field: "name",
      headerName: "ชื่อบริษัท",
      width: 240,
      headerClassName: "table-columns",
    },
    {
      field: "address",
      headerName: "ที่อยู่",
      width: 240,
      headerClassName: "table-columns",
    },
    {
      field: "agent",
      headerName: "ชื่อผู้ติดต่อ",
      width: 240,
      headerClassName: "table-columns",
    },
    {
      field: "tel",
      headerName: "เบอร์โทร",
      width: 150,
      headerClassName: "table-columns",
    },
    {
      field: "email",
      headerName: "อีเมล",
      sortable: false,
      width: 150,
      headerClassName: "table-columns",
      // valueGetter: (params) =>
      // `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "line_id",
      headerName: "ไลน์ ไอดี",
      width: 150,
      sortable: false,
      headerClassName: "table-columns",
    },
    {
      field: "main_cate_name",
      headerName: "หมวดหมู่สินค้า",
      width: 150,
      headerClassName: "table-columns",
    },
    {
      field: "product_count",
      headerName: "จำนวนสินค้าที่เคยสั่งซื้อ",
      width: 150,
      align: "center",
      headerClassName: "table-columns",
    },
    {
      field: "edit",
      headerName: "แก้ไข",
      width: 65,
      sortable: false,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderCell: (cellValue) => {
        return (uPermission.superAdmin || uPermission.officer) ? (
          <button style={buttonStyle} onClick={() => handleOpen(cellValue)}>
            {" "}
            <img src="images/icons/eva_edit-2-fill.png" alt="" />{" "}
          </button>
        ) : (
          <button
            disabled
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "35px",
              height: "35px",
              borderRadius: "5px",
              background: "#3B336B",
              opacity: "50%",
            }}
            onClick={() => handleOpen(cellValue)}
          >
            {" "}
            <img src="images/icons/eva_edit-2-fill.png" alt="" />{" "}
          </button>
        );
      },
    },
    {
      field: "delete",
      headerName: "ลบ",
      width: 65,
      sortable: false,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderCell: (cellValue) => {
        return (uPermission.superAdmin || uPermission.officer) ? (
          <button
            style={buttonStyle}
            onClick={() => handleDeleteSupplier(cellValue)}
          >
            {" "}
            <img src="images/icons/trash-icon.png" alt="" />{" "}
          </button>
        ) : (
          <button
            disabled
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "35px",
              height: "35px",
              borderRadius: "5px",
              background: "#3B336B",
              opacity: "50%",
            }}
            onClick={() => handleDeleteSupplier(cellValue)}
          >
            {" "}
            <img src="images/icons/trash-icon.png" alt="" />{" "}
          </button>
        );
      },
    },
  ];

  const rowsClassName = "table-rows";

  return (
    <section id="supplier-page">
      {loading ? (
        <PulseLoader color="#3b326b" />
      ) : (
        <>
          <HeadPageComponent
            h1={"ซัพพลายเออร์"}
            icon={<img src="/images/icons/mdi_shipping-pallet.png" alt="" />}
            // icon={<FontAwesomeIcon icon={faStore} />}
            breadcrums={[{ title: "ซัพพลายเออร์", link: false }]}
          />
          <div className="main-content">
            <div className="head"></div>
            <div className="content">
              <div className="content-head">
                <div className="title">
                  <img src="images/icons/mdi_shipping-pallet2.png" alt="" />
                  <p>ซัพพลายเออร์</p>
                  <span>{suppliersData.length} รายการ</span>
                </div>
                <div className="select">
                  <Autocomplete
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={supplier}
                    getOptionLabel={(option) => option.name || ""}
                    sx={{ width: 180 }}
                    renderInput={(params) => (
                      <TextField {...params} label="ซัพพลายเออร์" />
                    )}
                    onChange={(e, value) => {
                      filterData(value ? value.id : 0);
                    }}
                  />
                  {/* <Autocomplete
                      size="small"
                      disablePortal
                      id="combo-box-demo"
                      options={supplier}
                      getOptionLabel={(option) => option.tel || ""}
                      sx={{ width: 180 }}
                      renderInput={(params) => (
                        <TextField {...params} label="เบอร์โทรศัพท์" />
                      )}
                      onChange={(e, value) => {
                        filterTel(value ? value.tel : 0);
                      }}
                    /> */}
                  <TextField
                    label="ค้นหาซัพพลายเออร์"
                    id="outlined-size-small"
                    // value={searchInput}
                    size="small"
                    onChange={(e) => searchSupplier(e)}
                  />
                  <div className="action">
                    {(uPermission.superAdmin || uPermission.officer) ? (
                      <button onClick={handleLink}>เพิ่มซัพพลายเออร์</button>
                    ) : (
                      <button
                        disabled
                        style={{ opacity: "50%" }}
                        onClick={handleLink}
                      >
                        เพิ่มซัพพลายเออร์
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="table">
                <DataGrid
                  getRowClassName={() => rowsClassName}
                  sx={{ fontSize: "12px", border: "none" }}
                  checkboxSelection={false}
                  rows={supplier}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10, 50, 100]}
                />
              </div>
              <EditSupplier
                mainCatesData={mainCatesData}
                mainCates={mainCates}
                setMainCates={setMainCates}
                open={open}
                setOpen={setOpen}
                cellData={cellData}
                getSuppliers={getSuppliers}
              />
            </div>
          </div>
          <ProductSupplier productAll={productAll} />
        </>
      )}
    </section>
  );
}

export default Suppliers;
