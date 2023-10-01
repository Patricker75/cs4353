
# 4353 Group Project

  

**Team:**

- Hiep Tran

- Ian Grant

- Sameer Altaf

- Viet Bui

  

# Project Specifications

- NodeJS v18.17.1
- Using React

## Set up for Frontend

  

1. Clone the repository to your local machine:

  

```shell

git clone https://github.com/Patricker75/cs4353.git

```

  

2. Set up Node.js and npm for your React app:

  

### Install Node Version Manager (nvm)

  

- On Linux/macOS, you can use the following command to install nvm:

  

```shell

curl -o https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

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

  

### Starting the Frontend

  

```shell

cd frontend

npm install

cd ..

make client

```

  

This will start the development server, and your React app will be accessible at http://localhost:4000/ in your web browser.
