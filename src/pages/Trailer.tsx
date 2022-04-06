/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-duplicate-props */
import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import useMobile from "../hooks/useMobile";

import _ from "lodash";
import { Cbox } from "../Components/CustomizeComponents";

const RoadMap: React.FC = () => {
  
  const { isMobile } = useMobile();
  let padding = '75px 70px 70px 150px';
  if(isMobile){
    padding = '15px 10px 10px 10px';
  }
  
  return (
    <Box padding={padding} position="relative">
      <Grid container spacing={8} rowSpacing={8}>
        <Grid item xs={12} md={6} style={{minHeight:"400px"}}>
          <iframe
            width={600}
            height={500}
            src="https://www.youtube.com/embed/ELhhqlDrzQQ"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
            title="YouTube video player"
            className="youtube"
          ></iframe>
        </Grid>
        <Grid item xs={12} md={6} style={{minHeight:"400px"}}>
          <iframe
            width={600}
            height={500}
            src="https://www.youtube.com/embed/jAwk_YUGvyE"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="youtube"
          ></iframe>
        </Grid>
        <Grid item xs={12} md={6} style={{minHeight:"400px"}}>
          <iframe
            width={600}
            height={500}
            src="https://www.youtube.com/embed/TgKbe4B4cZg"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="youtube"
          ></iframe>
        </Grid>
        <Grid item xs={12} md={6} style={{minHeight:"400px"}}>
          <iframe
            width={600}
            height={500}
            src="https://www.youtube.com/embed/eeCX3AVlIxw"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="youtube"
          ></iframe>
        </Grid>
        <Grid item xs={12} md={6} style={{minHeight:"400px"}}>
          <iframe
            width={600}
            height={500}
            src="https://www.youtube.com/embed/bGVOrwKn-R0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="youtube"
          ></iframe>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoadMap;
