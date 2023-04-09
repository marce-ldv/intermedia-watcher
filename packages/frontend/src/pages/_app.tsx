import { type AppType } from "next/dist/shared/lib/utils";
import { MainLayout } from "~/components/layouts";
import "~/styles/globals.css";
import { Flowbite } from "flowbite-react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Flowbite>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Flowbite>
  );
};

export default MyApp;
