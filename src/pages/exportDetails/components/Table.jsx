import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Avatar, Modal, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
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

function Table({ exportedProductDetails, refreshData, setRefreshData }) {
  const { displayName } = useSelector((state) => state.auth.profile);
  const webPath = useSelector((state) => state.app.webPath);
  const [showImg, setShowImg] = useState(null)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function openImgModal(params) {
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
            src={params.row.thumbnail_link ? `${webPath}${params.row.thumbnail_link}` : "/images/no-image.png"}
            alt={`Image ${params.thumbnail_title}`}
          />
        </div>
      ),
    },
    {
      field: "title",
      headerName: "ชื่อรายการ",
      headerAlign: "center",
      align: "left",
      width: 140,
      headerClassName: "table-columns",
      renderCell: (params) => {
        return (
          <div style={{ paddingLeft: "0" }}>
            <p
              style={{ fontSize: "12px", lineHeight: "12.5px" }}
            >{`${params.row.title}`}</p>
            <p
              style={{
                fontSize: "12px",
                lineHeight: "12.5px",
                color: "#9993B4",
              }}
            >
              {params.row.product_id}
            </p>
          </div>
        );
      },
    },
    {
      field: "p_type",
      headerName: "ประเภทสินค้า",
      headerAlign: "center",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
    },
    {
      field: "export_id",
      headerName: "รหัสเบิก",
      headerAlign: "center",
      align: "left",
      width: 140,
      headerClassName: "table-columns",
    },
    {
      field: "supplier_name",
      headerAlign: "center",
      headerName: "ซัพพลายเออร์",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
    },
    {
      field: "product_barcode",
      headerAlign: "center",
      headerName: "บาร์โค้ดเดิม",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
    },
    {
      field: "barcode_number",
      headerAlign: "center",
      headerName: "บาร์โค้ดใหม่",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
    },
    {
      field: "export_quantity",
      headerAlign: "center",
      headerName: "จำนวนเบิก",
      align: "center",
      width: 73,
      headerClassName: "table-columns",
    },
    {
      field: "quantityPerUnit",
      headerAlign: "center",
      headerName: "คงเหลือ",
      align: "center",
      width: 73,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <div>
          <p
            style={{
              fontSize: "12px",
              lineHeight: "12.5px",
              color:
                params.row.import_value -
                  (params.row.export_value +
                    params.row.export_defective_value) <=
                params.row.alert_stock
                  ? "#ff0000"
                  : "#000",
            }}
          >
            {params.row.import_value -
              (params.row.export_value + params.row.export_defective_value)}
          </p>
        </div>
      ),
    },
    {
      field: "export_type",
      headerName: "เบิกไปที่",
      headerAlign: "center",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
    },
    {
      field: "formatted_created_at",
      headerName: "วันที่เบิก",
      headerAlign: "center",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
    },
    {
      field: "account_name",
      headerAlign: "center",
      headerName: "ผู้ใช้งาน",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
      // renderCell: () => (
      //   <div style={{ lineHeight: "12.5px" }}>{displayName}</div>
      // ),
    },
    {
      field: "picker_name",
      headerAlign: "center",
      headerName: "ผู้เบิก",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
    },
    {
      field: "approver_name",
      headerAlign: "center",
      headerName: "ผู้อนุมัติ",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
    },
  ];

  const rowsClassName = "table-rows";

  return (
    <div>
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
        rows={exportedProductDetails}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 100]}
        disableColumnSelector
      />
    </div>
  );
}

export default Table;
