import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import {store} from "@/store";
import {firestore} from "@/firebase";
import {createFirestoreInstance} from "redux-firestore";
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import localFont from '@next/font/local'
import { Analytics } from '@vercel/analytics/react';


const fontChalk = localFont({src: '../assets/fonts/chalk.ttf'})
const fontTall = localFont({src: '../assets/fonts/tall.otf'})
const fontWhicyr = localFont({src: '../assets/fonts/whicyr.otf'})

const rrfConfig = {
    userProfile: 'users'
}
const rrfProps = {
    firebase: firestore,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance: createFirestoreInstance
}
export default function App({Component, pageProps}: AppProps) {
    return <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <style jsx global>{`
              :root {
                --chalk-font: ${fontChalk.style.fontFamily};
                --whicyr-font: ${fontWhicyr.style.fontFamily};
                --tall-font: ${fontTall.style.fontFamily};
              }
            `}</style>
            <Component {...pageProps} />
            <Analytics />
        </ReactReduxFirebaseProvider>
    </Provider>
}
