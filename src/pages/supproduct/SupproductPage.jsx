import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, TextField } from "@mui/material";
import { Card } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";

import "./SupproductPage.scss";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import Table from "./Table";

export default function SupproductPage() {
  const [refreshData, setRefreshData] = useState(0);

  return (
    
    <div>
      <Table
        productsData={[]}
        refreshData={refreshData}
        setRefreshData={setRefreshData}
      />
    </div>
  );
}
