import { Account, Client, Databases, Teams } from "node-appwrite";

(async () => {
    const client = new Client();

    client
        .setEndpoint("https://appwrite.kyeboard.me/v1")
        .setProject("63df174eb4161f4803ca")
        // .setJWT("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2M2U0YTJlNDE1ZTk0ODJmOTAzYSIsInNlc3Npb25JZCI6IjYzZTRhZTVmNDdkN2FkNDYzMGVkIiwiZXhwIjoxNjc2MDE3OTQxfQ.0GyQtxZ7E2dZ-KFyI2DXgBjd8k6qtJBry9-VUScFtM8")
        .setKey(
            "b617aa7aab365541e438a6317014356e686bb6a6401b0f6e196a8dcf4df67fc05d49c7e31446bd96019e7f3c77147f7bc2eecc53d2b1863322b52f4d6138f8f4f60404b5cc17adf1a442870f7852541bc6c882d12dab1dd1614064b315b8b7a12dd9ff9be9f0fafe91b5656036837d9153189266098baa4590954b6ac6b4ec33"
        );

    const teams = new Teams(client);
    const account = new Databases(client);

    for (const team of (await account.list()).databases) {
        await account.delete(team.$id);
    }
})();
