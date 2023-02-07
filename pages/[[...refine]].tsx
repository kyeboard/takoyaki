import { GetServerSideProps } from "next";
import {
    NextRouteComponent /*, handleRefineParams */,
} from "@pankod/refine-nextjs-router";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps: GetServerSideProps = async (context) => {
    // const { resource, action, id } = handleRefineParams(context.params?.refine);

    const i18nProps = await serverSideTranslations(context.locale ?? "en", [
        "common",
    ]);

    return {
        props: {
            ...i18nProps,
        },
    };
};

export default NextRouteComponent;

/**
 * To define a custom initial route for refine to redirect and start with:
 *
 * Bind the `initialRoute` value to the `NextRouteComponent` like the following:
 *
 * export default NextRouteComponent.bind({ initialRoute: "/posts" });
 *
 **/
