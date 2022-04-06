/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid } from "@mui/material";
import React, { FC, useState } from "react";
import useMobile from "../../hooks/useMobile";
import { Cbox, CustomBtn } from "../CustomizeComponents";
import carousel1 from "../../assets/images/home/Carousel1.svg"
import drop from "../../assets/images/home/drop.svg"
import clcok from "../../assets/images/home/clcok.svg"
import playerico from "../../assets/images/home/playerico.svg"
import _ from "lodash";
import img1 from "../../assets/images/home/carousel/1-ArivaWondwerland.jpg"
import img2 from "../../assets/images/home/carousel/2-ArivaWondwerland.jpg"
import img3 from "../../assets/images/home/carousel/3-ArivaWondwerland.jpg"
import img4 from "../../assets/images/home/carousel/4-ArivaWondwerland.jpg"
import img5 from "../../assets/images/home/carousel/5-ArivaWondwerland.jpg"
import img6 from "../../assets/images/home/carousel/6-ArivaWondwerland.jpg"
import img7 from "../../assets/images/home/carousel/7-ArivaWondwerland.jpg"
import img8 from "../../assets/images/home/carousel/8-ArivaWondwerland.jpg"
import img9 from "../../assets/images/home/carousel/9-ArivaWondwerland.jpg"
import img10 from "../../assets/images/home/carousel/10-ArivaWondwerland.jpg"
import img11 from "../../assets/images/home/carousel/11-ArivaWondwerland.jpg"
import img12 from "../../assets/images/home/carousel/12-ArivaWondwerland.jpg"
import img13 from "../../assets/images/home/carousel/13-ArivaWondwerland.jpg"
import img14 from "../../assets/images/home/carousel/14-ArivaWondwerland.jpg"
import img15 from "../../assets/images/home/carousel/15-ArivaWondwerland.jpg"
import img16 from "../../assets/images/home/carousel/16-ArivaWondwerland.jpg"
import img17 from "../../assets/images/home/carousel/17-ArivaWondwerland.jpg"
import img18 from "../../assets/images/home/carousel/18-ArivaWondwerland.jpg"
import img19 from "../../assets/images/home/carousel/19-ArivaWondwerland.jpg"
import img20 from "../../assets/images/home/carousel/20-ArivaWondwerland.jpg"
import img21 from "../../assets/images/home/carousel/21-ArivaWondwerland.jpg"
import img22 from "../../assets/images/home/carousel/22-ArivaWondwerland.jpg"
import img23 from "../../assets/images/home/carousel/23-ArivaWondwerland.jpg"
import img24 from "../../assets/images/home/carousel/24-ArivaWondwerland.jpg"
import img25 from "../../assets/images/home/carousel/25-ArivaWondwerland.jpg"
import img26 from "../../assets/images/home/carousel/26-ArivaWondwerland.jpg"
import img27 from "../../assets/images/home/carousel/27-ArivaWondwerland.jpg"
import img28 from "../../assets/images/home/carousel/28-ArivaWondwerland.jpg"
import img29 from "../../assets/images/home/carousel/29-ArivaWondwerland.jpg"
import img30 from "../../assets/images/home/carousel/30-ArivaWondwerland.jpg"
import img31 from "../../assets/images/home/carousel/31-ArivaWondwerland.jpg"

const imgList = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
    img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
    img21, img22, img23, img24, img25, img26, img27, img28, img29, img30,
    img31
];

interface CarouselItmProps {
    img: any
    title: string;
    content: string
    btnLabel: string
}

interface CarouselPorps {
}

const Carousel: FC<CarouselPorps> = (props: CarouselPorps) => {
    const { isMobile } = useMobile()
    const [page, setPage] = useState(0);
    const previewPage = () => {
        if (page - 1 >= 0)
            setPage(page - 1);
    }
    const nextPage = () => {
        if (page + 1 < imgList.length)
            setPage(page + 1);
    }

    const renderWeb = () => {
        return <Box p="2.62vw 3.03vw 3.03vw 2.2vw" borderRadius="8px" display="flex" justifyContent="center" alignItems="center" flexDirection="column" style={{ background: 'linear-gradient(90deg, #1D2428 0%, #1E1C28 100%)' }}>
            <Cbox cmb="13" bold fsize="34">What’s going on in Ariva Wonderland?</Cbox>
            <Cbox fsize="16" cmb="38">See what is happening in Ariva Wonderland, a universe full of wonderful events.</Cbox>
            <Grid container columns={37} spacing={1} >
                <Grid item sm={28}>
                    <Box position="relative" borderRadius="8px" style={{ background: 'linear-gradient(180deg, rgba(202, 249, 54, 1) 0%, rgba(104, 174, 209, 0) 100%)' }} p="2px">
                        <img src={imgList[page]} alt="carousel" style={{ borderRadius: 8 }} />
                        <Box onClick={nextPage} className="carousel_playerIco" style={{ padding: '1.173vw', transform: 'translateX(50%)' }}><img src={playerico} /></Box>
                        <Box onClick={previewPage} className="carousel_playerIco_reverse" style={{ padding: '1.173vw' }}><img src={playerico} /></Box>
                    </Box>
                </Grid>
                <Grid item sm={9} display="flex" justifyContent="space-between" alignItems="center" flexDirection="column">
                    <Box onClick={()=>setPage(Math.min(page, imgList.length - 3))} borderRadius="8px" overflow="hidden" style={{ background: 'linear-gradient(180deg, rgba(202, 249, 54, 1) 0%, rgba(104, 174, 209, 0) 100%)' }} p="2px">
                        <img src={imgList[Math.min(page, imgList.length - 3)]} alt="carousel" style={{ borderRadius: 8 }} />
                    </Box>
                    <Box onClick={()=>setPage(Math.min(page, imgList.length - 3)+1)} borderRadius="8px" overflow="hidden" style={{ background: 'linear-gradient(180deg, rgba(202, 249, 54, 1) 0%, rgba(104, 174, 209, 0) 100%)' }} p="2px">
                        <img src={imgList[Math.min(page, imgList.length - 3) + 1]} alt="carousel" style={{ borderRadius: 8 }} />
                    </Box>
                    <Box onClick={()=>setPage(Math.min(page, imgList.length - 3)+2)} borderRadius="8px" overflow="hidden" style={{ background: 'linear-gradient(180deg, rgba(202, 249, 54, 1) 0%, rgba(104, 174, 209, 0) 100%)' }} p="2px">
                        <img src={imgList[Math.min(page, imgList.length - 3) + 2]} alt="carousel" style={{ borderRadius: 8 }} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    }

    const renderMobile = () => {
        return <Box p="9vw 5vw 6.4vw 5vw" display="flex" borderRadius="8px" justifyContent="center" alignItems="center" flexDirection="column" style={{ background: 'linear-gradient(90deg, #1D2428 0%, #1E1C28 100%)' }}>
            <Cbox cmb="13" mobile bold fsize="24">What’s going on in Ariva Wonderland?</Cbox>
            <Cbox fsize="16" mobile cmb="16">See what is happening in Ariva Wonderland, a universe full of wonderful events.</Cbox>
            <Box mb="4.1vw" position="relative" borderRadius="8px" style={{ background: 'linear-gradient(180deg, rgba(202, 249, 54, 1) 0%, rgba(104, 174, 209, 0) 100%)' }} p="2px">
                <img src={imgList[page]} alt="carousel" style={{ borderRadius: 8 }} />
                <Box onClick={nextPage} className="carousel_playerIco" style={{ padding: '1.173vw', transform: 'translateX(50%)' }}><img src={playerico} /></Box>
                <Box onClick={previewPage} className="carousel_playerIco_reverse" style={{ padding: '1.173vw' }}><img src={playerico} /></Box>
            </Box>
            {/* <Grid container spacing={1}>
                <Grid item md={4} ><Box onClick={()=>setPage(Math.min(page, 5))} borderRadius="8px" overflow="hidden" style={{ background: 'linear-gradient(180deg, rgba(202, 249, 54, 1) 0%, rgba(104, 174, 209, 0) 100%)' }} p="2px">
                    <img src={imgList[Math.min(page, 5)]} alt="carousel" style={{ borderRadius: 8 }} />
                </Box></Grid>
                <Grid item md={4} ><Box onClick={()=>setPage(Math.min(page, 5)+1)} borderRadius="8px" overflow="hidden" style={{ background: 'linear-gradient(180deg, rgba(202, 249, 54, 1) 0%, rgba(104, 174, 209, 0) 100%)' }} p="2px">
                    <img src={imgList[Math.min(page, 5) + 1]} alt="carousel" style={{ borderRadius: 8 }} />
                </Box></Grid>
                <Grid item md={4} ><Box onClick={()=>setPage(Math.min(page, 5)+2)} borderRadius="8px" overflow="hidden" style={{ background: 'linear-gradient(180deg, rgba(202, 249, 54, 1) 0%, rgba(104, 174, 209, 0) 100%)' }} p="2px">
                    <img src={imgList[Math.min(page, 5) + 2]} alt="carousel" style={{ borderRadius: 8 }} />
                </Box></Grid>
            </Grid> */}
        </Box >
    }

return !isMobile ? renderWeb() : renderMobile();
}

export default Carousel