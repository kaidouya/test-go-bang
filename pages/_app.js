import { createGlobalStyle } from "styled-components";
import { Normalize } from "styled-normalize";
import { Store, useStore } from "../store";

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
