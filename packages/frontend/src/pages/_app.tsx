import { type AppType } from "next/dist/shared/lib/utils";
import { MainLayout } from "~/components/layouts";
import "~/styles/globals.css";
import { Flowbite } from "flowbite-react";
import {
  UserContextDispatch,
  UserContextState,
  useUserReducer,
} from "~/context/User/root";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [userState, userDispatch] = useUserReducer();

  return (
    <UserContextState.Provider value={userState}>
      <UserContextDispatch.Provider value={userDispatch}>
        <Flowbite>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </Flowbite>
      </UserContextDispatch.Provider>
    </UserContextState.Provider>
  );
};

export default MyApp;
