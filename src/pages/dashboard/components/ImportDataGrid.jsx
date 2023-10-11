import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Modal, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  bgcolor: "#fff",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

function ImportDataGrid({ productsImport }) {
  const webPath = useSelector((state) => state.app.webPath);
  const { displayName } = useSelector((state) => state.auth.profile);
  const [isHovered, setIsHovered] = useState(false);
  const [showImg, setShowImg] = useState(null)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function openImgModal(params) {
    console.log(params.row.thumbnail_link)
    setShowImg(params.row.thumbnail_link)
    handleOpen();
  }

  const columns = [
    {
      field: "thumbnail_link",
      headerName: "ภาพ",
      width: 50,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ background: "#D0D0E2", borderRadius: "5px", cursor: "pointer" }} onClick={()=>openImgModal(params)}>
          <Avatar
            src={`${webPath}${params.row.thumbnail_link}`}
            alt={`Image ${params.thumbnail_title}`}
          />
        </div>
      ),
    },
    {
      field: "name",
      headerName: "ชื่อรายการ",
      headerAlign: "center",
      align: "left",
      width: isHovered ? 290 : 140,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <div
          style={{ paddingLeft: "0" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>
            {params.row.title}
          </p>
          <p
            style={{ fontSize: "12px", lineHeight: "12.5px", color: "#9993B4" }}
          >
            {params.row.product_id}
          </p>
        </div>
      ),
    },
    {
      field: "user",
      headerName: "ผู้ใช้งาน",
      headerAlign: "center",
      align: "center",
      width: 120,
      headerClassName: "table-columns",
      renderCell: () => (
        <div>
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>
            {displayName}
          </p>
        </div>
      ),
    },
    {
      field: "created_at",
      headerName: "วันนำเข้าสินค้า",
      headerAlign: "center",
      align: "center",
      width: 150,
      headerClassName: "table-columns",
      renderCell: (params) => {
        const date = params.row.formatted_created_at.split(" ")[0];
        const time = params.row.formatted_created_at.split(" ")[1];
        return (
          <div>
            <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>{date}</p>
            <p
              style={{
                fontSize: "12px",
                lineHeight: "12.5px",
                color: "#9993B4",
              }}
            >
              {time}
            </p>
          </div>
        );
      },
    },
    {
      field: "import_value",
      headerAlign: "center",
      align: "center",
      width: 120,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            จำนวนนำเข้า
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            /หน่วย
          </Typography>
        </div>
      ),
    },
    {
      field: "quantityPerUnit",
      headerAlign: "center",
      align: "center",
      width: 120,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            คงเหลือ
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            /หน่วย
          </Typography>
        </div>
      ),
      renderCell: (params) => (
        <div>
          <p
            style={{
              fontSize: "12px",
              lineHeight: "12.5px",
              color:
                params.row.import_value -
                  params.row.export_value -
                  params.row.export_defective_value <=
                params.row.alert_stock
                  ? "#ff0000"
                  : "#000",
            }}
          >
            {params.row.import_value -
              params.row.export_value -
              params.row.export_defective_value}
          </p>
        </div>
      ),
    },
    {
      field: "purchase_date",
      headerName: "วันที่ซื้อ",
      headerAlign: "center",
      align: "center",
      width: 120,
      headerClassName: "table-columns",
    },
    {
      field: "MEDEXP",
      width: 120,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            MFD
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            EXP
          </Typography>
        </div>
      ),
      renderCell: (params) => (
        <div>
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>
            {params.row.mfd_date}
          </p>
          <p
            style={{ fontSize: "12px", lineHeight: "12.5px", color: "#FF0000" }}
          >
            {params.row.exp_date}
          </p>
        </div>
      ),
    },
    {
      field: "vat_name",
      headerName: "Vat",
      headerAlign: "center",
      align: "center",
      width: 50,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <div>
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>
            {params.row.vat_name === null ? "0%" : params.row.vat_name}
          </p>
        </div>
      ),
    },
    {
      field: "main_cate_name",
      headerName: "หมวดหมู่",
      headerAlign: "center",
      align: "center",
      width: 120,
      headerClassName: "table-columns",
    },
    {
      field: "netweight",
      headerAlign: "center",
      align: "center",
      width: 120,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            ปริมาตรสุทธิ
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            /หน่วย
          </Typography>
        </div>
      ),
      renderCell: (params) => (
        <div>
          <p>
            {params.row.netweight} {params.row.unit_name}
          </p>
        </div>
      ),
    },
    {
      field: "unit_price",
      headerAlign: "center",
      align: "center",
      width: 120,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            ต้นทุน
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            /หน่วย (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "set_profit",
      headerName: "กำไร (%)",
      headerAlign: "center",
      align: "center",
      width: 120,
      headerClassName: "table-columns",
    },
    {
      field: "selling_price",
      width: 120,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            ราคาขายจริง
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            (THB)
          </Typography>
        </div>
      ),
    },
  ];

  const rowsClassName = "table-rows";
  return (
    <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <figure>
            <img src={`${webPath}${showImg}`} alt="" />
          </figure>
        </Box>
      </Modal>
      <DataGrid
        getRowClassName={() => rowsClassName}
        sx={{ fontSize: "12px", border: "none" }}
        rows={productsImport}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 120]}
      />
    </>
  );
}

export default ImportDataGrid;
