import React from "react";
import "../App.css";
import { useEffect,useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";
import Pagination from "./Pagination";
const Sample = () => {
  const [data, setData] = useState([]);
  const [filterVal, setFilterVal] = useState([]);
  const [common, setcommon] = useState([]);
  const [popup, setPopup] = useState([]);
  const [togle, setTogle] = useState(false);

  const [showPerPage, setShowPerPage] = useState(8);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };
  //http://localhost:8080/api/products
  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v3/capsules")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setcommon(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(data);
  const changeContent = (item) => {
    setPopup([item]);
    setTogle(!togle);
  };

  const h2l = () => {
    const filteredB = [...common].sort((a, b) => b.reuse_count - a.reuse_count);
    console.log(filteredB);
    setData(filteredB);
  };
  const l2h = () => {
    const filtered = [...common].sort((a, b) => a.reuse_count - b.reuse_count);
    console.log(filtered);

    setData(filtered);
  };
  const handleChange = (e) => {
    const filterResult = data.filter(
      (item) =>
        item.status.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.type.toLowerCase().includes(e.target.value.toLowerCase()) 
       
    );

    setData(filterResult);
    setFilterVal(e.target.value);
  };
  return (
    <div  >
      <Box>
        <h1>Sort By Reuse_Count</h1>
        <Button onClick={h2l}>High To low</Button>
        <Button onClick={l2h}>Low to High</Button>
      </Box>
      <h1>Search for Status  or Type</h1>
      <Input type="searh" value={filterVal} onChange={(e) => handleChange(e)} />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 5, sm: 1, md: 3 }}
        style={{ gap: "30px" }}
        mt={4}
      >
        {data.slice(pagination.start, pagination.end).map((item, index) => {
          return (
            <Box
              key={index}
              style={{ boxShadow: "rgba(0, 5, 1, 0.16) 0px 1px 4px" }}
            >
              <Box>
                {" "}
                <img src={item.image} alt="" width={150}></img>
              </Box>

              <Box> Capsule_serial:{item.capsule_serial}</Box>
              <Box>Capsule_id:{item.capsule_id}</Box>
              <Box>Status:{item.status}</Box>
              <Box>Original_launch:{item.original_launch}</Box>
              <Box>Type:{item.type}</Box>
              <Box>Reuse_Count:{item.reuse_count}</Box>
              <Box component="span" sx={{ p: 0.5, border: "1px dashed red" }}>
                <Button onClick={() => changeContent(item)}>
                  More Details Page
                </Button>
              </Box>
            </Box>
          );
        })}
      </Grid>
      {togle && (
        <Grid className="pop_up_container" onClick={changeContent}>
          <Grid className="pop_up_body" onClick={(e) => e.stopPropagation()}>
            <Grid className="pop_up_header">
              <Button onClick={changeContent}>X</Button>
            </Grid>
            <Grid className="pop_up_content">
              {popup.map((item, index) => (
                <Grid key={index}>
                  <Box> Capsule_serial:{item.capsule_serial}</Box>
                  <Box>Capsule_id:{item.capsule_id}</Box>
                  <Box>Status:{item.status}</Box>
                  <Box>Original_launch:{item.original_launch}</Box>
                  <Box>Type:{item.type}</Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
      <Pagination
        showPerPage={showPerPage}
        onPaginationChange={onPaginationChange}
        total={data.length}
      />
    </div>
  );
};

export default Sample;
//  