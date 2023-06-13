# Mesh
A project full of software engineers acting as mentors to students in order to expose them to software engineering processes and skills. This project employs an Agile approach using aspects from kanban, scrum and XP. 

## About Mesh
A site for mentors and mentees to swipe and meet each other. 

## Getting Involved

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
**This project was initialized with python 3.11.3.**
Please be sure when building the front end repository that you have the correct versions of npm and node.
The correct version can be found and installed [here](https://nodejs.org/en/download/current).

To check if your versions are correct you can use the following commands:
Check node version with `node -v` -> This should show v20.2.0 in the console
Check npm version with `npm -v` -> This should show 9.6.7 in the console

1.  Clone and change directories to the repository in the directory (ex. Desktop) you would like to work in. `git clone [repo link]`. 
Development is done on the `dev` branch. Ensure you are working either on `dev` or a branch that has branched off of `dev`. 
- To Switch to `dev` or another branch, `git checkout branch_name` ex: `git checkout dev` will switch to branch. 
2. Install the correct version of python & pip.
3. Install pipenv with pip -> `pip install pipenv`
4. Initialize the virtual environment for yourself and installs virtual environment dependencies -> `pipenv install`
5. **IMPORTANT** Get the .env file from someone and store it on your root directory '/SITE'
6. Activate the virtual environment -> `pipenv shell`
7. Go to `Site/meshapp/` and run an `npm install`
8. Build the frontend -> in the same directory as step 7 run `npm run build`
9. Return to the root directory and start the backend server / run the application ->  `python manage.py runserver`

#### Tips: 
- *I prefer to use Insomnia's rest client, you can use Postman or whatever tool you prefer for testing endpoints*
- *Mac users will need to install homebrew and use brew instead of pip*
- *For Windows users, I recommend WSL (Windows Subsystem for Linux)*

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

