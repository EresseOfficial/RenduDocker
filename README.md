# Golden Rules Project
This project is a React application that allows users to manage a list of "Golden Rules." Users can create, delete, and read rules, as well as like or dislike them. The project uses Docker for easy setup and reproducibility.

## Prerequisites
Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Docker. For macOS users, Docker can be installed using Homebrew with the command ```brew install --cask docker```. For Linux/WSL users, you may use the command ```sudo apt install docker-ce```. For more detailed instructions, refer to the official Docker [documentation](https://docs.docker.com/).
- You have a basic understanding of Docker and containerization.

## Getting Started
To install the Golden Rules Project, follow these steps:

1. Clone the repository to your local machine with the command ```git clone <your-repository-url>```.
2. Navigate to the project directory in your terminal with the command ```cd <your-project-directory>```.

To start the application with Docker, execute the following command in the project root directory:
``` docker compose up --build ```

This command will start all the services defined in docker-compose.yml in detached mode. 
The application will be available at http://localhost:80.

## Usage
The application interface allows users to perform several actions related to "Golden Rules."

**NOTE**: The update functionality is not implemented in the React project. While the application interface includes options for creating, deleting, liking, and disliking rules, these features are currently non-functional due to pending backend integrations and fetch request issues.

The source code of the project, especially files like `RuleList.jsx` and `RuleForm.jsx`, has been modified in an attempt to connect them to the database. However, these changes are incomplete, and the interaction with the database is not fully functional.

The backend is correctly connected to the database, which is set up correctly, but remains empty, as attempts to add data through the backend have encountered fetch-related issues.

## Troubleshooting
If you encounter fetch errors or connection issues, verify that the backend service is running correctly and that there are no network restrictions blocking the requests. Additionally, check the console for any client-side errors that could provide more insight into the issues.

## Contributing to Golden Rules Project
To contribute to Golden Rules Project, follow these steps:
1. Fork this repository.
2. Create a new branch: ```git checkout -b <branch_name>```.
3. Make your changes and commit them: ```git commit -m '<commit_message>'```.
4. Push to the original branch: ```git push origin <project_name>/<location>```.
5. Create the pull request.

Alternatively, see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Project Status
The project is currently in development. Functionality for updating rules and the backend integration for creating, deleting, liking, and disliking rules are in progress.

## Contact
If you want to contact me, you can reach me at `sitraka.rakotovao@hotmail.com`.

