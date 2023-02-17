import MainContainer from "@/components/MainContainer";
import {useState} from "react";
import Tg from "@/assets/img/telegram.png";
import VK from "@/assets/img/contact-vk.png";
import WhatsUp from "@/assets/img/contact-whatsapp.png";
import beater from "@/assets/img/venchik.png"
import Loader from "@/components/UI/Loader/Loader";
import Image from 'next/image'
import cls from "@/styles/Contacts.module.scss"

const Contacts = () => {
    const [isLoading, setIsLoading] = useState("0")
    return (
        <MainContainer>
            <div className={cls.contactsPage}>
                <div className={cls.contacts}>
                    <div className="container">
                        <div className={cls.contactsBody}>
                            <span>
                                <h3>С радостью отвечу тебе в&nbsp;соц.&nbsp;сетях</h3>
                            </span>
                            <div className={cls.contactsSocials}>
                                <ul>
                                    <li>
                                        <a href="https://tlgg.ru/RinaYa">
                                            <div className={cls.socialsImg}>
                                                <Image src={Tg} alt="telegram"/>
                                            </div>
                                            <span>e.a.cherem</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vk.com/e.a.cherem">
                                            <div className={cls.socialsImg}>
                                                <Image src={VK} alt="Vk"/>
                                            </div>
                                            <span>e.a.cherem</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://api.whatsapp.com/send/?phone=79823662301">
                                            <div className={cls.socialsImg}>
                                                <Image src={WhatsUp} alt="WhatsUp"/>
                                            </div>
                                            <span>+7 (982) 366-23-01</span>
                                        </a>
                                    </li>
                                </ul>

                                {/*<div className={cls.beater}>*/}
                                {/*    <Image src={beater} alt="beater"/>*/}
                                {/*</div>*/}
                            </div>
                            {
                                isLoading==="0" && <Loader/>
                            }
                            <iframe
                                onLoad={() => setIsLoading("100%")}
                                title={"yaMap"}
                                src="https://yandex.ru/map-widget/v1/?um=constructor%3A4c7cf2a2eb882a94ca8831cfe4ba079f6e52fe6f27f665f3035498373849af9b&amp;source=constructor"
                                width={isLoading}
                                height="450"
                                frameBorder="0"
                            />
                        </div>
                    </div>
                </div>


            </div>
        </MainContainer>
    );
};

export default Contacts;