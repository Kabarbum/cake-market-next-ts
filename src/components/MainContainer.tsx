import Navbar from "@/components/Navbar";
import Head from "next/head";
import {FC, ReactNode} from "react";
import Footer from "@/components/Footer";

interface MainContainerProps {
    children: ReactNode
}

const MainContainer:FC<MainContainerProps> = ({children}) => {
    return (
        <>
            <Head>
                <title>Cake Market</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href={"/favicon.ico"} />
            </Head>
            <div className="App">
                <Navbar/>
                <main>
                    {children}
                </main>
                <Footer/>
            </div>
        </>
    );
};

export default MainContainer;