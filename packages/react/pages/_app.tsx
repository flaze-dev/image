import 'css/global.css';
import type {AppProps} from 'next/app';


const Application = ({Component, pageProps}: AppProps) => {
  return <Component {...pageProps} />
}

export default Application;
