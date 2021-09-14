import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { TableDataProvider } from "../context/tableContext";

function MyApp({ Component, pageProps }) {
  return (
    <TableDataProvider>
      <Component {...pageProps} />
    </TableDataProvider>
  );
}

export default MyApp;
