# SimpliSense

## Project Title

SimpliSense - Harness the power of AI to demystify words and concepts, turning complex ideas into clear, understandable insights anytime, anywhere.

## Description

SimpliSense is a browser extension and web application that uses AI to explain complex concepts and ideas in simple terms. It provides a user-friendly interface for interacting with different AI models and allows users to get explanations for any text they select on the web.

## Table of Contents

- [Project Title](#project-title)
- [Description](#description)
- [Table of Contents](#table-of-contents)
- [Components](#components)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)

## Components

SimpliSense consists of two main components:

- **Frontend**: A browser extension and web application built using React and TypeScript.
- **Backend**: A server-side component built using Node.js and TypeScript, which provides an API for interacting with different AI models.

## Installation

To install SimpliSense, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/SimpliSense.git`
2. Install dependencies: `npm install`
3. Set up environment variables (e.g., API keys): `cp .env.example .env`
4. Start the backend server: `cd backend && npm start`
5. Load the browser extension: `cd frontend && npm start`

## Usage

To use SimpliSense, follow these steps:

1. Select some text on a web page.
2. Right-click on the selected text and choose "Explain with SimpliSense".
3. The SimpliSense popup will appear with an explanation of the selected text.

## Configuration

To configure SimpliSense, you can modify the following files:

- [backend/src/server.ts](cci:7://file:///j:/repos/SimpliSense/backend/src/server.ts:0:0-0:0): Configure the WebSocket server and the AI models.
- `frontend/src/config.ts`: Configure the browser extension and web application.
- `.env`: Set up environment variables for API keys and other settings.

## License

This project is licensed under the [MIT License](LICENSE).
