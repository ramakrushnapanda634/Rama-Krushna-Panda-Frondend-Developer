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
  const [data, setData] =useState([]);
  const [filterVal, setFilterVal] = useState([]);
   const [common, setcommon] = useState([]);
   const [popup, setPopup] = useState([]);
   const [togle, setTogle] = useState(false);
   const [showPerPage, setShowPerPage] = useState(21);
   const [pagination, setPagination] = useState({
     start: 0,
     end: showPerPage,
   });
   const onPaginationChange = (start, end) => {
     setPagination({ start: start, end: end });
   };
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => {
        // console.log(res.data.products)
        setData(res.data.products);
         setcommon(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(data);
  const changeContent = (item) => {
    setPopup([item]);
    setTogle(!togle);
  };

  const h2l = () => {
    const filteredB = [...common].sort((a, b) => b.population - a.population);
    console.log(filteredB);
    setData(filteredB);
  };
  const l2h = () => {
    const filtered = [...common].sort((a, b) => a.population - b.population);
    console.log(filtered);

    setData(filtered);
  };
const handleChange = (e) => {
  const filterResult = data.filter(
    (item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      item.country.toLowerCase().includes(e.target.value.toLowerCase())
  );

  setData(filterResult);
  setFilterVal(e.target.value);
};
  return (
    <div>
      <Box>
        <h3>Sort By Price</h3>
        <Button onClick={h2l}>High To low</Button>
        <Button onClick={l2h}>Low to High</Button>
      </Box>
      <p>Search for Country or Name</p>
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

              <Box> Name:{item.name}</Box>
              <Box>Country:{item.country}</Box>
              <Box>Population:{item.population}</Box>
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
                  <Box>
                    <img src={item.image} alt="flag" width={100} />
                  </Box>
                  <Box>Name{item.name}</Box>
                  <Box>Country:{item.country}</Box>
                  <Box>Population:{item.population}</Box>
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