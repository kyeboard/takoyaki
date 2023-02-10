// Import dependencies
import { google } from "googleapis";
import { Client, InputFile, Storage, Users } from "node-appwrite";
import { Readable } from "stream";
import needle from "needle";

// Types
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

interface EventData {
    providerAccessToken: string;
    userId: string;
}

interface Response {
    send: (text: string, status?: number) => void;
    json: (obj: any, status?: number) => void;
}

// Create a function that takes in an image url and a file name. Download the image and save it to the storage bucket.
const uploadImage = async (
    url: string,
    id: string,
    fileName: string,
    storage: Storage
) => {
    // Download the image
    const image_res = await needle("get", url);

    // Create a new instance of file
    const file = new (InputFile as any)(
        Readable.from(image_res.body),
        fileName,
        Buffer.byteLength(image_res.body)
    );

    await storage.createFile("63dfd4b2bf3364da5f0c", id, file);
};

const upload_user_profile = async function (req: Request, res: Response) {
    const client = new Client();

    // You can remove services you don't use
    const storage = new Storage(client);
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
            .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"]);
    }

    try {
        const data: EventData = JSON.parse(
            req.variables["APPWRITE_FUNCTION_EVENT_DATA"]
        );

        const user = await users.get(data.userId);

        // Fetch the google info of the user with the `providerAccessToken` in data and call the upload image, passing the picture url
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: data.providerAccessToken });

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: "v2",
        });

        const google_res = await oauth2.userinfo.get({});

        await uploadImage(
            google_res.data.picture ?? "",
            user.name,
            "profile.jpeg",
            storage
        );

        res.json({ success: true, message: "Successfully uploaded the pfp" });
    } catch (e) {
        res.json({ success: false, message: e });
    }
};

export default upload_user_profile;

// Uncomment to test
// upload_user_profile(
//     {
//         headers: {},
//         payload: {},
//         variables: {
//             APPWRITE_FUNCTION_ENDPOINT: "<your_endpoint>",
//             APPWRITE_FUNCTION_PROJECT_ID: "<your_project_id>",
//             APPWRITE_FUNCTION_API_KEY: "<your_appwrite_key>"
//             APPWRITE_FUNCTION_EVENT_DATA: JSON.stringify({
//                 providerAccessToken: "<your_access_token>",
//                 userId: "<appwrite_user_id>",
//             }),
//         },
//     },
//     {
//         json(obj, status) {
//             console.log(obj);
//         },
//         send(text, status) {
//             console.log(text);
//         },
//     }
// );
