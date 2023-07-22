import React from "react";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import "./createSupplier.scss";

/* import Components */
import HeadPageComponent from "../../../components/layout/headpage/headpage";
import { svProductAll } from "../../../services/product.service";
import { Autocomplete, Avatar, Checkbox, Select } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Result } from "postcss";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

function CreateSupplier({ isEdit }) {
  const [loading, setLoading] = useState(true);

  const [mainCatesData, setMainCatesData] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [agent, setAgent] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [lineId, setLineId] = useState("");
  const [mainCates, setMainCates] = useState([]);
  const [productData, setProductData] = useState([]);
  const [productAll, setProductAll] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const webPath = useSelector((state) => state.app.webPath);

  const columns = [
    {
      field: "thumbnail_link",
      headerName: "ภาพ",
      width: 50,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <figure style={{ background: "#D0D0E2", borderRadius: "5px", padding: ".1rem" }}>
          <Avatar alt="Thumbnail" src={`${webPath}${params.row.thumbnail_link}`} />
        </figure>
      ),
    },
    {
      field: "title",
      headerName: "ชื่อรายการ",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "supplier_name",
      headerName: "ชื่อซัพพลายเออร์",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "import_value",
      headerName: "จำนวนที่สั่งซื้อ",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "defective_product",
      headerName: "จำนวนสินค้าผิดปกติ",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "purchase_date",
      headerName: "วันที่ซื้อ",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "exp_date",
      headerName: "วันหมดอายุ",
      width: 150,
      headerAlign: "center",
      align: "center",
      // valueGetter: (params) =>
      // `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "vat_name",
      headerName: "Vat",
      width: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "supplier_cate_name",
      headerName: "หมวดหมู่",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount_name",
      headerName: "หน่วยนับ",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "netWeight",
      headerName: "ปริมาณสุทธิต่อหน่วย",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <p>
          {params.row.netweight} {params.row.net_name}
        </p>
      ),
    },
    {
      field: "cost_per_unit",
      headerName: "ต้นทุนต่อหน่วย",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "pp_profit",
      headerName: "ราคาต่อหน่วย",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "pp_vat",
      headerName: "รวมต้นทุนต่อหน่วย",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
  ];

  useEffect(() => {
    getSuppliers();
    svProductAll()
      .then((res) => {
        const result = res.data;
        setProductData(result);
        setProductAll(result);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  function filterData(_id) {
    if (_id !== 0) {
      const data = productData.filter((item) => item.supplier_id === _id);
      setProductAll(data);
    } else {
      setProductAll(productData);
    }
  }

  async function getSuppliers() {
    const response = await axios.get("suppliers");
    const data = response.data.suppliers;
    setSupplier(data);
    getMainCates();
  }

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const navigate = useNavigate();

  async function getMainCates() {
    const response = await axios.get("maincates");
    const data = response.data.mainCates;
    setMainCatesData(data);
  }

  function handleClear() {
    window.location.reload(false);
  }

  function handleCreateSupplier() {
    const data = {
      name: name,
      address: address,
      agent: agent,
      tel: tel,
      email: email,
      line_id: lineId,
      main_cate_id: mainCates,
    };
    console.log(data.main_cate_id);
    if (Object.values(data).some((value) => value === "" || value.length === 0)) {
      Swal.fire("Error!", "Please fill in all fields.", "error");
    } else {
      axios
        .post("supplier", data)
        .then(function (response) {
          Swal.fire("Created!", "Your supplier has been created.", "success").then(() => {
            navigate("/suppliers");
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }

  return (
    <section id="create-supplier-page">
      {loading ? (
        <PulseLoader color="#3b326b" />
      ) : (
        <>
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
                    <button onClick={handleClear}>ล้างข้อมูล</button>
                    <button onClick={handleCreateSupplier}>บันทึกข้อมูล</button>
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
                      onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                      sx={{ width: "50%" }}
                      id="standard-basic"
                      label="ที่อยู่"
                      variant="outlined"
                      size="small"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="form form-2">
                    <TextField
                      sx={{ width: "25%" }}
                      id="standard-basic"
                      label="ชื่อผู้ติดต่อ"
                      variant="outlined"
                      size="small"
                      onChange={(e) => setAgent(e.target.value)}
                    />
                    <TextField
                      sx={{ width: "25%" }}
                      id="standard-basic"
                      label="เบอร์โทร"
                      variant="outlined"
                      size="small"
                      onChange={(e) => setTel(e.target.value)}
                    />
                    <TextField
                      sx={{ width: "25%" }}
                      id="standard-basic"
                      label="อีเมล"
                      variant="outlined"
                      size="small"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      sx={{ width: "25%" }}
                      id="standard-basic"
                      label="ไลน์ ไอดี"
                      variant="outlined"
                      size="small"
                      onChange={(e) => setLineId(e.target.value)}
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <Autocomplete
                      size="small"
                      multiple
                      id="checkboxes-tags-demo"
                      options={mainCatesData}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.name}
                      onChange={(event, value) => {
                        const selectedValues = value.map((option) => option.id); // Extract the selected option IDs
                        const mainCateIdsString = selectedValues.join(", "); // Convert the array to a comma-separated string
                        setMainCates(mainCateIdsString); // Set the state as the comma-separated string
                      }}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                            value={option.id}
                          />
                          {option.name}
                        </li>
                      )}
                      style={{ width: "100%", maxWidth: "776px" }}
                      renderInput={(params) => (
                        <TextField size="small" {...params} label="หมวดหมู่หลัก" />
                      )}
                    />
                    <Link
                      to="/productcate"
                      style={{
                        fontWeight: 400,
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                        background: "#3b326b",
                        padding: ".5rem 1rem",
                        color: "#fff",
                        gap: ".5rem",
                        borderRadius: "5px",
                        width: "200px",
                      }}
                    >
                      <img src="images/icons/ic_round-plus.png" alt="" /> สร้างหมวดหมู่หลัก
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            { false &&
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
                        <p
                          style={{
                            color: "#3B336B",
                            fontSize: "18px",
                            fontWeight: 400,
                          }}
                        >
                          ประวัติสั่งสินค้า
                        </p>
                      </div>
                      <div className="action">
                        {/* <p>2500 จำนวนที่เคยสั่งซื้อ</p> */}
                        <p>{productAll.length} รายการ</p>
                      </div>
                    </div>

                    <Autocomplete
                      size="small"
                      disablePortal
                      id="combo-box-demo"
                      options={supplier}
                      getOptionLabel={(option) => option.name || ""}
                      sx={{ width: 180 }}
                      renderInput={(params) => <TextField {...params} label="ซัพพลายเออร์" />}
                      onChange={(e, value) => {
                        filterData(value ? value.id : 0);
                      }}
                    />
                    {/* <div className="search-input">
                  <TextField
                    sx={{ width: "150px" }}
                    id="standard-basic"
                    label="ชื่อ"
                    variant="outlined"
                    size="small"
                  />
                  <FormControl sx={{ width: 150 }} size="small">
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
                  <FormControl sx={{ width: 150 }} size="small">
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
                </div> */}
                  </div>
                  <div className="table">
                    <DataGrid
                      checkboxSelection={false}
                      sx={{ border: "none" }}
                      rows={productAll}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 10 },
                        },
                      }}
                      pageSizeOptions={[5, 10, 50, 100]}
                    />
                  </div>
                </div>
              </div>
            }
          </div>
        </>
      )}
    </section>
  );
}

export default CreateSupplier;
