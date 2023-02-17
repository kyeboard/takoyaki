import moment from "moment";
import { Databases, Client, Models } from "node-appwrite";

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

interface TodoData extends Models.Document {
    title: string;
    due_date: string;
    priority: number;
    assignee: string[];
    category: string;
}

interface EventData extends Models.Document {
    title: string;
    description: string;
    location: string;
    start: number;
    end: string[];
    attendees: string;
}

const push_notifications = async function (req: Request, res: Response) {
    const client = new Client();

    // You can remove services you don't use
    const database = new Databases(client);

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

    const membership_event = /teams.*.memberships.*.create/;
    const new_todo_event = /databases.*.collections.todos.documents.*.create/;
    const new_event_event = /databases.*.collections.events.documents.*.create/;

    if (membership_event.test(req.variables["APPWRITE_FUNCTION_EVENT"])) {
        // A new membership has been created
        const event_data: Models.Membership = JSON.parse(
            req.variables["APPWRITE_FUNCTION_EVENT_DATA"]
        );

        // Create a new notification for the user
        await database.createDocument(
            event_data.userName,
            "notifications",
            "unique()",
            {
                message: `You are invited to join ${event_data.teamName}! Check your inbox or go to invitations tab!`,
                icon: "mail",
            }
        );

        res.json({
            success: true,
            message: "Successfully pushed the message to the inbox!",
        });
    } else if (new_todo_event.test(req.variables["APPWRITE_FUNCTION_EVENT"])) {
        // A new membership has been created
        const event_data: TodoData = JSON.parse(
            req.variables["APPWRITE_FUNCTION_EVENT_DATA"]
        );

        for (const assignee of event_data.assignee) {
            console.log("Sending push notification to: " + assignee);

            await database.createDocument(
                assignee,
                "notifications",
                "unique()",
                {
                    message: `You have been assigned a task with the title of ${
                        event_data.title
                    } and the due date being ${moment(
                        event_data.due_date
                    ).format("MMMM Do YYYY")}.`,
                    icon: "bookmark",
                }
            );
        }

        // Create a new notification for the user

        res.json({
            success: true,
            message: "Successfully pushed the message to the inbox!",
        });
    } else if (new_event_event.test(req.variables["APPWRITE_FUNCTION_EVENT"])) {
        // A new membership has been created
        const event_data: EventData = JSON.parse(
            req.variables["APPWRITE_FUNCTION_EVENT_DATA"]
        );

        for (const assignee of event_data.attendees) {
            console.log("Sending push notification to: " + assignee);

            await database.createDocument(
                assignee,
                "notifications",
                "unique()",
                {
                    message: `You have been asked to attend ${
                        event_data.title
                    } on ${moment(event_data.start).format("MMMM Do YYYY")}.`,
                    icon: "video",
                }
            );
        }
    }
};

export default push_notifications;
