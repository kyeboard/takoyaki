import { useRouter } from "next/router";
import { useEffect } from "react";
import { account } from "src/utility";

const Login = () => {
    useEffect(() => {
        account.createOAuth2Session(
            "google",
            `${location.origin}/dashboard`,
            location.origin
        );
    }, []);
};

export default Login;
