import "../styles/globals.css";
import Layout from "../components/layout/layout";
import Head from "next/head";
import Notification from "../components/ui/notification";
import { NotificationContextProvider } from "../store/notification-context";

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="description" content="Kox course" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
        {/* <Notification
        title={"test"}
        message={"this is a test"}
        status={"pending"}
      /> */}
      </Layout>
    </NotificationContextProvider>
  );
}
