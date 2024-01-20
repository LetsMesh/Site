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

### Getting Your Environment Set Up:

**This project was initialized with python 3.11.3.** The download for which can be found [here](https://www.python.org/downloads/release/python-3113/).
Please be sure when building the front end repository that you have the correct versions of node and npm. The correct version can be found and installed [here](https://nodejs.org/en/blog/release/v20.2.0).

To check if your versions are correct you can use the following commands:
Check node version with `node -v` -> This should show v20.2.0 in the console.
Check npm version with `npm -v` -> This should show 9.6.6 in the console.

1. Clone and change directories to the repository in the directory (ex. Desktop) you would like to work in. `git clone [repo link]`.
2. Development is done on the `dev_new` branch. Ensure you are working either on `dev_new` or a branch that has branched off of `dev_new`. To switch to a branch, use `git checkout [branch_name]`.
3. Install pipenv with pip using `pip install pipenv`.
   - If pip is not recognized, you can do `py -m ensurepip` to check that pip is installed, then restart your Terminal.
4. **IMPORTANT** Get the .env file from another contributor and store it on your root directory '/SITE' if you haven't already before running this command.
5. Initialize the virtual environment and install virtual environment dependencies using `pipenv install`.
6. Activate the virtual environment using `pipenv shell`.
7. Go to `Site/meshapp/` and run an `npm install`. You can change your directory to this folder using `cd meshapp`.
8. Build the frontend by running `npm run build`.
9. Return to the root directory and start the backend server / run the application with `python manage.py runserver`.
    - `cd ..` (Windows) or `cd -` (MacOS) to go back a directory.

**MYSQL SETUP** (If you are on a Mac, consider switching to Windows if you have one)
1. Download MySQL over [here](https://dev.mysql.com/downloads/installer/). Download the larger file.
2. Do the setup and do the full download (spam next until you see the password portion).
3. Make a password for the root account or a custom username.
   - Make sure you remember your passwords and username (username is by default root).
4. Write the username and password in your .env file.
5. Spam next until you finish and then you’re done.

Next we're onto Django.
1. Open a terminal and make sure MySQL is installed by typing in `mysql -V`
   - If the command doesn’t work it may be because mysql isn’t added to your path. The default location for mysql server should be: C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe. A possible solution can be found [here](https://stackoverflow.com/questions/5920136/mysql-is-not-recognised-as-an-internal-or-external-command-operable-program-or-b).
   - If it says Access Denied, move onto the next step.
2. Login to MySQL by using  `mysql --u [username] --p` and then type in the password you saved previously when prompted.
   - FYI: You should manually type the password as pasting it may not work.
4. You should be prompted into the MySQL shell, where you will then create a database by using `CREATE DATABASE mesh;`.
5. Confirm your database is created with `SHOW DATABASES;`.
6. Make sure your pip environment is opened with `pipenv shell`.
7. Type in `python manage.py makemigrations`.
    - You will most likely be given warnings. Warnings are fine errors aren’t. Google your errors.
8. Type in `python manage.py migrate`.
    - Similar to the previous step warnings are fine, errors aren’t.
9. Make sure your frontend is set up with `npm run build`, then run `python manage.py runserver`, and you should be good to go.

#### Tips:

- _I prefer to use Insomnia's rest client, you can use Postman or whatever tool you prefer for testing endpoints_
- _Mac users will need to install homebrew and use brew instead of pip_
- _For Windows users, I recommend WSL (Windows Subsystem for Linux)_

### Running the Application:

- Build The app using `npm run build` within the meshapp\ directory
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


