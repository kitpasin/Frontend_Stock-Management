import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function ImportDataGrid({ productsImport }) {
  const webPath = useSelector((state) => state.app.webPath);
  const { displayName } = useSelector((state) => state.auth.profile);
  const [isHovered, setIsHovered] = React.useState(false);

  const columns = [
    {
      field: "thumbnail_link",
      headerName: "ภาพ",
      width: 50,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <figure
          style={{
            background: "#D0D0E2",
            borderRadius: "5px",
            padding: ".1rem",
          }}
        >
          <Avatar
            alt="Thumbnail"
            src={`${webPath}${params.row.thumbnail_link}`}
          />
        </figure>
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
            style={{ fontSize: "12px", lineHeight: "12.5px", color: "#9993B4" }}
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
