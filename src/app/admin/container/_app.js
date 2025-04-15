// _app.js
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Component {...pageProps} />
    </>
  );
}
