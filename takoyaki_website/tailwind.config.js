/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            animationDelay: {
                200: "200ms",
                210: "220ms",
                220: "240ms",
                230: "260ms",
                240: "280ms",
                250: "300ms",
                260: "320ms",
                280: "340ms",
                300: "360ms",
                320: "380ms",
            },
            animation: {
                floating: "floating 1s ease-in-out infinite",
                rise: "rise 0.5s ease-in-out forwards",
                shrink: "shrink 0.5s ease-in-out forwards",
                grow: "grow 0.8s ease-in-out forwards",
                fade_in: "fade_in 0.5s ease-in-out forwards",
                fade_out: "fade_out 0.5s ease-in-out forwards",
            },
            keyframes: {
                rise: {
                    "0%": {
                        transform: "translateY(55px)",
                        opacity: 0,
                    },
                    "100%": {
                        transform: "translate(0px)",
                        opacity: 1,
                    },
                },
                floating: {
                    "0%, 100%": {
                        transform: "translateY(0px)",
                    },
                    "50%": {
                        transform: "translateY(10px)",
                    },
                },
                shrink: {
                    "0%": {
                        height: "100vh",
                        opacity: 1,
                    },
                    "100%": {
                        height: "0px",
                        opacity: 0,
                    },
                },
                grow: {
                    "0%": {
                        transform: "scale(0)",
                        opacity: 0,
                    },
                    "100%": {
                        transform: "scale(1)",
                        opacity: 1,
                    },
                },
                fade_in: {
                    "0%": {
                        opacity: 0,
                        transform: "translateY(-10px)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translateY(0px)",
                    },
                },
                fade_out: {
                    "0%": {
                        opacity: 1,
                        transform: "translateY(0px)",
                    },
                    "100%": {
                        opacity: 0,
                        transform: "translateY(-10px)",
                    },
                },
            },
            screens: {
                sm: "730px",
                sd: "1050px",
                md: "1350px",
            },
            colors: {
                white: "#e7e7f2",
                purple: "#dad2f0",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [
        require("@catppuccin/tailwindcss")({
            prefix: "",
            defaultFlavour: "mocha",
        }),
        require("tailwindcss-animation-delay"),
    ],
};
