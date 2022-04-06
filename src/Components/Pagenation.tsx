/* eslint-disable jsx-a11y/alt-text */
import { Box, Pagination } from "@mui/material";
import React, { FC, useState } from "react";
import arrowRight from "../assets/images/market/arrowright.svg";
import arrowLeft from "../assets/images/market/arrowleft.svg";
import _ from "lodash";
import useMobile from "../hooks/useMobile";
import styles from "../assets/css/pagination.module.scss";
import clsx from "clsx";

interface PagenationProps {
  page: number;
  count: number;
  onChange: (data: React.ChangeEvent<unknown>, value: number) => void;
}

const Pagenation: FC<PagenationProps> = (props: PagenationProps) => {
  return (
    <div
      className={clsx(
        "flex justify-center items-center",
        styles.root_pagination
      )}
    >
      <Pagination
        page={props.page}
        count={props.count}
        onChange={props.onChange}
        shape="rounded"
        color="primary"
      />
    </div>
  );
};

export default Pagenation;
