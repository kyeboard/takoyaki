import { Client, Databases, Models, Teams } from "node-appwrite";

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

const new_invitation = async function (req: Request, res: Response) {
    const client = new Client();

    // You can remove services you don't use
    const databases = new Databases(client);
    const teams = new Teams(client);

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

    const data: Models.Membership = JSON.parse(
        req.variables["APPWRITE_FUNCTION_EVENT_DATA"]
    );

    for (const membership of (await teams.listMemberships(data.teamId))
        .memberships) {
        if (membership.userName == data.userName && membership.confirm) return;
    }

    await databases.createDocument(data.userName, "invitations", data.teamId, {
        name: data.teamName,
        accept_url: `https://planetary.kyeboard.me/accept_invitation?teamId=${data.teamId}`,
    });

    res.json({
        success: true,
        message: "New invitation sent",
    });
};

export default new_invitation;
