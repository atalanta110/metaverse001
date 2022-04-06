/* eslint-disable jsx-a11y/alt-text */
import { Box } from "@mui/system";
import React, { FC, useState } from "react";
import useMobile from "../../hooks/useMobile";
import {
  Bold,
  CustomButton,
  FilterBtn,
  H,
  NewestBtn,
  TextNormal,
} from "../CustomizeComponents";
import filterIcon from "../../assets/images/market/filter.svg";

import cart from "../../assets/images/market/cart.svg";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

interface NftContainerProps {
  style?: any;
  name: string;
  img: any;
  arv?: number; // not usable
  balance: string;
  id?: string;
  courrency: string;
}

const NftContainer: FC<NftContainerProps> = (props: NftContainerProps) => {
  let navigate = useNavigate();
  return (
    <Box
      className="nft_container_nft"
      style={{ ...props.style }}
      m="auto"
      onClick={() => navigate("/market/item/" + props?.id)}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Bold>{props.name}</Bold>
        <CustomButton
          style={{ fontSize: 12, padding:"7px 30px"}}
          onClick={(e: any) => {
            e.navigate("/market/item/" + props?.id);
          }}
        >
          View
        </CustomButton>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* <NewestBtn style={{ fontSize: 15 }}>{props.balance}</NewestBtn> */}
        <NewestBtn style={{ fontSize: 14, width: "100%" }}>
          {props.courrency}
        </NewestBtn>
      </Box>
      <Box className="nft_img_container">
        <Box className="nft_img_wrapper_nft" style={{ overflow: "hidden" }}>
          <img src={props.img} width="100%" className="products-img" />
        </Box>
      </Box>
    </Box>
  );
};

export default NftContainer;
