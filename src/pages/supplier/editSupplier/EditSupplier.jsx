import {
  Autocomplete,
  Checkbox,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function EditSupplier({
  mainCatesData,
  open,
  setOpen,
  cellData,
  getSuppliers,
}) {
  const navigate = useNavigate();
  const handleClose = () => setOpen(false);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [agent, setAgent] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [lineId, setLineId] = useState("");
  const [categories, setCategories] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (open) {
      setCompanyName(cellData.row.name || "");
      setAddress(cellData.row.address || "");
      setAgent(cellData.row.agent || "");
      setTel(cellData.row.tel || "");
      setEmail(cellData.row.email || "");
      setLineId(cellData.row.line_id || "");
      setCategories(cellData.row.main_cate_id || "")

      const selectedIds = cellData.row.main_cate_id.split(", ");
      const selectedOptions = mainCatesData.filter((option) =>
        selectedIds.includes(option.id.toString())
      );
      setSelectedOptions(selectedOptions || []);
    }
  }, [open, cellData, mainCatesData]);

  async function handleEditSupplier() {
    const data = {
      name: companyName,
      address: address,
      agent: agent,
      tel: tel,
      email: email,
      line_id: lineId,
      main_cate_id: categories,
    };
    if (
      Object.values(data).some((value) => value === "" || value.length === 0)
    ) {
      handleClose();
      Swal.fire("Error!", "Please fill in all fields.", "error").then(() => {
        setOpen(true);
      });
      return;
    }
    await axios
      .put(`supplier/${cellData.row.id}`, data)
      .then(function (response) {
        handleClose();
        Swal.fire(
          "Updated!",
          "Your supplier has been updated.",
          "success"
        ).then(() => {
          getSuppliers();
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const modalStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1280,
    height: 330,
    bgcolor: "#fff",
    boxShadow: 24,
    padding: "1rem",
    borderRadius: "10px",
  };

  const groupStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography
          id="modal-modal-title"
          style={{
            textAlign: "left",
            fontWeight: "500",
            fontSize: "1.75rem",
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          แก้ไขซัพพลายเออร์
        </Typography>
        <CloseIcon
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            cursor: "pointer",
          }}
        />
        <div
          className="head-group"
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button
            onClick={handleEditSupplier}
            style={{
              width: "200px",
              background: "#3b326b",
              fontWeight: "400",
              fontSize: "14px",
              padding: ".5rem 1rem",
              color: "#fff",
              borderRadius: "5px",
            }}
          >
            บันทึกข้อมูล
          </button>
        </div>
        <div className="input-group" style={groupStyle}>
          <TextField
            size="small"
            id="outlined-basic"
            label="ชื่อบริษัท"
            variant="outlined"
            style={{ width: "50%" }}
            onChange={(e) => setCompanyName(e.target.value)}
            value={companyName}
          />
          <TextField
            size="small"
            id="outlined-basic"
            label="ที่อยู่"
            variant="outlined"
            style={{ width: "50%" }}
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>
        <div className="input-group" style={groupStyle}>
          <TextField
            size="small"
            id="outlined-basic"
            label="ชื่อผู้ติดต่อ"
            variant="outlined"
            style={{ width: "25%" }}
            onChange={(e) => setAgent(e.target.value)}
            value={agent}
          />
          <TextField
            size="small"
            id="outlined-basic"
            label="เบอร์โทร"
            variant="outlined"
            style={{ width: "25%" }}
            onChange={(e) => setTel(e.target.value)}
            value={tel}
          />
          <TextField
            size="small"
            id="outlined-basic"
            label="อีเมล"
            variant="outlined"
            style={{ width: "25%" }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            size="small"
            id="outlined-basic"
            label="ไลน์ ไอดี"
            variant="outlined"
            style={{ width: "25%" }}
            onChange={(e) => setLineId(e.target.value)}
            value={lineId}
          />
        </div>
        <div className="input-group" style={groupStyle}>
          <Autocomplete
            size="small"
            multiple
            id="checkboxes-tags-demo"
            options={mainCatesData}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            value={selectedOptions}
            onChange={(event, value) => {
              setSelectedOptions(value);
              const selectedValues = value.map((option) => option.id);
              const mainCateIdsString = selectedValues.join(", ");
              setCategories(mainCateIdsString);
            }}
            renderOption={(props, option) => {
              const selected = selectedOptions.some(
                (selectedOption) => selectedOption.id === option.id
              );
              return (
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
              );
            }}
            style={{ width: "50%", maxWidth: "616px" }}
            renderInput={(params) => (
              <TextField
                size="small"
                {...params}
                label="หมวดหมู่หลัก"
                value={selectedOptions.map((option) => option.name).join(", ")}
              />
            )}
          />
          <button
            onClick={() => navigate("/productcate")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "200px",
              height: "40px",
              background: "#3b326b",
              fontWeight: "400",
              fontSize: "14px",
              padding: ".5rem 1rem",
              color: "#fff",
              borderRadius: "5px",
            }}
          >
            <img src="images/icons/ic_round-plus.png" alt="" />
            สร้างหมวดหมู่หลัก
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default EditSupplier;
