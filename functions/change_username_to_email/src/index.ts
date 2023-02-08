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
    $id: string;
    email: string;
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

    // Extract the first part of the email with regex (for example: if the email is 0xsapphir3@gmail.com, I want only 0xsapphir3)
    const username = (data.email.match(/^[^@]*/) as RegExpMatchArray)[0];

    // Set the new username
    await account.updateName(data.$id, username);

    res.json({
        success: true,
        message: "Successfully changed the username to " + username,
    });
};

export default change_username_to_email;