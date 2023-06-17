import React from "react";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
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
    { field: "id", headerName: "#", width: 30 },
    { field: "image", headerName: "ภาพ", width: 30 },
    { field: "nameList", headerName: "ชื่อรายการ", width: 180 },
    { field: "ordered", headerName: "จำนวนที่สั่งซื้อ", width: 180 },
    {
      field: "orderDate",
      headerName: "วันที่ซื้อ",
      width: 130,
    },
    {
      field: "expDate",
      headerName: "วันหมดอายุ",
      width: 160,
      // valueGetter: (params) =>
      // `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "vat", headerName: "Vat", width: 80 },
    { field: "category", headerName: "หมวดหมู่", width: 100 },
    { field: "unit", headerName: "หน่วยนับ", width: 130 },
    { field: "netWeight", headerName: "ปริมาณสุทธิต่อหน่วย", width: 130 },
    { field: "unitCost", headerName: "ต้นทุนต่อหน่วย", width: 130 },
    { field: "unitPrice", headerName: "ราคาต่อหน่วย", width: 130 },
    { field: "totalCost", headerName: "รวมต้นทุนต่อหน่วย", width: 130 },
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
                <button>Clean Up</button>
                <button>Save</button>
              </div>
            </div>
            <div className="input-form">
              <div className="form form-1">
                <TextField
                  sx={{ width: "50%" }}
                  id="standard-basic"
                  label="ชื่อบริษัท"
                  variant="standard"
                />
                <TextField
                  sx={{ width: "50%" }}
                  id="standard-basic"
                  label="ที่อยู่"
                  variant="standard"
                />
              </div>
              <div className="form form-2">
                <TextField
                  sx={{ width: "25%" }}
                  id="standard-basic"
                  label="ชื่อผู้ติดต่อ"
                  variant="standard"
                />
                <TextField
                  sx={{ width: "25%" }}
                  id="standard-basic"
                  label="เบอร์โทร"
                  variant="standard"
                />
                <TextField
                  sx={{ width: "25%" }}
                  id="standard-basic"
                  label="อีเมล"
                  variant="standard"
                />
                <TextField
                  sx={{ width: "25%" }}
                  id="standard-basic"
                  label="ไลน์ ไอดี"
                  variant="standard"
                />
              </div>
              <div className="form form-3">
                <FormControl sx={{ m: 1, minWidth: "50%" }} size="small">
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
                <button>
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
              <div className="title">
                <img src="images/icons/ri_file-list-3-fill2222.png" alt="" />
                <p>ประวัติสั่งสินค้า</p>
              </div>
              <div className="search-input">
                <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    หมวดหมู่หลัก
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
                <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    หมวดหมู่ย่อย
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
                <TextField
                  sx={{ width: "250px" }}
                  id="standard-basic"
                  label="ชื่อ"
                  variant="standard"
                />
                <button> <img src="images/icons/fa_search.png" alt="" /> ค้นหา</button>
              </div>
              <div className="action">
                <p style={{ color: "#3B336B" }}>0 จำนวนที่เคยสั่งซื้อ</p>
                <p>List : 0</p>
              </div>
            </div>
            <div className="table">
              <DataGrid
                checkboxSelection={false}
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
