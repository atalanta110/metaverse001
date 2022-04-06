/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import _ from "lodash";
import "../assets/css/market.scss";
import Filterbar from "../Components/Market/Filterbar";
import NftContainer from "../Components/Market/NftContainer";
import useMobile from "../hooks/useMobile";
import nft1 from "../assets/images/market/nft1.svg";
import nft2 from "../assets/images/market/nft2.svg";
import Pagenation from "../Components/Pagenation";
import JoinNow from "../Components/Home/JoinNow";
import { getMarketApi } from "../services";

interface IProduct {
  id: "string";
  i: "string";
  p: "string";
  n: "string";
  c: "string";
  l: {
    id: number | null;
    x: number | null;
    y: number | null;
    i: string;
    o: string | null;
    h: number | null;
    l: string | null;
    w: number | null;
    n: string;
    p: number | null;
    t: string | null;
    s: string | null;
    q: number | null;
    thumb: null | {
      name: string;
    };
  };
}
interface NftContainerProps {
  name: string;
  img: any;
  balance: string;
  id?: string;
  courrency: string;
}
const Market: React.FC = () => {
  const { isMobile } = useMobile();
  const [count, setCount] = useState(1);
  const [pages, setPages] = useState(1);
  const [products, setProducts] = useState<NftContainerProps[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const money = (money:any) => {
    if(money.c === "ETH")
      return money.p + " " + money.c;
    const m = (parseInt(money.p)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+ ' '+money.c;
    return m;
  }
  const handleApi = (number: number) => {
    getMarketApi(number)
      .then((result) => {
        setTotalResults(result.data.total);
        setCount(result.data.last_page);
        const data = result.data.data.map((vals: any) => ({
          name: vals.l.n,
          img: vals.l.thumb?.name
            ? "https://d16rw3fwb124e0.cloudfront.net/images/" +
              vals.l.thumb?.name
            : nft1,
          balance: "123 |  200",
          id: vals.i,
          
          // courrency: vals.p + " " + vals.c,
          courrency: money(vals),
        }));
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const pageChange = (data: React.ChangeEvent<unknown>, value: number) => {
    setPages(value);
    handleApi(value);
  };

  useEffect(() => {
    handleApi(pages);
  }, []);

  const renderWebMarket = () => {
    return (
      <Box className="market">
        <Filterbar results={totalResults} />
        <Grid container spacing={{ lg: 2, md: 3, sm: 2 }}>
          {_.map(products, (each, index) => {
            return (
              <Grid item lg={4} md={6} sm={12} key={index} mb={8}>
                <NftContainer
                  style={{ width: "90%" }}
                  name={each.name}
                  img={each.img}
                  courrency={each.courrency}
                  balance={each.balance}
                  id={each.id}
                />
              </Grid>
            );
          })}
        </Grid>
        <Box mb={10}>
          <Pagenation page={pages} count={count} onChange={pageChange} />
        </Box>
        <JoinNow></JoinNow>
      </Box>
    );
  };

  const renderMobileMarket = () => {
    return (
      <Box display="flex" flexDirection="column" p="25px">
        <Filterbar results={totalResults} />
        <Box mt="-340px">
          {_.map(products, (each, index) => {
            return (
              <NftContainer
                style={{ width: "100%", marginBottom: 100 }}
                name={each.name}
                img={each.img}
                courrency={each.courrency}
                balance={each.balance}
                id={each.id}
              />
            );
          })}
        </Box>
        <Box mb={10}>
          <Pagenation page={pages} count={count} onChange={pageChange} />
        </Box>
        <JoinNow></JoinNow>
      </Box>
    );
  };

  return !isMobile ? renderWebMarket() : renderMobileMarket();
};

export default Market;
