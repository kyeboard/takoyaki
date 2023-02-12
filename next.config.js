const { i18n } = require("./next-i18next.config");

module.exports = {
    i18n,
    experimental: {
        newNextLinkBehavior: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};
