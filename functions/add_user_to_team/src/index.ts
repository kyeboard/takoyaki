import { Account, Client, Databases, Teams, Users } from "node-appwrite";

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
    $collectionId: string;
    $databaseId: string;
}

const add_user_to_team = async function (req: Request, res: Response) {
    const client = new Client();

    // You can remove services you don't use
    const account = new Users(client);
    const teams = new Teams(client);
    const databases = new Databases(client);

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

    try {
        const invitation: any = await databases.getDocument(
            data.$databaseId,
            "invitations",
            data.$id
        );

        let invited_user;

        for (const user of (await account.list()).users) {
            if (user.name == data.$databaseId) {
                invited_user = user;
            }
        }

        if (typeof invited_user == "undefined") {
            return;
        }

        if (invitation.status == true) {
            await teams.createMembership(
                data.$id,
                invited_user.email,
                [],
                "https://planetary.kyeboard.me/dashboard"
            );

            await databases.deleteDocument(
                data.$databaseId,
                data.$collectionId,
                data.$id
            );
        }

        res.json({ success: true, message: "Done" });
    } catch (err) {
        res.json(err);
    }
};

export default add_user_to_team;
