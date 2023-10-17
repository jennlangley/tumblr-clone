# Ramble

[Ramble](https://ramble-iqta.onrender.com/) is a social media blogging app inspired by Tumblr. It is a platform for users to share posts of various media types, comment, like, as well as repost.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Showcase](#showcase)
- [Wiki Documents](#wiki-documents)
- [Installation](#installation)
- [Authors](#authors)

## Technologies Used
### Backend
- Python
- Flask
- SQLAlchemy

### Frontend
- JavaScript
- React
- Redux
- HTML / CSS


## Features
- Posts
- Comments
- Likes
- Follows
- Reposts
- AWS

## Showcase


![postcreation](https://github.com/jennlangley/tumblr-clone/assets/106412948/ed610b7e-5b10-45bc-aacb-fe0caed3ee30)

![commentcreate](https://github.com/jennlangley/tumblr-clone/assets/106412948/f21f8a0c-7865-4619-9b77-ed8016352f3f)



## Wiki Documents
- [Backend Routes](https://github.com/jennlangley/style-swap/wiki/API%E2%80%90Routes)
- [Database Schema](https://github.com/jennlangley/style-swap/wiki/Database-Schema)
- [Feature List](https://github.com/jennlangley/style-swap/wiki/Feature-List)
- [User Stories](https://github.com/jennlangley/style-swap/wiki/User-Stories)

## Installation

1. Clone this repository [(only this branch)](https://github.com/jennlangley/tumblr-clone)
2. Install dependencies
      ```bash
      pipenv install -r requirements.txt
      ```
      
3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```
5. cd inside the `react-app` directory. Run `npm install` to install all your dependencies before starting up the application.
   
7. From the `root directory` run `flask run`.
   
9. From the `react-app` directory run `npm start`.

## Authors
- [Jennifer Langley](https://github.com/jennlangley)
- [Gabriel Laguerre](https://github.com/gabriellaguerre)

