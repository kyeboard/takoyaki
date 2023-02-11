import React from "react";
import { AppProps } from "next/app";
import "../styles/styles.sass";
import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    ChakraProvider,
    ReadyPage,
    ErrorComponent,
    Box,
} from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-nextjs-router";
import { dataProvider, liveProvider } from "@pankod/refine-appwrite";
import { appWithTranslation, useTranslation } from "next-i18next";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import { authProvider } from "src/authProvider";
import NavBar from "@components/NavBar";
import { appwriteClient } from "src/utility";
import { Title, Sider, Layout, Header } from "@components/layout";
import { OffLayoutArea } from "@components/offLayoutArea";
import theme from "theme/chakra";
import { Nunito } from "@next/font/google";

const nunito = Nunito({ subsets: ["latin"], weight: "600" });

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const { t, i18n } = useTranslation();

    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    return (
        <ChakraProvider theme={theme}>
            <RefineKbarProvider>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(appwriteClient, {
                        databaseId: "default",
                    })}
                    liveProvider={liveProvider(appwriteClient, {
                        databaseId: "default",
                    })}
                    liveMode="auto"
                    authProvider={authProvider}
                    notificationProvider={notificationProvider()}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    Title={Title}
                    Sider={Sider}
                    Layout={Layout}
                    Header={Header}
                    i18nProvider={i18nProvider}
                    OffLayoutArea={OffLayoutArea}
                    resources={[{ name: "projects" }]}
                >
                    <Box className={nunito.className}>
                        <NavBar />
                        <Component {...pageProps} />
                    </Box>
                </Refine>
            </RefineKbarProvider>
        </ChakraProvider>
    );
}

export default appWithTranslation(MyApp);
