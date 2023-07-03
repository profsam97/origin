import React from "react";
import {IHeader} from "@/types/types";
import Head from "next/head";
import Nav from "@/Component/Layout/Nav";

const Header : React.FC<IHeader> = ({title, description, content}) => {


    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name={description} content={content} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav/>
        </>

    )


}


export default Header;