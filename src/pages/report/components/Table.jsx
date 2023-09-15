import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Modal, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Box, width } from "@mui/system";

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
  alignItems: "center",
};

function Table({ filteredProduct, selectedReport, setSelectedProduct }) {
  const webPath = useSelector((state) => state.app.webPath);
  const [isHovered, setIsHovered] = React.useState(false);
  const [showImg, setShowImg] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) =>
      filteredProduct.find((product) => product.id === id)
    );
    setSelectedProduct(selectedRowsData);
  };

  function openImgModal(params) {
    console.log(params.row.thumbnail_link);
    setShowImg(params.row.thumbnail_link);
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
        <div
          style={{
            background: "#D0D0E2",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => openImgModal(params)}
        >
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
      width: isHovered ? 290 : 140,
      headerClassName: "table-columns",
      renderCell: (params) => {
        return (
          <div
            style={{ paddingLeft: "0" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
      field: "p_type",
      headerName: "ประเภทสินค้า",
      headerAlign: "center",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
    },
    {
      field: "product_barcode",
      headerName: "บาร์โค้ดเดิม",
      headerAlign: "center",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
      renderCell: (params) => {
        return (
          <div>
            <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>
              {params.row.product_barcode !== null
                ? params.row.product_barcode
                : "-"}
            </p>
          </div>
        );
      },
    },
    {
      field: "barcode_number",
      headerName: "บาร์โค้ดใหม่",
      headerAlign: "center",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
      renderCell: (params) => {
        return (
          <div>
            <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>
              {params.row.barcode_number !== null
                ? params.row.barcode_number
                : "-"}
            </p>
          </div>
        );
      },
    },
    {
      field: "supplier_barcode",
      headerName: "บาร์โค้ดซัพพลายเออร์",
      headerAlign: "center",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
      renderCell: (params) => {
        return (
          <div>
            <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>
              {params.row.supplier_barcode !== null
                ? params.row.supplier_barcode
                : "-"}
            </p>
          </div>
        );
      },
    },
    {
      field: "quantityPerUnit",
      headerAlign: "center",
      align: "center",
      width: 70,
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
      field: "purchase_date",
      headerName: "วันที่ซื้อ",
      headerAlign: "center",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
    },
    {
      field: "oc_unit",
      width: 140,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            ค่าดำเนินการ
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            /หน่วย
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "unit_price",
      width: 140,
      headerAlign: "center",
      align: "center",
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
            /หน่วย
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "set_profit",
      width: 70,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            กำไร
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            (%)
          </Typography>
        </div>
      ),
    },
    {
      field: "pp_vat",
      headerAlign: "center",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            ราคาขาย
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}
          >
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "selling_price",
      width: 140,
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
        rows={filteredProduct}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 100]}
        onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
      />
    </div>
  );
}

export default Table;
