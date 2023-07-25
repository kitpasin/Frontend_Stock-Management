import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import MenuItemList from "../components/MenuItemList";
import dayjs from "dayjs";

function Table({ productsData, refreshData, setRefreshData, productSelected, setProductSelected }) {
  const webPath = useSelector((state) => state.app.webPath);

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => productsData.find((product) => product.id === id));
    setProductSelected(selectedRowsData);
  };

  const columns = [
    {
      field: "image",
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
      width: 150,
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
      field: "import_value",
      headerAlign: "center",
      align: "center",
      width: 75.35,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            นำเข้า
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย
          </Typography>
        </div>
      ),
    },
    {
      field: "defective_product",
      headerAlign: "center",
      align: "center",
      width: 75.35,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            สินค้า
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            มีปัญหา
          </Typography>
        </div>
      ),
    },
    {
      field: "",
      headerAlign: "center",
      align: "center",
      width: 75.35,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            คงเหลือ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
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
              color: params.row.import_value <= 50 ? "#ff0000" : "#000",
            }}
          >
            {params.row.import_value - params.row.export_value - params.row.export_defective_value}
          </p>
        </div>
      ),
    },
    {
      field: "purchase_date",
      headerName: "วันที่ซื้อ",
      headerAlign: "center",
      align: "center",
      width: 90,
      headerClassName: "table-columns",
    },
    {
      field: "MEDEXP",
      width: 90,
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
      field: "dateEXP",
      headerAlign: "center",
      align: "center",
      width: 75.35,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            จำนวนวัน
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            EXP
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
              {remainingDays + 1 <= 0 ? "หมดอายุ" : remainingDays + 1 + " วัน"}
            </p>
          </div>
        );
      },
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
          <p>{params.row.vat_name === null ? "0%" : params.row.vat_name}</p>
        </div>
      ),
    },
    {
      field: "main_cate_name",
      headerName: "หมวดหมู่",
      headerAlign: "center",
      align: "center",
      width: 75.35,
      headerClassName: "table-columns",
    },
    {
      field: "counting_unit_name",
      headerName: "หน่วยนับ",
      headerAlign: "center",
      align: "center",
      width: 75.35,
      headerClassName: "table-columns",
    },
    {
      field: "netweight",
      headerAlign: "center",
      align: "center",
      width: 75.35,
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
    },
    {
      field: "total",
      headerAlign: "center",
      align: "center",
      width: 75.35,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ค่าดำเนินการ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "oc_unit",
      width: 50,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ดำเนินการ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "product_cost",
      headerName: "ราคาดิบ (THB)",
      headerAlign: "center",
      align: "center",
      width: 75.35,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ราคาดิบ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "cost_per_unit",
      headerAlign: "center",
      align: "center",
      width: 50,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ราคาดิบ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "unit_price",
      headerName: "ต้นทุน (THB)",
      headerAlign: "center",
      align: "center",
      width: 75.35,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ต้นทุน
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "total_cost",
      width: 50,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            Total
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "set_profit",
      headerName: "กำไร",
      width: 50,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
    },
    {
      field: "pp_vat",
      headerAlign: "center",
      align: "center",
      width: 50,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ราคาขาย
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "selling_price",
      width: 75.35,
      headerAlign: "center",
      align: "center",
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
    {
      field: "action",
      headerName: "จัดการสินค้า",
      headerAlign: "center",
      align: "center",
      width: 90,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <MenuItemList
          params={params}
          refreshData={refreshData}
          setRefreshData={setRefreshData}
          setProductSelected={setProductSelected}
        />
      ),
    },
  ];

  const rowsClassName = "table-rows";

  return (
    <div>
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
        onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
      />
    </div>
  );
}

export default Table;
