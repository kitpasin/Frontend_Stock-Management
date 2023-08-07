import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

function Table({
    filteredProduct,
    selectedReport,
    setSelectedProduct,
}) {
    const webPath = useSelector((state) => state.app.webPath);
    const [isHovered, setIsHovered] = React.useState(false);

    const onRowsSelectionHandler = (ids) => {
        const selectedRowsData = ids.map((id) =>
            filteredProduct.find((product) => product.id === id)
        );
        setSelectedProduct(selectedRowsData);
    };

    const columns = [
        {
            field: "thumbnail_link",
            headerName: "ภาพ",
            width: 50,
            headerClassName: "table-columns",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <div style={{ background: "#D0D0E2", borderRadius: "5px" }}>
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
            width: isHovered ? 290 : 192.5,
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
            field: "quantityPerUnit",
            headerAlign: "center",
            align: "center",
            width: 192.5,
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
            width: 192.5,
            headerClassName: "table-columns",
        },
        {
            field: "oc_unit",
            width: 192.5,
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
            width: 192.5,
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
            width: 192.5,
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
            width: 192.5,
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
            width: 192.5,
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
