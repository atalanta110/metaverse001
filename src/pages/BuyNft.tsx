/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState, useContext } from "react";
import { Box, Grid } from "@mui/material";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Carousel from "react-material-ui-carousel";
import clsx from "clsx";
import { ContextSetState } from "../context";
import "../assets/css/market.scss";
import Filterbar from "../Components/Market/Filterbar";
import NftContainer from "../Components/Market/NftContainer";
import useMobile from "../hooks/useMobile";
import nft1 from "../assets/images/market/nft1.svg";
import nft2 from "../assets/images/market/nft2.svg";
import arrow from "../assets/images/market/arrowdown.svg";
import cart from "../assets/images/market/cart2.svg";
import copy from "../assets/images/market/copy.svg";
import twitter from "../assets/images/footer/twitter.svg";
import twitch from "../assets/images/footer/twitch.svg";
import instagram from "../assets/images/footer/instagram.svg";
import facebook from "../assets/images/footer/facebook.svg";
import nftIcon from "../assets/images/market/nftIcon.svg";
import { getMarketItemApi } from "../services";
import useGMTDeadLine from "../hooks/useGMTDeadLine";
import { getLandPicture, getLandImage } from "../Components/Map/api";
import {
  Bold,
  CustomButton,
  FilterBtn,
  Cbox,
  H,
  NewestBtn,
  TextNormal,
  WatchButton,
} from "../Components/CustomizeComponents";
import nft from "../assets/images/market/nft1.svg";
import JoinNow from "../Components/Home/JoinNow";
import { api, oGet } from "../Helper";
import useAuth from "../hooks/useAuth";
import Web3 from 'web3';
import Web3Helper from "../services/web3";

declare const window: any;

const BuyNft: React.FC = ({ open, setOpen, login }: any) => {
  // const { login } = useAuth();
  const { isMobile } = useMobile();
  const { id } = useParams();
  const navigate = useNavigate();
  const thisPage = window.location.href;
  const contextSetState = useContext(ContextSetState);
  const EthLandSaleAddress = '0x16d2feb011778f45c2A2E917cA3C10ce79f9CBbE';

  const [item, setItem] = useState({
    name: "",
    price: "",
    x: "",
    y: "",
    size: "",
    image: "",
    picture: 0,
  });
  const times = useGMTDeadLine();
  const money = (money: any) => {
    if (money.c === "ETH") return money.p + " " + money.c;
    const m =
      parseInt(money.p)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,") +
      " " +
      money.c;
    return m;
  };
  const handleItemApi = (id: string) => {
    if (id.length) {
      getMarketItemApi(id)
        .then(({ data }) => {
          setItem({
            name: data.l.n,
            price: money(data),
            x: String(data.l.x),
            y: String(data.l.y),
            size: String(data.l.q),
            image: data.l.thumb?.name ?? "",
            picture: data.l.p,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    handleItemApi(id ?? "");
  }, [id]);    

  if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    if (!window.ethereum) {
      console.error('Does not support window.ethereum!');
    } else {
      window.web3 = new Web3(window.ethereum);
    }
  }

  const randomStringFunction = (length: Number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const buyThisNft = async () => {
    // props.setOpen(true);
    // await Login(ConnectorNames.Injected)
    // setOpen(true);
    contextSetState!((data) => ({
      ...data,
      isWalletModalOpen: true,
    }));

    if (window.web3) {
      await window.ethereum.enable();
    }

    const accounts = await window.web3.eth.getAccounts();
    const signMessage = await window.web3.eth.personal.sign(randomStringFunction(30), accounts[0]);

    const web3 = await Web3Helper.getInstance();
    const contract = Web3Helper.getEthLandSaleContract(web3, EthLandSaleAddress);

    try {    
      const buyLand = contract.methods.buyLand(accounts[0], accounts[0], item.x, item.y, item.size).call();

      buyLand.then((response: any) => {
        console.log('response :: ', response.message)
      })
      .catch((error: any) => {
        console.log('excuting error :: ', error)
      })
    } catch (error) {      
      console.log('transaction error :: ', error)
    }
  };
  const timeComponents = (
    <Box
      px="10px"
      mr="30px"
      borderRadius="5px"
      style={{
        background:
          "linear-gradient(90deg, rgba(102, 172, 212, 0.1) 0%, rgba(107, 67, 207, 0.1) 100%)",
        width: "100%",
        padding: 10,
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        px="10px"
        mr="30px"
        mt="10px"
        borderRadius="5px"
        style={{
          background:
            "linear-gradient(90deg, rgba(102, 172, 212, 0.1) 0%, rgba(107, 67, 207, 0.1) 100%)",
          paddingBottom: 10,
        }}
        display="flex"
      >
        <Box
          mr="5px"
          borderRadius="5px"
          width="2vw"
          height="100%"
          alignItems="center"
          justifyContent="center"
          display="flex"
          fontWeight="900"
          bgcolor="#CBFA34"
          color="#403E3F"
        >
          {times.days}
        </Box>{" "}
        <Cbox mr="5px" alignItems="center">
          {" "}
          :{" "}
        </Cbox>
        <Box
          mr="5px"
          borderRadius="5px"
          width="2vw"
          height="100%"
          alignItems="center"
          justifyContent="center"
          display="flex"
          fontWeight="900"
          bgcolor="#CBFA34"
          color="#403E3F"
        >
          {times.hours}
        </Box>
        <Cbox mr="5px" alignItems="center">
          {" "}
          :{" "}
        </Cbox>
        <Box
          mr="5px"
          borderRadius="5px"
          width="2vw"
          height="100%"
          alignItems="center"
          justifyContent="center"
          display="flex"
          fontWeight="900"
          bgcolor="#CBFA34"
          color="#403E3F"
        >
          {times.minutes}
        </Box>
        <Cbox mr="5px" alignItems="center">
          {" "}
          :{" "}
        </Cbox>
        <Box
          borderRadius="5px"
          width="2vw"
          height="100%"
          alignItems="center"
          justifyContent="center"
          display="flex"
          fontWeight="900"
          bgcolor="#CBFA34"
          color="#403E3F"
        >
          {times.seconds}
        </Box>
      </Box>
    </Box>
  );
  const timeComponentsMob = (
    <Box
      px="10px"
      mr="30px"
      borderRadius="5px"
      style={{
        background:
          "linear-gradient(90deg, rgba(102, 172, 212, 0.1) 0%, rgba(107, 67, 207, 0.1) 100%)",
        width: "100%",
        padding: 10,
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        px="10px"
        mr="30px"
        mt="10px"
        borderRadius="5px"
        style={{
          background:
            "linear-gradient(90deg, rgba(102, 172, 212, 0.1) 0%, rgba(107, 67, 207, 0.1) 100%)",
          paddingBottom: 10,
        }}
        display="flex"
      >
        <Box
          mr="5px"
          borderRadius="5px"
          width="10vw"
          height="100%"
          alignItems="center"
          justifyContent="center"
          display="flex"
          fontWeight="900"
          bgcolor="#CBFA34"
          color="#403E3F"
        >
          {times.days}
        </Box>{" "}
        <Cbox mr="5px" alignItems="center">
          {" "}
          :{" "}
        </Cbox>
        <Box
          mr="5px"
          borderRadius="5px"
          width="10vw"
          height="100%"
          alignItems="center"
          justifyContent="center"
          display="flex"
          fontWeight="900"
          bgcolor="#CBFA34"
          color="#403E3F"
        >
          {times.hours}
        </Box>
        <Cbox mr="5px" alignItems="center">
          {" "}
          :{" "}
        </Cbox>
        <Box
          mr="5px"
          borderRadius="5px"
          width="10vw"
          height="100%"
          alignItems="center"
          justifyContent="center"
          display="flex"
          fontWeight="900"
          bgcolor="#CBFA34"
          color="#403E3F"
        >
          {times.minutes}
        </Box>
        <Cbox mr="5px" alignItems="center">
          {" "}
          :{" "}
        </Cbox>
        <Box
          borderRadius="5px"
          width="10vw"
          height="100%"
          alignItems="center"
          justifyContent="center"
          display="flex"
          fontWeight="900"
          bgcolor="#CBFA34"
          color="#403E3F"
        >
          {times.seconds}
        </Box>
      </Box>
    </Box>
  );

  const renderMobile = () => {
    return (
      <Box padding="25px" display="flex" flexDirection="column">
        <NewestBtn
          style={{ marginLeft: 10, marginBottom: 20, width: "fit-content" }}
          onClick={() => {
            navigate("/market");
          }}
        >
          <img
            style={{ marginRight: 5, transform: "rotate(90deg)" }}
            src={arrow}
            alt="arrow"
          />
          Back
        </NewestBtn>
        <Box
          style={{
            background:
              "linear-gradient(180deg, rgba(202, 249, 54, 1) 0%, rgba(104, 174, 209, 0) 100%)",
          }}
          padding="2px"
          borderRadius="8px"
          mb="40px"
        >
          <Box
            padding="20px"
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="flex-start"
            bgcolor="#201F2D"
            borderRadius="8px"
          >
            <H mode="mobile" style={{ fontSize: "20px" }}>
              {item.name}
            </H>
            <Box width="100%" mb="20px">
              <div
                className={clsx(
                  `
                    mb-5
                  `
                )}
                style={{}}
              >
                <Carousel
                  className="market-item-carousel-root"
                  autoPlay={false}
                  navButtonsAlwaysVisible
                >
                  {item.image?.length && (
                    <img
                      className="img-scale-down"
                      src={getLandImage(item.image)}
                      alt="ariva-land-personal"
                    />
                  )}

                  <img
                    className="img-scale-down"
                    src={getLandPicture(item.picture)}
                    alt="ariva-land"
                  />
                </Carousel>
              </div>
              {/* <Box display="flex" justifyContent="center">
                <img src={nft} alt="nft" width="100%" />
              </Box> */}
            </Box>
            <Box
              bgcolor="rgba(75, 74, 75, 0.3)"
              p="9px 15px"
              borderRadius="18px"
              mb="20px"
              display="flex"
              justifyContent="space-between"
              width={"100%"}
            >
              <TextNormal>Price</TextNormal>
              <Bold>{item.price}</Bold>
            </Box>
            {/* <Box
              bgcolor="rgba(75, 74, 75, 0.3)"
              p="9px 15px"
              borderRadius="18px"
              mb="20px"
              display="flex"
              justifyContent="space-between"
              width={"100%"}
            >
              <TextNormal>Amount</TextNormal>
              <Bold>4 of 200</Bold>
            </Box> */}
            <Box
              display="flex"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* <NewestBtn>
                Add to cart <img src={cart} alt="" />
              </NewestBtn> */}
              <FilterBtn onClick={buyThisNft}>Buy now</FilterBtn>
            </Box>
            {timeComponentsMob}
          </Box>
        </Box>
        <Box
          style={{
            background:
              "linear-gradient(180deg, rgba(202, 249, 54, 1) 0%, rgba(104, 174, 209, 0) 100%)",
          }}
          padding="2px"
          borderRadius="8px"
        >
          <Box
            padding="20px"
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="flex-start"
            bgcolor="#201F2D"
            borderRadius="8px"
          >
            <Box display="flex" mb="20px">
              <TextNormal style={{ marginRight: 11, display: "inline" }}>
                Token ID: ******
              </TextNormal>
              {/* <img src={copy} alt="copy" style={{ marginRight: 20 }} /> */}
            </Box>
            <Box
              bgcolor="rgba(255, 255, 255, 0.06)"
              borderRadius="10px"
              padding="10px 15px"
              mb="40px"
            >
              <TextNormal>1 Minted</TextNormal>
            </Box>
            {/* <Box
              borderRadius="10px"
              width="100%"
              bgcolor="rgba(255, 255, 255, 0.06)"
              mb="50px"
              p="16px"
              display="flex"
              flexDirection="column"
            >
              <Bold style={{ fontSize: 16 }}>About</Bold>
              <TextNormal style={{ fontSize: 12 }}>
                <b>Type:</b> Entity
              </TextNormal>
              <TextNormal style={{ fontSize: 12 }}>
                <b>Behaviors:</b> Animated decorations
              </TextNormal>
              <TextNormal style={{ fontSize: 12 }}>
                <b>Biomes:</b> None{" "}
              </TextNormal>
              <Box display="flex">
                <TextNormal
                  style={{ fontSize: 12, marginRight: 10, padding: "5px 10px" }}
                >
                  <b>Tags: </b>
                </TextNormal>
                <WatchButton
                  style={{ fontSize: 12, marginRight: 10, padding: "5px 10px" }}
                >
                  Machine
                </WatchButton>
                <WatchButton
                  style={{ fontSize: 12, marginRight: 10, padding: "5px 10px" }}
                >
                  Sci-Fi
                </WatchButton>
                <WatchButton
                  style={{ fontSize: 12, marginRight: 10, padding: "5px 10px" }}
                >
                  Retro
                </WatchButton>
              </Box>
            </Box> */}
            {/* <Box
              borderRadius="10px"
              width="100%"
              bgcolor="rgba(255, 255, 255, 0.06)"
              mb="50px"
              p="16px"
              display="flex"
              flexDirection="column"
            >
              <Bold style={{ fontSize: 16 }}>Description</Bold>
              <TextNormal style={{ fontSize: 12 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                vitae habitasse tristique nunc sit nunc, morbi amet. Id vel
                consequat viverra sed et. Adipiscing nunc, massa, sodales
                egestas sollicitudin viverra id. Adipiscing nunc, massa, sodales
                egestas sollicitudin viverra id.
              </TextNormal>
            </Box> */}
            <Box
              borderRadius="10px"
              width="100%"
              bgcolor="rgba(255, 255, 255, 0.06)"
              mb="50px"
              p="16px"
              display="flex"
              flexDirection="column"
            >
              <Bold style={{ fontSize: 15 }}>Bellatrix Galaxy</Bold>
              <Bold style={{ fontSize: 15 }}>Z63 Crater</Bold>
              <Bold style={{ fontSize: 15 }}>
                X : {item.x} , Y :{item.y}
              </Bold>
              <Bold style={{ fontSize: 15 }}>
                {item.size} x {item.size} Land
              </Bold>
              {/* <TextNormal style={{ fontSize: 12 }}> {item.size}</TextNormal> */}
            </Box>
            <Box
              borderRadius="10px"
              width="100%"
              bgcolor="rgba(255, 255, 255, 0.06)"
              mb="50px"
              p="16px"
              display="flex"
              flexDirection="column"
            >
              <Bold style={{ fontSize: 18, marginBottom: 20 }}>
                Description
              </Bold>
              <Box display="flex" alignItems="center" color="#fff">
                -
              </Box>
              {/* <Bold style={{ fontSize: 18, marginBottom: 20 }}>Share</Bold>
              <Box display="flex" alignItems="center">
                <Box className="footer_ico_container" mr="10px">
                  <img src={twitter} alt="twitter" />
                </Box>
                <Box className="footer_ico_container" mr="10px">
                  <img src={facebook} alt="facebook" onClick={goto('https://www.facebook.com/sharer/sharer.php?u='+thisPage)} />
                </Box>
                <Box className="footer_ico_container" mr="10px">
                  <img src={instagram} alt="instagram" />
                </Box> 
                <Box className="footer_ico_container" mr="10px">
                  <img src={twitch} alt="twitch" />
                </Box>
              </Box> */}
            </Box>
            {/* <Box
              borderRadius="10px"
              width="100%"
              bgcolor="rgba(255, 255, 255, 0.06)"
              p="16px"
              display="flex"
              flexDirection="column"
            >
              <Bold style={{ fontSize: 18, marginBottom: 20 }}>
                Description
              </Bold>
              <Box display="flex" alignItems="center" mb="30px">
                <img src={nftIcon} alt="nftIcon" />
                <Box display="flex" flexDirection="column">
                  <Bold>@Blue</Bold>
                  <TextNormal>Created 127 NFTs</TextNormal>
                </Box>
              </Box>
              <Bold style={{ marginBottom: 30 }}>NFTs created by @Blue</Bold>
              <Box>
                <WatchButton style={{ marginBottom: 30 }}>See more</WatchButton>
              </Box>
              <Box
                bgcolor="rgba(255, 255, 255, 0.06);"
                px={3}
                borderRadius="10px"
                mb="30px"
                display="flex"
                alignItems="center"
              >
                <img src={nft1} alt="nft" width="70" />
                <Box
                  display="flex"
                  py={3}
                  alignItems="center"
                  flexDirection="column"
                  width="100%"
                  justifyContent="center"
                >
                  <Bold style={{ marginBottom: 10 }}>Blue Things</Bold>
                  <WatchButton>900000 ARV</WatchButton>
                </Box>
              </Box>
              <Box
                bgcolor="rgba(255, 255, 255, 0.06);"
                px={3}
                borderRadius="10px"
                mb="30px"
                display="flex"
                alignItems="center"
              >
                <img src={nft1} alt="nft" width="70" />
                <Box
                  display="flex"
                  py={3}
                  alignItems="center"
                  flexDirection="column"
                  width="100%"
                  justifyContent="center"
                >
                  <Bold style={{ marginBottom: 10 }}>Blue Things</Bold>
                  <WatchButton>900000 ARV</WatchButton>
                </Box>
              </Box>
              <Box
                bgcolor="rgba(255, 255, 255, 0.06);"
                px={3}
                borderRadius="10px"
                mb="30px"
                display="flex"
                alignItems="center"
              >
                <img src={nft1} alt="nft" width="70" />
                <Box
                  display="flex"
                  py={3}
                  alignItems="center"
                  flexDirection="column"
                  width="100%"
                  justifyContent="center"
                >
                  <Bold style={{ marginBottom: 10 }}>Blue Things</Bold>
                  <WatchButton>900000 ARV</WatchButton>
                </Box>
              </Box>
            </Box> */}
          </Box>
        </Box>
      </Box>
    );
  };

  const renderWeb = () => {
    return (
      <Box padding="75px 70px 70px 150px">
        <NewestBtn
          style={{ marginLeft: 10 }}
          onClick={() => {
            navigate("/market");
          }}
        >
          <img
            src={arrow}
            style={{ marginRight: 5, transform: "rotate(90deg)" }}
            alt="arrow"
          />
          Back
          {/* style={{ marginLeft: 5, transform: "rotate(-90)" }} */}
        </NewestBtn>
        <Box
          mt="40px"
          mb="70px"
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Box
            flex={1}
            p="7px"
            borderRadius="8px"
            style={{
              background: "linear-gradient(90deg, #CBFA34 0%, #66ACD4 100%)",
            }}
          >
            <Box
              p="3.9vw"
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
              flexDirection="column"
              bgcolor="#201F2D"
            >
              <H style={{ marginBottom: 27, fontSize: "25px" }}>{item.name}</H>

              <Box width="100%">
                <div
                  className={clsx(
                    `
                    mb-5 w-full h-full
                  `
                  )}
                  style={{ minHeight: 215 }}
                >
                  <Carousel
                    className="market-item-carousel-root"
                    autoPlay={false}
                    navButtonsAlwaysVisible
                  >
                    {item.image?.length && (
                      <img
                        className="img-scale-down"
                        src={getLandImage(item.image)}
                        alt="ariva-land-personal"
                      />
                    )}

                    <img
                      className="img-scale-down"
                      src={getLandPicture(item.picture)}
                      alt="ariva-land"
                    />
                  </Carousel>
                </div>
                {/* <Box
                  style={{
                    background:
                      "linear-gradient(90deg, #CBFA34 0%, #66ACD4 100%)",
                  }}
                  p="2px"
                  mb="20px"
                  borderRadius="4px"
                >
                  <Box padding="11px 37px 12px 49px" bgcolor="#201F2D">
                    <img src={nft} alt="nft" width="100%" />
                  </Box>
                </Box> */}
              </Box>
              <Box
                bgcolor="rgba(75, 74, 75, 0.3)"
                p="9px 15px"
                borderRadius="18px"
                mb="20px"
                display="flex"
                justifyContent="space-between"
                width={"100%"}
              >
                <TextNormal>Price</TextNormal>
                <Bold>{item.price}</Bold>
              </Box>
              {/* <Box
                bgcolor="rgba(75, 74, 75, 0.3)"
                p="9px 15px"
                borderRadius="18px"
                mb="20px"
                display="flex"
                justifyContent="space-between"
                width={"100%"}
              >
                <TextNormal>Amount</TextNormal>
                <Bold>4 of 200</Bold>
              </Box> */}
              <Box
                display="flex"
                width="100%"
                height="60px"
                justifyContent="space-between"
                alignItems="center"
              >
                {/* <NewestBtn>
                  Add to cart <img src={cart} alt="" />
                </NewestBtn> */}
                <FilterBtn onClick={buyThisNft}>Buy now</FilterBtn>
              </Box>
              {timeComponents}
            </Box>
          </Box>
          <Box
            flex={2}
            p="7px"
            ml="-7px"
            borderRadius="8px"
            display="flex"
            flexDirection="column"
            style={{
              background: "linear-gradient(90deg, #CBFA34 0%, #66ACD4 100%)",
            }}
          >
            <Box
              display="flex"
              padding="30px"
              alignItems="flex-start"
              flexDirection="column"
              bgcolor="#201F2D"
            >
              <Box display="flex" alignItems="center" mb="30px">
                <TextNormal style={{ marginRight: 11 }}>
                  Token ID: ******
                </TextNormal>
                {/* <img src={copy} alt="copy" style={{ marginRight: 20 }} /> */}
                <Box
                  bgcolor="rgba(255, 255, 255, 0.06)"
                  borderRadius="10px"
                  padding="10px 15px"
                >
                  <TextNormal>1 Minted</TextNormal>
                </Box>
              </Box>

              {/* <Box
                borderRadius="10px"
                width="100%"
                bgcolor="rgba(255, 255, 255, 0.06)"
                mb="50px"
                p="16px"
                display="flex"
                flexDirection="column"
              >
                <Bold style={{ fontSize: 18 }}>About</Bold>
                <TextNormal style={{ fontSize: 18 }}>
                  <b>Type:</b>Entity
                </TextNormal>
                <TextNormal style={{ fontSize: 18 }}>
                  <b>Behaviors:</b>Animated decorations
                </TextNormal>
                <TextNormal style={{ fontSize: 18 }}>
                  <b>Biomes:</b>None{" "}
                </TextNormal>
                <Box display="flex">
                  <TextNormal style={{ fontSize: 18, marginRight: 10 }}>
                    <b>Tags: </b>
                  </TextNormal>
                  <WatchButton style={{ marginRight: 10 }}>Machine</WatchButton>
                  <WatchButton style={{ marginRight: 10 }}>Sci-Fi</WatchButton>
                  <WatchButton style={{ marginRight: 10 }}>Retro</WatchButton>
                </Box>
              </Box> */}
              {/* <Box
                borderRadius="10px"
                width="100%"
                bgcolor="rgba(255, 255, 255, 0.06)"
                mb="50px"
                p="16px"
                display="flex"
                flexDirection="column"
              >
                <Bold style={{ fontSize: 18 }}>Description</Bold>
                <TextNormal style={{ fontSize: 18 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  vitae habitasse tristique nunc sit nunc, morbi amet. Id vel
                  consequat viverra sed et. Adipiscing nunc, massa, sodales
                  egestas sollicitudin viverra id. Adipiscing nunc, massa,
                  sodales egestas sollicitudin viverra id.
                </TextNormal>
              </Box> */}
              <Box
                borderRadius="10px"
                width="100%"
                bgcolor="rgba(255, 255, 255, 0.06)"
                mb="50px"
                p="16px"
                display="flex"
                flexDirection="column"
              >
                <Bold style={{ fontSize: 15 }}>Bellatrix Galaxy</Bold>
                <Bold style={{ fontSize: 15 }}>Z63 Crater</Bold>
                <Bold style={{ fontSize: 15 }}>
                  X : {item.x} , Y :{item.y}
                </Bold>
                <Bold style={{ fontSize: 15 }}>
                  {item.size} x {item.size} Land
                </Bold>
                {/* <TextNormal style={{ fontSize: 18 }}>{item.size}</TextNormal> */}
              </Box>
              <Box
                borderRadius="10px"
                width="100%"
                bgcolor="rgba(255, 255, 255, 0.06)"
                mb="50px"
                p="16px"
                display="flex"
                flexDirection="column"
              >
                <Bold style={{ fontSize: 18, marginBottom: 20 }}>
                  Description
                </Bold>
                <Box display="flex" alignItems="center" color="#fff">
                  -
                  {/* <Box className="footer_ico_container" mr="10px">
                    <img src={twitter} alt="twitter" />
                  </Box>
                  <Box className="footer_ico_container" mr="10px">
                    <img src={facebook} alt="facebook" />
                  </Box>
                  <Box className="footer_ico_container" mr="10px">
                    <img src={instagram} alt="instagram" />
                  </Box>
                  <Box className="footer_ico_container" mr="10px">
                    <img src={twitch} alt="twitch" />
                  </Box> */}
                </Box>
              </Box>
              {/* <Box
                borderRadius="10px"
                width="100%"
                bgcolor="rgba(255, 255, 255, 0.06)"
                p="16px"
                display="flex"
                flexDirection="column"
              >
                <Bold style={{ fontSize: 18, marginBottom: 20 }}>
                  Description
                </Bold>
                <Box display="flex" alignItems="center" mb="30px">
                  <img src={nftIcon} alt="nftIcon" />
                  <Box display="flex" flexDirection="column">
                    <Bold>@Blue</Bold>
                    <TextNormal>Created 127 NFTs</TextNormal>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  mb="30px"
                >
                  <Bold>NFTs created by @Blue</Bold>
                  <WatchButton>See more</WatchButton>
                </Box>
                <Box
                  bgcolor="rgba(255, 255, 255, 0.06);"
                  px={3}
                  borderRadius="10px"
                  mb="30px"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center">
                    <img src={nft1} alt="nft" width="70" />{" "}
                    <Bold>Blue Things</Bold>
                  </Box>
                  <WatchButton>900000 ARV</WatchButton>
                </Box>
                <Box
                  bgcolor="rgba(255, 255, 255, 0.06);"
                  px={3}
                  borderRadius="10px"
                  mb="30px"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center">
                    <img src={nft1} alt="nft" width="70" />{" "}
                    <Bold>Blue Things</Bold>
                  </Box>
                  <WatchButton>900000 ARV</WatchButton>
                </Box>
                <Box
                  bgcolor="rgba(255, 255, 255, 0.06);"
                  px={3}
                  borderRadius="10px"
                  mb="30px"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center">
                    <img src={nft1} alt="nft" width="70" />{" "}
                    <Bold>Blue Things</Bold>
                  </Box>
                  <WatchButton>900000 ARV</WatchButton>
                </Box>
              </Box> */}
            </Box>
          </Box>
        </Box>
        <JoinNow></JoinNow>
      </Box>
    );
  };

  return !isMobile ? renderWeb() : renderMobile();
};

export default BuyNft;
