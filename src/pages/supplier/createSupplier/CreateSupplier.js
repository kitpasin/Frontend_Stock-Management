import React from "react";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./createSupplier.scss";

/* import Components */
import HeadPageComponent from "../../../components/layout/headpage/headpage";

function CreateSupplier() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const columns = [
    { field: "image", headerName: "ภาพ", width: 50, headerAlign: "center", align: "center" },
    {
      field: "nameList",
      headerName: "ชื่อรายการ",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ordered",
      headerName: "จำนวนที่สั่งซื้อ",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "orderDate",
      headerName: "วันที่ซื้อ",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "expDate",
      headerName: "วันหมดอายุ",
      width: 150,
      headerAlign: "center",
      align: "center",
      // valueGetter: (params) =>
      // `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "vat", headerName: "Vat", width: 50, headerAlign: "center", align: "center" },
    {
      field: "category",
      headerName: "หมวดหมู่",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    { field: "unit", headerName: "หน่วยนับ", width: 150, headerAlign: "center", align: "center" },
    {
      field: "netWeight",
      headerName: "ปริมาณสุทธิต่อหน่วย",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "unitCost",
      headerName: "ต้นทุนต่อหน่วย",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "unitPrice",
      headerName: "ราคาต่อหน่วย",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalCost",
      headerName: "รวมต้นทุนต่อหน่วย",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <section id="create-supplier-page">
      <HeadPageComponent
        h1={"Create New Supplier"}
        icon={<FontAwesomeIcon icon={faStore} />}
        breadcrums={[{ title: "Create New Supplier", link: false }]}
      />
      <div className="main-content">
        <div className="top-content">
          <div className="head"></div>
          <div className="content">
            <div className="content-head">
              <div className="title">
                <img src="images/icons/entypo_shop (22222).png" alt="" />
                <p>ชื่อซัพพลายเออร์</p>
              </div>
              <div className="action">
                <button>ล้างข้อมูล</button>
                <button>บันทึกข้อมูล</button>
              </div>
            </div>
            <div className="input-form">
              <div className="form form-1">
                <TextField
                  sx={{ width: "50%" }}
                  id="standard-basic"
                  label="ชื่อบริษัท"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  sx={{ width: "50%" }}
                  id="standard-basic"
                  label="ที่อยู่"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div className="form form-2">
                <TextField
                  sx={{ width: "25%" }}
                  id="standard-basic"
                  label="ชื่อผู้ติดต่อ"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  sx={{ width: "25%" }}
                  id="standard-basic"
                  label="เบอร์โทร"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  sx={{ width: "25%" }}
                  id="standard-basic"
                  label="อีเมล"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  sx={{ width: "25%" }}
                  id="standard-basic"
                  label="ไลน์ ไอดี"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div className="form form-3">
                <FormControl sx={{ m: 1, width: "49.5%" }} size="small">
                  <InputLabel id="demo-select-small-label">
                    ประเภทสินค้าที่ขาย/หมวดหมู่หลัก
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <button style={{fontWeight: 400, fontSize: "16px"}}>
                  <img src="images/icons/ic_round-plus.png" alt="" />{" "}
                  สร้างประเภทสินค้าที่ขาย/หมวดหมู่หลัก
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-content">
          <div className="head"></div>
          <div className="content">
            <div className="content-head">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <img src="images/icons/ri_file-list-3-fill2222.png" alt="" />
                  <p style={{ color: "#3B336B", fontSize: "18px", fontWeight: 400 }}>
                    ประวัติสั่งสินค้า
                  </p>
                </div>
                <div className="action">
                  <p>2500 จำนวนที่เคยสั่งซื้อ</p>
                  <p>500 รายการ</p>
                </div>
              </div>

              <div className="search-input">
                <TextField
                  sx={{ width: "150px" }}
                  id="standard-basic"
                  label="ชื่อ"
                  variant="outlined"
                  size="small"
                />
                <FormControl sx={{ width: 150 }} size="small">
                  <InputLabel id="demo-select-small-label">หมวดหมู่หลัก</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: 150 }} size="small">
                  <InputLabel id="demo-select-small-label">หมวดหมู่ย่อย</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="table">
              <DataGrid
                checkboxSelection={false}
                sx={{ border: "none" }}
                rows={[]}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10, 50, 100]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateSupplier;
