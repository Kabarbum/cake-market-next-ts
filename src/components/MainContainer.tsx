import Navbar from "@/components/Navbar";
import Head from "next/head";
import {FC, ReactNode} from "react";
import Footer from "@/components/Footer";
import Image from 'next/image'
import background from '@/assets/img/image.jpg'


interface MainContainerProps {
    children: ReactNode
}

const MainContainer:FC<MainContainerProps> = ({children}) => {
    return (
        <>
            <Head>
                <title>Cake Market</title>
                <meta name="description" content="Торты на заказ по вашим пожеланиям в Питере!
                  Чизкейки, трайфлы, бенто и капкейки с любимой начинкой.
                  Украсьте праздничный стол на День рождения, свадьбу и любой другой праздник." key="desc" />
                <meta
                    name="keywords"
                    content="купить торты Питер,бенто,капкейки,трафйлы,чизкейк,купить торты,торт на свадьбу Питер,торт красный бархат,кондитер"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href={"/favicon.ico"} />
            </Head>
            <div className="App">
                <Navbar/>
                <main>
                    {children}
                </main>
                <Footer/>
                <div className="bodyWrap">
                    <Image
                        alt="background"
                        src={background}
                        placeholder="blur"
                        quality={100}
                        fill
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default MainContainer;