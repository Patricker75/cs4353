```markdown
# 4353 Group Project

**Team:**
- Hiep Tran
- Ian Grant
- Sameer Altaf
- Viet Bui

## Frontend Specifications
- NodeJS v18.17.1
Using react
## Prerequisites

Before you can run this Flask application, ensure you have the following installed:

- Python ([Download Python](https://www.python.org/downloads/))
- Flask ([Flask Installation](https://flask.palletsprojects.com/en/2.1.x/installation/))

## Setup

Make sure to install Flask using pip first:

```shell
pip install Flask
```

## Running the Flask App

To start your Flask app, go to the directory where your `app.py` file is located in your terminal or command prompt. Then, run the following command:

```shell
python app.py
```

## Set up for Frontend

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/Patricker75/cs4353.git
   ```

2. Set up Node.js and npm for your React app:

   ### Install Node Version Manager (nvm)

   - On Linux/macOS, you can use the following command to install nvm:

     ```shell
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
     ```

   - On Windows, download and run the installer from the official nvm GitHub repository [here](https://github.com/nvm-sh/nvm).

   ### Install Node.js and npm

   Install the LTS (Long Term Support) version of Node.js using nvm:

   ```shell
   nvm install --lts
   ```

   ### Verify Installation

   ```shell
   node --version
   npm --version
   ```

   You should see the installed versions of Node.js and npm.

   ### Create a React App

   Now that you have Node.js and npm set up, you can create a React app using the `create-react-app` command:

   ```shell
   npx create-react-app my-react-app
   ```

   Replace `my-react-app` with your desired project name. This command will set up a new React project in a directory with the specified name.

   ### Running the React App

   Once your React app is set up, navigate to the project directory and run the development server:

   ```shell
   cd my-react-app
   npm start
   ```

   This will start the development server, and your React app will be accessible at http://localhost:3000/ in your web browser.






