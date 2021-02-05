# bloglist-frontend
Frontend for bloglist example app

Single page app for keeping a list of blogs, along with details like author, url, and user who saved the blog.

Has the following features:
- token authentication using jwt and bcrypt
  - page uses local storage to keep user logged in on page refresh
- Once logged in, user can see a list of blog entries
  - clicking "show details" renders more detailed information for a particular blog
  - if a blog was added by logged in user, button to remove the blog entry will also be available
- form for adding new blog renders when "create new blog entry" button is pressed
  - simple client-side authentication for inputs
  - server-side authentication for title and author to be required, along with URL to be unique using Mongoose library
- user has option to click "like" button on each blog to increment its number of "likes"
  - blogs will render themselves in order of decreasing number of likes
- some api components can be accessed directly
  - /api/users for user information JSON
  - /api/blogs for blog information JSON
- some unit testing with jest and supertest

log in with the following credentials:
```
username: guest
password: gimmieblogs
```

The following technologies were used:
- Created with the MERN stack.
  - MongoDB
  - Express
  - React
  - Node
- Database hosted via MongoDBAtlas.
- App hosted on Heroku.

[click here to go to app](https://limitless-mountain-76869.herokuapp.com/)

[click here to go to backend repo](https://github.com/nicksama88/blog-exercise)
