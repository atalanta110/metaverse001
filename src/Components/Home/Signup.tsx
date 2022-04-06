/* eslint-disable jsx-a11y/alt-text */
import { Box } from "@mui/material";
import React, { FC } from "react";
import useMobile from "../../hooks/useMobile";
import { H, NftButton, TextNormal, Bold, CustomButton, Cbox, CustomBtn } from "../CustomizeComponents";
import envelop from "../../assets/images/home/envelop.svg"

const Signup = () => {
    const { isMobile } = useMobile()
    const renderWeb = () => {
        return <Box className="home_signup_wraper">
            <Cbox style={{marginBottom: '2.07vw'}} bold fsize="22">Get in Touch</Cbox>
            <Cbox style={{marginBottom: '3.45vw'}} fsize="16">Please contact us for your suggestions, job applications, and cooperation requests.</Cbox>
            
            <CustomBtn radius="20px" pt="8" pb="8" pl="40" pr="40" mt="-10" color="#403E3F" bgcolor="#CBFA34" fsize="15" bold mr="18"><a href="https://ariva.zendesk.com/hc/en-us/requests/new?ticket_form_id=4424648480401" target="_blank">Contact Us</a></CustomBtn>
        </Box>
    }

    const renderMobile = () => {
        return <Box width="100%" padding="13.3vw 3.8vw 7.95vw 3.8vw" display="flex" flexDirection="column" position="relative" bgcolor="rgba(120, 120, 120, 0.1)" borderRadius="8px">
            <Cbox mobile style={{marginBottom: '4.87vw'}} bold fsize="22">Get in Touch</Cbox>
            <Cbox mobile style={{marginBottom: '4.5vw'}} fsize="16">Please contact us for your suggestions, job applications, and cooperation requests.</Cbox>
            
            <CustomBtn mobile width="100%" alignItems="center" justifyContent="center" radius="20px" pt="8" pb="8" mt="10" color="#403E3F" bgcolor="#CBFA34" fsize="15" bold ><a href="https://ariva.zendesk.com/hc/en-us/requests/new?ticket_form_id=4424648480401" target="_blank">Contact Us</a></CustomBtn>
            
            {/* <CustomButton style={{width: '100%', marginTop: '3.45vw'}}>Sign Up</CustomButton> */}
        </Box>
    }

    return isMobile? renderMobile() : renderWeb();
}

export default Signup