import { Account, Client, Users } from "node-appwrite";

interface Request {
    headers: {
        [key: string]: string;
    };
    payload: {
        [key: string]: string;
    };
    variables: {
        [key: string]: string;
    };
}

interface Response {
    send: (text: string, status?: number) => void;
    json: (obj: any, status?: number) => void;
}

interface EventData {
    userId: string;
}

const change_username_to_email = async function (req: Request, res: Response) {
    const client = new Client();

    // You can remove services you don't use
    const account = new Users(client);

    if (
        !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
        !req.variables["APPWRITE_FUNCTION_API_KEY"]
    ) {
        console.warn(
            "Environment variables are not set. Function cannot use Appwrite SDK."
        );
    } else {
        client
            .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
            .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
            .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
            .setSelfSigned(true);
    }

    const data: EventData = JSON.parse(
        req.variables["APPWRITE_FUNCTION_EVENT_DATA"]
    );

    const user = await account.get(data.userId);

    // Extract the first part of the email with regex (for example: if the email is 0xsapphir3@gmail.com, I want only 0xsapphir3)
    const username = (user.email.match(/^[^@]*/) as RegExpMatchArray)[0];

    // Get the user
    const current_username = user.name;

    // // Check if the current_username is correct by testing it against the regex which checks if it only contains alphanumeric, hyphen, non-leading underscore, period
    if (!current_username.match(/^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/)) {
        // The name is invalid (contains special characters)
        await account.updateName(data.userId, username);

        res.json({
            success: true,
            message: "Username not valid, resetting to " + username,
        });
    } else {
        res.json({
            success: true,
            message: "Skipping as the username is already valid",
        });
    }
};

export default change_username_to_email;
