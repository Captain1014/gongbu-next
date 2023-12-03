# Gongbu

## Overview

'Gongbu' is a korean word, meaning "Study". As a Korean, I know the struggles to learn a new language. There are many resources but you are not sure what to look at, not sure if you are actually learning or not... Is this you right now? Then this web app is for you!

Gongbu is a web app that will allow users to keep track of their learning journey with fun. Users can register and login. Once they are logged in, they can create their own list or look at other people's lists. For their own list, they can add the items or delete the items.

## Data Model

The application will store Users and their customized lists.

- Users can have multiple lists
  - their own lists that they can add or delete, each list can have multiple items

An Example User:

```javascript
{
  username: "leahchung1",
  hash: // a password hash,
  lists: // an array of references to List documents
}
```

An Example List with Embedded Items:

```javascript
{
  user: // a reference to a User object
  name: "Korean basic verbs",
  items: [
    { name: "가다", meaning: "to go", memorized: false},
    { name: "먹다", quantity: "to eat", memorized: true},
  ],
  createdAt: // timestamp
}
```

## [Link to Commented First Draft Schema](src/db.mjs)


## Wireframes

- /main - main page

  ![main](documentation/main.png)

- /login - login page

  ![login](documentation/login.png)

- /register - register page

  ![register](documentation/register.png)

- /lists - lists of cards

  ![lists](documentation/lists.png)

- /lists/edit - edit a list

  ![lists edit](documentation/lists-edit.png)

- /list/playGame - flash cards

  ![lists cards](documentation/lists-cards.png)


## Site Map

Here's a basic text-based site map to help you understand the structure of my project:

- **Home**
  - Welcome page
- **home/login**
  - login page
- **home/register**
  - register page
- **home/showLists
  - If the user logged in, Display the current list. 
  - If the user is not logged in, show the login.
  - List 1
  - List 2
  - List 3
  - users can add and delete a list on this page
- **home/lists/edit**
  - the query param will be /lists/edit?{ID}
  - Update button - update the item that you just edited.
  - Users are redirected to this edit page if they click the edit icon on the showLists page.
- **lists/playGame**
  - Display the korean words of the list
  - Click Start button to start the game
  - Enter the word's meaning
  - Once you get rid of every item, the game is over
  - Once the timer is over, the game is over

## User Stories or Use Cases

1. as non-registered user, I can register a new account at /register
2. as a user, I can log in to the site at /login or homepage
3. as a user, I can add and delete an item of the lists if I logged in
4. as a user, I can view all of the words lists I've created in a single list
5. as a user, I can play a game with the list.

## Research Topics

- (5 points) Integrate user authentication
  - I'm going to be using next.auth for user authentication
  - Users need to login to access to see the lists or play the game.
- (2 points) tailwind.css
  - learned how to master tailwind.css for better CSS styles. It's also one of the biggest CSS frameworks.
- (6 points) React and Next.js
  - Used React and Next.js overall, they are the biggest and most powerful frameworks combination so I assign 6 points to it.

13 points total, but max points are 10 so 10 points worth.

## [Link to Initial Main Project File](src/app.mjs)

## Annotations / References Used

1. [next auth authentication docs](https://next-auth.js.org/v3/adapters/typeorm/mongodb)
2. [tutorial on next.js](https://nextjs.org/learn/dashboard-app)
3. [tutorial on tailwind.css](https://tailwindcss.com/docs/installation)
