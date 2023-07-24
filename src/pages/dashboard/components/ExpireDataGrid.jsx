import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

function ExpireDataGrid({ productsAboutToExpire }) {
  const webPath = useSelector((state) => state.app.webPath);

  const columns = [
    {
      field: "thumbnail_link",
      headerName: "ภาพ",
      width: 50,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <figure style={{ background: "#D0D0E2", borderRadius: "5px", padding: ".1rem" }}>
          <Avatar alt="Thumbnail" src={`${webPath}${params.row.thumbnail_link}`} />
        </figure>
      ),
    },
    {
      field: "name",
      headerName: "ชื่อรายการ",
      headerAlign: "center",
      align: "center",
      width: 145,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <div style={{ paddingLeft: "1rem" }}>
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>{params.row.title}</p>
          <p style={{ fontSize: "12px", lineHeight: "12.5px", color: "#9993B4" }}>
            {params.row.product_id}
          </p>
        </div>
      ),
    },
    {
      field: "dateEXP",
      headerAlign: "center",
      align: "center",
      width: 100,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            จำนวนวัน EXP
          </Typography>
        </div>
      ),
      renderCell: (params) => {
        const endDate = dayjs(params.row.exp_date);
        const today = dayjs();
        const remainingDays = endDate.diff(today, "day");
        return (
          <div>
            <p
              style={{
                fontSize: "12px",
                lineHeight: "12.5px",
                color: remainingDays + 1 <= 30 ? "#FF0000" : "#000",
              }}
            >
              {remainingDays + 1 === 0 ? "หมดอายุ" : remainingDays + 1 + " วัน"}
            </p>
          </div>
        );
      },
    },
    {
      field: "counting_unit_name",
      headerName: "หน่วยนับ",
      headerAlign: "center",
      align: "center",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "MEDEXP",
      width: 125,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            MFD
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            EXP
          </Typography>
        </div>
      ),
      renderCell: (params) => (
        <div>
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>{params.row.mfd_date}</p>
          <p style={{ fontSize: "12px", lineHeight: "12.5px", color: "#9993B4" }}>
            {params.row.exp_date}
          </p>
        </div>
      ),
    },
    {
      field: "netweight",
      headerAlign: "center",
      align: "center",
      width: 125,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ปริมาตรสุทธิ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
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
      field: "selling_price",
      headerAlign: "center",
      align: "center",
      width: 125,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ราคาขายจริง
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
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
        rows={productsAboutToExpire}
        disableRowSelectionOnClick
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 125]}
      />
    </>
  );
}

export default ExpireDataGrid;
