import { createGlobalStyle } from "styled-components";
import { Normalize } from "styled-normalize";
import { Store, useStore } from "../store";
import "../style/antd.less";

const GlobalStyles = createGlobalStyle``;

function MyApp({ Component, pageProps }) {
  const { state, dispatch } = useStore();
  return (
    <>
      <Normalize />
      <GlobalStyles />
      <Store.Provider value={{ state, dispatch }}>
        <Component {...pageProps} />
      </Store.Provider>
    </>
  );
}

export default MyApp;
