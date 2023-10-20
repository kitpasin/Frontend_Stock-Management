import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Button, Modal, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
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

export default function Table({ productsData, refreshData, setRefreshData, setProductShow, setOpenModal }) {
  const webPath = useSelector((state) => state.app.webPath);
  const [showImg, setShowImg] = useState(null)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function openImgModal(params) {
    setShowImg(params.row.thumbnail_link)
    handleOpen();
  }

  console.log(productsData)

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
      field: "title",
      headerName: "ชื่อรายการ",
      headerAlign: "center",
      align: "left",
      width: 400,
      headerClassName: "table-columns",
      renderCell: (params) => {
        return (
          <div
            style={{ paddingLeft: "0" }}
          >
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
      field: "export_id",
      headerName: "รหัสการเบิก",
      headerAlign: "center",
      align: "center",
      width: 200,
      headerClassName: "table-columns",
    },
    {
      field: "export_values",
      headerName: "จำนวนเบิก",
      headerAlign: "center",
      align: "center",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "formatted_created_at",
      headerName: "วันเวลาเบิก",
      headerAlign: "center",
      align: "center",
      width: 150,
      headerClassName: "table-columns",
    },
    {
      field: "mfd_date",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "10px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            MFD
          </Typography>
          <Typography
            style={{ fontSize: "10px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            EXP
          </Typography>
        </div>
      ),
      renderCell: (params) => (
        <div>
          <p style={{ fontSize: "12px", lineHeight: "12.5px", color: "#000" }}>
            {params.row.mfd_date}
          </p>
          <p
            style={{
              fontSize: "12px",
              lineHeight: "12.5px",
              color: "#FF0000",
            }}
          >
            {params.row.exp_date}
          </p>
        </div>
      ),
    },
    {
      field: "main_cate_name",
      headerName: "หมวดหมู่",
      headerAlign: "center",
      align: "center",
      width: 150,
      headerClassName: "table-columns",
    },
    {
      field: "amount_name",
      headerName: "หน่วยนับ",
      headerAlign: "center",
      align: "center",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "volumnPerUnit",
      headerAlign: "center",
      align: "center",
      width: 150,
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
    },
    {
      field: "action",
      headerName: "ดึงข้อมูล",
      headerAlign: "center",
      align: "center",
      width: 90,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <Button
          id={`basic-button${params.row.id}`}
          onClick={() => handleClick(params.row)}
          style={{
            background: "#3B336B",
            minWidth: "40px",
            width: "40px",
            height: "40px",
            padding: ".65rem",
            paddingLeft: ".5rem",
            borderRadius: "5px",
          }}
        >
          <FontAwesomeIcon icon={faFileImport} size="xl" style={{ color: "#ffffff" }} />
        </Button>
      ),
    },
  ];

  const rowsClassName = "table-rows";

  // Remove duplicate products based on product_id
  const uniqueProductsMap = new Map();
  productsData.forEach((item) => {
    uniqueProductsMap.set(item.product_id, item);
  });
  const uniqueProductsData = Array.from(uniqueProductsMap.values());

  const handleClick = (product) => {
    const data = productsData.filter((item) => item.id === product.id)
    if (data) {
      const dd = data[0];
      const result = {
        ...dd,
        image_path: dd.thumbnail_link || "",
        new_barcode: dd.barcode_number,
        barcode: dd.product_barcode,
        counting_unit_name: dd.amount_name,
        unit_name: dd.net_name,
        product_cost: dd.unit_price,
        state1: false,
        state2: false,
        state3: false,
        reset: 0,
      };
      setProductShow(result)
      setOpenModal(true)
    }
  }

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
        rows={productsData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 100]}
        checkboxSelection={false}
      />
    </div>
  );
}
