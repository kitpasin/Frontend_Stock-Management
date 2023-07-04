import { Autocomplete, Checkbox, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Swal from "sweetalert2";

function EditSupplier({ mainCatesData, open, setOpen, cellData, getSuppliers }) {
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

  useEffect(() => {
    if (open) {
      setCompanyName(cellData.row.name || "");
      setAddress(cellData.row.address || "");
      setAgent(cellData.row.agent || "");
      setTel(cellData.row.tel || "");
      setEmail(cellData.row.email || "");
      setLineId(cellData.row.line_id || "");
    }
  }, [open, cellData]);

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
    if (Object.values(data).some((value) => value === "" || value.length === 0)) {
      handleClose()
      Swal.fire("Error!", "Please fill in all fields.", "error").then(() => {
        setOpen(true)
      })
      return;
    }
    await axios
      .put(`supplier/${cellData.row.id}`, data)
      .then(function (response) {
        handleClose();
        Swal.fire("Updated!", "Your supplier has been updated.", "success").then(() => {
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
    width: 480,
    bgcolor: "#fff",
    boxShadow: 24,
    padding: "1rem",
    borderRadius: "10px",
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <CloseIcon
          onClick={handleClose}
          style={{ position: "absolute", top: "1rem", right: "1rem", cursor: "pointer" }}
        />

        <Typography
          id="modal-modal-title"
          style={{ textAlign: "center", fontWeight: "500", fontSize: "1.75rem" }}
        >
          Edit Supplier
        </Typography>
        <TextField
          size="small"
          id="outlined-basic"
          label="Company Name"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) => setCompanyName(e.target.value)}
          value={companyName}
        />
        <TextField
          size="small"
          id="outlined-basic"
          label="Address"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
        <TextField
          size="small"
          id="outlined-basic"
          label="Agent"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) => setAgent(e.target.value)}
          value={agent}
        />
        <TextField
          size="small"
          id="outlined-basic"
          label="Tel"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) => setTel(e.target.value)}
          value={tel}
        />
        <TextField
          size="small"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          size="small"
          id="outlined-basic"
          label="Line ID"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) => setLineId(e.target.value)}
          value={lineId}
        />

        <Autocomplete
          size="small"
          multiple
          id="checkboxes-tags-demo"
          options={mainCatesData}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => {
            const selectedValues = value.map((option) => option.id);
            const mainCateIdsString = selectedValues.join(", ");
            setCategories(mainCateIdsString);
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
          renderInput={(params) => <TextField size="small" {...params} label="หมวดหมู่หลัก" />}
        />
        <button
          onClick={handleEditSupplier}
          style={{
            background: "#3b326b",
            fontWeight: "400",
            fontSize: "16px",
            padding: ".5rem 1rem",
            color: "#fff",
            borderRadius: "5px",
          }}
        >
          Submit
        </button>
      </Box>
    </Modal>
  );
}

export default EditSupplier;
