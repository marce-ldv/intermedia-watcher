import { Flowbite } from "flowbite-react";
import { type AppType } from "next/dist/shared/lib/utils";

import { MainLayout } from "~/components/layouts";
import { Modals } from "~/components/organisms/Modals";
import {
  ModalContextDispatch,
  ModalContextState,
  useModalReducer,
} from "~/context/Modals/root";
import {
  UserContextDispatch,
  UserContextState,
  useUserReducer,
} from "~/context/User/root";

import "~/styles/globals.css";

const App: AppType = ({ Component, pageProps }) => {
  const [userState, userDispatch] = useUserReducer();
  const [modalState, modalDispatch] = useModalReducer();

  return (
    <UserContextState.Provider value={userState}>
      <UserContextDispatch.Provider value={userDispatch}>
        <ModalContextState.Provider value={modalState}>
          <ModalContextDispatch.Provider value={modalDispatch}>
            <Modals />
            <Flowbite>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </Flowbite>
          </ModalContextDispatch.Provider>
        </ModalContextState.Provider>
      </UserContextDispatch.Provider>
    </UserContextState.Provider>
  );
};

export default App;
