import { Client, Databases, Users, Permission, Role } from "node-appwrite";

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

const setup_user_workspace = async function (req: Request, res: Response) {
    const client = new Client();

    // You can remove services you don't use
    const database = new Databases(client);
    const users = new Users(client);

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

    // Get the Appwrite user
    const user = await users.get(data.userId);

    // Create the database
    try {
        await database.create(user.name, user.name);
    } catch (err) {
        // Already database with that id is there, threfore meaning the user is already ready to go
        return res.json({
            success: true,
            message: "The user is already good to go",
        });
    }

    // Create collection for invitations
    await database.createCollection(user.$id, "invitations", "Invitations", [
        Permission.read(Role.user(user.$id)),
        Permission.update(Role.user(user.$id)),
        Permission.delete(Role.user(user.$id)),
    ]);

    // Create attributes for the invitation collection (name)
    await database.createStringAttribute(
        user.$id,
        "invitations",
        "name",
        100,
        true
    );

    // Accept url
    await database.createUrlAttribute(
        user.$id,
        "invitations",
        "accept_url",
        true
    );

    await database.createBooleanAttribute(
        user.$id,
        "invitations",
        "accept_url",
        false,
        false
    );


    // Notifications collection
    // Create collection for invitations
    await database.createCollection(
        user.$id,
        "notifications",
        "Notifications",
        [
            Permission.read(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
        ]
    );

    // Create attributes for the invitation collection (name)
    await database.createStringAttribute(
        user.$id,
        "notifications",
        "message",
        1000,
        true
    );

    // Accept url
    await database.createStringAttribute(
        user.$id,
        "notifications",
        "icon",
        20,
        true
    );

    // Success message
    res.json({
        success: true,
        message: "Successfully completed the user workspace setup",
    });
};

export default setup_user_workspace;

// setup_user_workspace(
//     {
//         variables: {
//             APPWRITE_FUNCTION_ENDPOINT: "https://appwrite.kyeboard.me/v1",
//             APPWRITE_FUNCTION_PROJECT_ID: "63df174eb4161f4803ca",
//             APPWRITE_FUNCTION_API_KEY: "",
//         },
//         headers: {},
//         payload: {
//             $id: "63ed99ef9a0a96fffba9",
//             $createdAt: "2023-02-16T02:50:23.642+00:00",
//             userId: "63eb8f6cf07993a4a979",
//             expire: "2024-02-16 02:50:23.642",
//             provider: "google",
//             providerUid: "",
//             providerAccessToken: "",
//             providerAccessTokenExpiry: "2023-02-16T03:50:22.630+00:00",
//             providerRefreshToken: "",
//             ip: "",
//             osCode: "LIN",
//             osName: "GNU/Linux",
//             osVersion: "",
//             clientType: "browser",
//             clientCode: "CH",
//             clientName: "Chrome",
//             clientVersion: "110.0",
//             clientEngine: "Blink",
//             clientEngineVersion: "110.0.0.0",
//             deviceName: "desktop",
//             deviceBrand: "",
//             deviceModel: "",
//             countryCode: "in",
//             countryName: "India",
//         },
//     },
//     {
//         send: function (text, status) {
//             console.log(text);
//         },
//         json: function (text, status) {
//             console.log(text);
//         },
//     }
// );
