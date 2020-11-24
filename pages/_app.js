import { createGlobalStyle } from "styled-components";
import { Normalize } from "styled-normalize";

const GlobalStyles = createGlobalStyle``;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Normalize />
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
