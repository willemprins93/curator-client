# M3 - Curator App

<br>

## Description

Tinder-style app where the user likes/dislikes artworks from the Metropolitan Museum of Art's open access collection.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up in the platform so that I can use the app
- **Login:** As a user I can login to the platform so that I can use the app
- **Logout:** As a user I can logout from the platform so no one else can use it
- **Like Artworks** As a user I can like an artwork to add it to my collection
- **View Artwork** As a user I can find out more info about my liked artworks
- **View Profile** As a user I can look at my liked artworks, and find out more about them
- **Edit Collection** As a user I can edit my collection to remove liked artworks later on
- **Edit User** As a user I can edit my name and email
- **View Most Liked Artworks** As a user I can view a list of most liked artworks, and how many likes they have

## Backlog

User profile:

- change password
- see other users based on your likes

Artworks:

- leave a comment

API:

- add other museum's API's

<br>

# Client

## React Router Routes (React App)

| Path                   | Component      | Permissions                | Behavior                                                                                              |
| ---------------------- | -------------- | -------------------------- | ----------------------------------------------------------------------------------------------------- |
| `/`                    | Home           | anon only `<AnonRoute>`    | Home page, link to Signup/Login                                                                       |
| `/signup`              | Signup         | anon only `<AnonRoute>`    | Signup form, link to login, navigate to Curator after signup                                          |
| `/login`               | Login          | anon only `<AnonRoute>`    | Login form, link to signup, navigate to Collection after login                                        |
| `/curator`             | Curator        | user only `<PrivateRoute>` | Shows sequence of random artworks, basic info and like/dislike button                                 |
| `/user`                | User           | user only `<PrivateRoute>` | Shows all user's liked artworks (image), as well as some analytics, edit profile link and logout link |
| `/user/editcollection` | EditCollection | user only `<PrivateRoute>` | Edit collection of liked artworks                                                                     |
| `/user/editprofile`    | EditUser       | user only `<PrivateRoute>` | Edit user info                                                                                        |
| `/artwork/:id`         | Artwork        | user only `<PrivateRoute>` | Details of an artwork                                                                                 |
| `/mostlikedworks`      | LikedWorks     | user only `<PrivateRoute>` | List of all liked works                                                                               |
| `/logout`              | n/a            | user only `<PrivateRoute>` | Logs user out                                                                                         |

## Components

- Home

- Login

- Signup

- Curator

- User

- Artwork

- EditCollection

- EditUser

- LikedWorks

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.edit(user)
  - auth.logout()
- Curator Service
  - artwork.random()
  - artwork.add(id)
  - artwork.single(id)

<br>

## Links

### Trello/Kanban

[Trello](https://trello.com/b/ur4kECPk/project-m3-curator)

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
