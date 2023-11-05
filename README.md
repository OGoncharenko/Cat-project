# Welcome to the Cat_project

This is a simple Vite app that uses the [TheCatAPI](https://thecatapi.com/) to display random cat images.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment variables](#environment-variables)
- [Usage](#usage)

## Prerequisites

Before you start, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/) - Ensure you have Node.js installed. You can download it from the official website.

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/OGoncharenko/Cat-project
   ```
2. Navigate to the project directory:
    ```
    cd cat-project
    ```
3. Install dependencies via npm:
    ```
	npm install
    ```
    This will install Vite locally as a dev dependency for your project.

4. Run:
    ```
    npm run dev
    ```
5. Open your browser and go to http://localhost:5173 to see your Vite app in action.


## Environment Variables
1. Create a .env file in the root of your project to store your API key. You can obtain an API key from TheCatAPI.

2. Your .env file should look like this:
    ```
    VITE_CAT_API_KEY=your-api-key-here
    ```
## Usage
This app allows you to fetch and display random cat images from TheCatAPI. To use it, follow these steps:

1. Launch the app as explained in the "Getting Started" section.
2. You will see random cat images displayed on the web page.
3. You can click the icon ‘Like’ on each image.
4. Click the "Refresh" button to load a new random cat image.
5. Enjoy the adorable cat pictures!


