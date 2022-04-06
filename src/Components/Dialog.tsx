/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { Cbox } from "./CustomizeComponents";
import close from "../assets/images/home/close.svg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface DialogProps {
  open: boolean;
  mobile?: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function DialogBox(props: DialogProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (props.open !== open) {
      setOpen(props.open);
    }
  }, [props.open]);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const dispatchRender = () => {
    switch (props.mobile) {
      case true:
        return renderMobile();
      default:
        return renderWeb();
    }
  };

  const renderWeb = () => {
    return (
      <Cbox
        borderRadius="8px"
        style={{
          background:
            "linear-gradient(180deg, rgba(202, 249, 54, 1) 0%, rgba(104, 174, 209, 0) 100%)",
        }}
        p="2px"
      >
        <Cbox
          width="100%"
          position="relative"
          overflow="hidden"
          borderRadius="8px"
          style={{ background: "#1E1E1E" }}
          flexDirection="column"
          pat="50"
          pal="58"
          pab="64"
        >
          <Cbox
            position="absolute"
            right="0"
            top="0"
            className="join_community_bg"
            zIndex="1"
            height="100%"
            width="50%"
          ></Cbox>
          <Cbox
            zIndex="3"
            onClick={handleClose}
            pa="12"
            right="0"
            top="0"
            position="absolute"
            style={{
              background:
                "linear-gradient(133.24deg, rgba(203, 250, 52, 0.62) -15.55%, #80BBD5 93.32%)",
            }}
            borderRadius="0px 8px"
          >
            <img src={close} alt="close" className="cursor-pointer" />
          </Cbox>
          <Cbox fsize="28" bold>
            {props.title}
          </Cbox>
          <Cbox cmb="13" fsize="14" dangerouslySetInnerHTML={{__html: props.content}}></Cbox>
        </Cbox>
      </Cbox>
    );
  };

  const renderMobile = () => {
    return (
      <Cbox
        borderRadius="8px"
        style={{
          background:
            "linear-gradient(180deg, rgba(202, 249, 54, 1) 0%, rgba(104, 174, 209, 0) 100%)",
        }}
        p="2px"
      >
        <Cbox
          width="100%"
          mobile
          position="relative"
          overflow="hidden"
          borderRadius="8px"
          style={{ background: "#1E1E1E" }}
          flexDirection="column"
          pt="41px"
          pl="51px"
          pb="43px"
        >
          <Cbox
            pa="12"
            right="0"
            top="0"
            position="absolute"
            style={{
              background:
                "linear-gradient(133.24deg, rgba(203, 250, 52, 0.62) -15.55%, #80BBD5 93.32%)",
            }}
            borderRadius="0px 8px"
          >
            <img src={close} alt="close" className="cursor-pointer" />
          </Cbox>
          <Cbox
            mobile
            fontSize="28px"
            bold
            pr="137px"
            lineHeight="110%"
            mb="10px"
          >
            {props.title}
          </Cbox>
          <Cbox mobile mb="13px" fontSize="14px" pr="103px" lineHeight="110%">
            {props.content}
          </Cbox>
        </Cbox>
      </Cbox>
    );
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      sx={{ backgroundColor: "#505050ad" }}
      PaperProps={
        !props.mobile
          ? {
              sx: {
                width: "75vw",
                height: "auto",
                top: "-10%",
                borderRadius: "8px",
              },
            }
          : {
              sx: {
                width: "338px",
                height: "auto",
                borderRadius: "8px",
                top: "-150px",
              },
            }
      }
      open={open}
      fullScreen={true}
    >
      {dispatchRender()}
    </BootstrapDialog>
  );
}
