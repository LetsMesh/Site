# Mesh

## About Mesh

We are an open-source project that aims to provide students with a unique
opportunity to gain mentorship, practice collaborative skills, and familiarize themselves with modern
technologies and software methodologies. Our Discord server serves as the primary hub for communication
and interaction related to this initiative.

So, what exactly is Mesh?

Mesh is a professional match-making site designed to connect mentors and educators from various career
disciplines with mentees who are seeking guidance and mentorship.

Let's Mesh, on the other hand, is a massive undertaking specifically crafted to assist students in gaining
practical experience in software engineering and professional environments. We understand the importance of
offering a glimpse into the industry and providing students with opportunities to develop both technical
and social skills.

## Getting Involved

As a participant, you'll have the opportunity to:

- Engage in code reviews, giving and receiving valuable feedback.
- Seek help and ask questions to overcome challenges and enhance your skills.
- Develop self-sufficiency, managing tasks and improving time management.
- Contribute to agile ceremonies, communicate progress, and present your work to the team.

Various roles are available:

- Front End: UI, UX, and UI design using React (Typescript).
- Back End: Database, API, and server development with Django (Python).
- Full Stack: Both front-end and back-end development.
- Mobile: Mobile UI and app development using Android Studio and Java.
- QE: Testing, including UI, unit, and integration testing.
- Mentor: Share your expertise and guide early-career individuals.

Interested? Join our [Discord community](https://discord.gg/j7xAGGgRZC) and stay tuned for updates.

Let's Mesh together and create a valuable learning experience in software engineering!

## Developer Checklist:

### Project Structure

Project is designed to utilize django's powerful features.

- meshapp: React Files, Image Assets, Styling & Front-End
- mesh: Django Files, API folders, Middle & Back-End
- .gitignore: ignores files that shouldn't be tracked by git
- manage.py: Django related file for running our project.
- PipFile & PipFile.lock: virtual environment dependencies, settings, and standardization for pipenv
- requirements.txt: requirements for the project

Great, here's an updated version of the instructions with some recommended Docker commands for users:

### Getting Your Environment Set Up

#### Run with Docker

Running the Mesh project with Docker simplifies the setup process by containerizing the application along with its Redis and MySQL dependencies. This means you do **not** need to install MySQL or Redis locally if you're using Docker.

##### Prerequisites:

- Docker and Docker Compose installed on your machine. Installation instructions can be found on [Docker's official website](https://www.docker.com/get-started).

##### Steps:

1. **Environment Variables Setup**:

   - In the root folder `/Site`, duplicate the `template.env` file and rename the copy to `.env`.
   - Ensure all necessary environment variables are defined in this `.env` file.

2. **Docker Compose**:
   - Navigate to the root directory of the project (`/Site`).
   - Run the command: `docker-compose up --build`. This builds the Docker images and starts the containers.

##### Recommended Docker Commands

- To rebuild and restart only the frontend service:
  ```
  docker-compose up --build frontend
  ```
- To rebuild and restart only the backend service:
  ```
  docker-compose up --build backend
  ```
- To stop and remove the containers:
  ```
  docker-compose down
  ```
- To view the logs of a specific service:
  ```
  docker-compose logs -f <service_name>
  ```
  Replace `<service_name>` with `frontend`, `backend`, `mysql`, or `redis` to see the logs for the respective service.

#### Run locally (install directly in your local machine)

**This project was initialized with python 3.11.3.** The download for which can be found [here](https://www.python.org/downloads/release/python-3113/).
Please be sure when building the front end repository that you have the correct versions of node and npm. The correct version can be found and installed [here](https://nodejs.org/en/blog/release/v20.2.0).

To check if your versions are correct you can use the following commands:
Check node version with `node -v` -> This should show v20.2.0 in the console.
Check npm version with `npm -v` -> This should show 9.6.6 in the console.

1. Clone and change directories to the repository /site. `git clone [repo link]`.
2. Development is done on the `dev_new` branch. Ensure you are working either on `dev_new` or a branch that has branched off of `dev_new`. To switch to a branch, use `git checkout [branch_name]`.
3. Install pipenv with pip using `pip install pipenv`.
   - If pip is not recognized, you can do `py -m ensurepip` to check that pip is installed, then restart your Terminal.
4. **IMPORTANT** Go to the LetsMesh Discord and the #current-sprint channel. The pinned comment will direct you to an .env file template. Fill that out and store it on your root directory '/SITE'.
5. Initialize the virtual environment and install virtual environment dependencies using `pipenv install`.
6. Activate the virtual environment using `pipenv shell`.
7. Build the frontend by running `npm run init:frontend`.
8. Return to the root directory and start the backend server / run the application with `python manage.py runserver`.
    - `cd ..` (Windows) or `cd -` (MacOS) to go back a directory.
    - Alternatively, you can use `npm run start` instead for the same effect, but make sure you're in the root directory.
9. Download MySQL over [here](https://dev.mysql.com/downloads/installer/). Download the larger file.
10. Do the setup and spam next until you see the password portion.
    - Make sure you are not using the legacy version. Select the 8.x version.
12. Make a password for the root account or a custom username.
    - Make sure you remember your passwords and username (username is by default root).
13. Write the username and password in your .env file.
14. Spam next until you finish and then you’re done.
15. Open a terminal and make sure MySQL is installed by typing in `mysql -V`
    - If the command doesn’t work it may be because mysql isn’t added to your path. The default location for mysql server should be: C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe. A possible solution can be found [here](https://stackoverflow.com/questions/5920136/mysql-is-not-recognised-as-an-internal-or-external-command-operable-program-or-b).
    - If it says Access Denied, move onto the next step.
16. Login to MySQL by using  `mysql --u [username] --p` and then type in the password when prompted.
    - FYI: You should manually type the password as pasting it may not work.
17. You should be prompted into the MySQL shell, where you will then create a database by using `CREATE DATABASE mesh;`.
18. Confirm your database is created with `SHOW DATABASES;`.
19. Use `\q` or `exit` to quit MySQL.
20. Make sure your pip environment is opened with `pipenv shell` and that you are in the root directory.
21. Run `npm run init` to set up the backend and frontend.
    - You will most likely be given warnings. Warnings are fine errors aren’t. Google your errors.
    - Tip: `npm run init:frontend` and `npm run init:backend` will set up the frontend and the backend, respectively.

- To Switch to `dev` or another branch, `git checkout branch_name` ex: `git checkout dev` will switch to branch.

2. Install the correct version of python & pip.
3. Install pipenv with pip -> `pip install pipenv`
4. Initialize the virtual environment for yourself and installs virtual environment dependencies -> `pipenv install`
   **IMPORTANT** Get the .env file from someone and store it on your root directory '/SITE' if you haven't already before running this command.
5. Activate the virtual environment -> `pipenv shell`
6. Go to `Site/meshapp/` and run an `npm install`
7. Build the frontend -> in the same directory as step 7 run `npm run build`
8. Return to the root directory and start the backend server / run the application -> `python manage.py runserver`
   MYSQL SETUP (windows, if you have a mac, consider switching to a windows)
9. Download Mysql over here https://dev.mysql.com/downloads/installer/ ( i downloaded the file that was 331.3 M)
10. Do the setup and do the full download (spam next until you see the password portion)
11. Make sure you are not using the legacy version, select the 8.x version
    a. Make sure you remember your passwords and username(username is by default root)
12. Spam next until you finish and then you’re done
    Make sure you write the username and password in your.env file. With that being said,that’s it for your mysql setup, next thing we do is django.

13. Open a terminal and make sure mysql is installed by typing in `mysql -V`
    a. If the command doesn’t work it may be because mysql isn’t added to your path. The default location for mysql server should be:
    C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe
    i. Possible solution: https://stackoverflow.com/questions/5920136/mysql-is-not-recognised-as-an-internal-or-external-command-operable-program-or-b
14. Once you have mysql downloaded, create a new database inside your mysql.
    a. Login to mysql by using `mysql --u root --p` and then type in the password you saved previously when prompted
    i. Do note that root is the default username so use whatever username you used
    b. You should be prompted into they mysql shell, and then create a database by using `CREATE DATABASE mesh;`
    c. Confirm your database is created with `SHOW DATABASES;`
15. make sure your pip environment is opened (with `pipenv shell`)
16. Type in `python manage.py makemigrations`
    a. You will most likely be given warnings. Warnings are fine errors aren’t. Google your errors.
17. Type in `python manage.py migrate`
    a. Similar to the previous step warnings are fine, errors aren’t.
18. Make sure your frontend is also set up (with npm run build) and then you are good to go. Run `python manage.py runserver` and you should be good to go.

#### Tips:

- _I prefer to use Insomnia's rest client, you can use Postman or whatever tool you prefer for testing endpoints_
- _Mac users will need to install homebrew and use brew instead of pip_
- _For Windows users, I recommend WSL (Windows Subsystem for Linux)_

### Running the Application:

- Build the app using `npm run build` within the meshapp\ directory
- Return to the root directory of the repository
- Run `python manage.py runserver`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

npm commands for the application (front end React app) that can be run at the meshapp/ directory

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
