![conver](https://user-images.githubusercontent.com/115910279/219828995-7f24dd9a-55a2-4a8a-a53a-fa0d54810847.jpg)

# [Planetary](https://planetary.kyeboard.me)

Get ready to slay your to-do list like a dragon-slaying knight with this app. It's like a personal assistant without the coffee addiction and annoying small talk. Say 'goodbye' to procrastination and 'hello' to getting sh*t done. Don't be a potato on the couch, be a productive potato with this app.

## Participants
I worked solo on this project and killed it, but I'm pretty sure I also killed a few brain cells in the process.

- GitHub: https://www.github.com/kyeboard
- Twitter: [https://www.twitter.com/kyeboard_](https://www.twitter.com/kyeboard_)

## Prerequisites
In order to setup and run this project locally, you must have:

- [Docker](https://www.docker.com/)
- [Appwrite](https://www.appwrite.io/)
- Brain (IYKYK)

## Setup Appwrite
Before starting the development server, you must have your Appwrite project setup.

- Create a new Appwrite project with any name but with the id of planetary.
- In the Auth tab, go to Settings and setup Google OAuth provider with your google client credentials.
- In the Databases section, create a new database with the id of `teams`.
  - In that database, create a database with the id of `teams` as well.
- Next, you need to setup your collection with attributes
  - Create a new string attribute with the name of `title`, `string` type and `required`.
  - Create a new string attribute with the name of `description`, `string` type and `required`.
  - Create a new string attribute with the name of `color`, `string` type and `required`.
  - Create a new boolean attribute with the name of `completed`, `integer` type and `not required`.
- Create six functions (all with NodeJs environment ) and deploy all the folder in the `functions/` folder to each of the functions. It doesnt really matter if the id is same or different, but if you want to ease your deployment, then you can use the id from the `appwrite.json` and run `appwrite deploy functions` to quickly deploy all your functions (Make sure to build them before deploying, it is written in typescript).

Boom! You are done, all the best with the next steps ;)

## Install project
To run this awesome website locally, first:

- Clone the github repo
```
git clone https://www.github.com/kyeboard/planetary.git
```

- Change the directory to the folder
```
cd planetary
```

- Install required dependencies
```
pnpm install
```

- Start the website
```
pnpm start
```

<hr />

Built with ♥, [RefineJS](https://refine.dev/) and [Appwrite](https://www.appwrite.io)
