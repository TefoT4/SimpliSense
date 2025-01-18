# SimpliSense Backend

## Project Title

SimpliSense Backend - Harness the power of AI to demystify words and concepts, turning complex ideas into clear, understandable insights anytime, anywhere.

## Description

The SimpliSense Backend is a server-side component of the SimpliSense project. It provides an API for interacting with different AI models and handles the communication between the frontend and the AI models.

## Table of Contents

- [Project Title](#project-title)
- [Description](#description)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)

## Installation

1. Clone the repository: `git clone https://github.com/your-username/SimpliSense-backend.git`
2. Install dependencies: `npm install`
3. Set up environment variables (e.g., API keys): `cp .env.example .env`
4. Start the server: `npm start`

## Usage

To use the SimpliSense Backend API, you can send HTTP requests to the server. The API supports the following endpoints:

- `/api/chat`: Send a chat message to the AI model and receive a response.
- `/api/generate`: Generate text using the AI model.

For more details on how to use the API, refer to the [API documentation](docs/api.md).

## Configuration

To configure the SimpliSense Backend, you can modify the following files:

- `src/server.ts`: Configure the WebSocket server and the AI models.
- `.env`: Set up environment variables for API keys and other settings.

## License

This project is licensed under the [MIT License](LICENSE).