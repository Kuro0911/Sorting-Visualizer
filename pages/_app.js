import reducer, { initialState } from "../src/contexts/reducer";
import { StateProvider } from "../src/contexts/StateProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider initalState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
