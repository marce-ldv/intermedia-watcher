# Price Tracker

This application is designed to display the prices of the most well-known cryptocurrencies, allowing users to make comparisons, view price fluctuations, and add them to their favorites. It can be compared to a website like https://coinmarketcap.com/.

# You can navigate to the following sections:

- [Features](https://github.com/marce-ldv/intermedia-watcher#features)
- [Architecture](https://github.com/marce-ldv/intermedia-watcher#architecture)
- [Backend - Domain Driver Design](https://github.com/marce-ldv/intermedia-watcher#backend---domain-driver-design)
- [Frontend](https://github.com/marce-ldv/intermedia-watcher#frontend)
- [Requirements with Docker](https://github.com/marce-ldv/intermedia-watcher#requirements-with-docker)
- [Installation with Docker](https://github.com/marce-ldv/intermedia-watcher#installation-with-docker)
- [How to Run Locally](https://github.com/marce-ldv/intermedia-watcher#how-to-run-locally)
- [Usage](https://github.com/marce-ldv/intermedia-watcher#usage)
- [Testing](https://github.com/marce-ldv/intermedia-watcher#testing)
- [How to Run the Application in Local](https://github.com/marce-ldv/intermedia-watcher#how-to-run-the-application-in-local)

## Technologies

This project uses the following technologies:

- Next.js
- React
- Tailwind with Flowbite
- Sanity CMS
- Docker

## Features

The following features are available in this application:

- Displays a list of top cryptocurrencies.
  - The information is obtained using the free CoinGecko API (https://www.coingecko.com/es/api/documentation).
  - A list of cryptocurrencies can be configured and pre-defined by a system administrator.
  - It can be viewed without logging in.
  - Each item in the list should display:
    - Logo
    - Current price
    - Market capitalization
    - Change in the last 24 hours (%)
    - Button to add to favorites (only authenticated users and if this cryptocurrency allows it)
    - Edit cryptocurrency button (admin only)
  - Edit cryptocurrency button (admin only)
  - Delete cryptocurrency button (admin only)
    - When pressed, a modal should appear asking if the user wants to delete the cryptocurrency.
- Option to display only favorite cryptocurrencies (for authenticated users)
- Updates prices every minute.
- User registration
  - A user can register for the system by accessing another section or modal from the main page.
  - By default, there will be a user with an administrator role (which will give access to other functions).
  - The user must register with the following information:
    - Username
    - Email
    - Password
  - The following verifications should be checked and appropriate error messages should be displayed:
    - If another user is already registered with the same email.
    - If the email has a valid format.
    - If the password has at least 8 characters and consists of letters and numbers.
- User authentication
  - Similar to the registration process, the user can be authenticated by accessing a different section or modal.
  - The following information is required to access:
    - Email
    - Password
  - Admin users can access in the same way as regular users.
  - The following verifications should be checked and appropriate error messages should be displayed:
    - If the email or password is incorrect.
    - If the email format is incorrect.
- Cryptocurrency addition panel to be displayed on the main screen (only visible and accessible to admin users)
  - The navigation bar will display an additional menu.
  - It should allow adding a cryptocurrency with the following information:
    - Logo
    - Display name
    - Internal ID (for API search)
    - Whether it is allowed to add to favorites.

## Architecture

This project is a monorepo, using yarn workspaces to manage dependencies. The frontend uses Atomic design and typescript, while the backend is built using express using Domain Driven Design (DDD) architecture with a Hexagonal Architecture approach.

## Backend - Domain Driver Design

Domain Driven Design (DDD) is a software development approach that focuses on the business domain, and it provides a set of guidelines and principles to design and implement software systems that reflect the real-world domain accurately. The main idea behind DDD is to create a shared language between business stakeholders and developers, which helps to reduce complexity and ensure that the software system meets the business needs.

DDD is based on the following principles:
- Focus on the core domain
- Collaborate with domain experts
- Ubiquitous Language
- Bounded Contexts
- Context Mapping
- Model-Driven Design
- Continuous Integration

The Hexagonal Architecture, also known as Ports and Adapters Architecture, is an architectural style that helps to create software systems that are easy to maintain, test, and extend. The main idea behind Hexagonal Architecture is to separate the business logic from the infrastructure and to make the business logic the center of the design.

The Hexagonal Architecture consists of three layers:
- Domain layer: This layer contains the business logic, domain entities, and domain services.
- Application layer: This layer contains the use cases and application services that use the domain layer.
- Infrastructure layer: This layer contains the adapters that connect the application layer to the outside world, such as databases, APIs, or message queues.

Using DDD and Hexagonal Architecture together can help to create software systems that are highly modular, maintainable, and scalable. The separation of concerns between the business logic and the infrastructure makes it easier to change one without affecting the other.

![DDD.](https://miro.medium.com/v2/resize:fit:772/0*67W0-IRKLFtTI7dO.jpg "Hexagonal.")

Here's an example of the folder structure tha i trying to do for the backend using DDD and Hexagonal Architecture:

```
src/
  apps/
    coins/
      backend/
        controllers/
          Coins/
            CoinsController.ts
          User/
            UserController.ts
        dependency-injection/
          container.ts
        routes/
          CoinsRoutes.ts
          UserRoutes.ts
        server.ts
      Contexts/
        CoinsCtx/
          Coins/
            application/
              services/
                GetCoins.ts
                AddCoinToFavorites.ts
                RemoveCoinFromFavorites.ts
              use-cases/
                GetCoinsUseCase.ts
                AddCoinToFavoritesUseCase.ts
                RemoveCoinFromFavoritesUseCase.ts
            domain/
              models/
                Coin.ts
                User.ts
              repositories/
                CoinsRepository.ts
                UsersRepository.ts
              services/
                CoinsService.ts
              value-objects/
                CoinId.ts
            infrastructure/
              adapters/
                CoinsRepositoryAdapter.ts
                UsersRepositoryAdapter.ts
              data-sources/
                CoinsDataSource.ts
                UsersDataSource.ts
                mappers/
                  CoinsMapper.ts
                  UsersMapper.ts
          User/
            application/
              services/
                CreateUser.ts
                AuthenticateUser.ts
              use-cases/
                CreateUserUseCase.ts
                AuthenticateUserUseCase.ts
            domain/
              models/
                User.ts
              repositories/
                UsersRepository.ts
              services/
                UsersService.ts
              value-objects/
                UserId.ts
            infrastructure/
              adapters/
                UsersRepositoryAdapter.ts
              data-sources/
                UsersDataSource.ts
              mappers/
                UsersMapper.ts
        tests/
          CoinsCtx/
            Coins/
              application/
              domain/
              infrastructure/
            User/
              application/
              domain/
              infrastructure/
```

In this structure, the `backend` folder contains the entry point for the server and the implementation of the controllers and routes. The `Contexts` folder contains the bounded contexts, and each context has its own folder with the implementation of the domain, application, and infrastructure layers.

The `dependency-injection` folder contains the implementation of the dependency injection container using a node dependency injection module. The `tests` folder contains the unit tests for each

## Frontend:

The frontend of this application is built using React.js and follows the Atomic Design methodology for the component structure. I used Tailwind CSS with Flowbite as the UI framework for styling (why not?), although I have experience with other UI frameworks like Material UI and StyledComponents. As the application is relatively small, I decided not to use Storybook for component documentation and testing.

I use React context with custom hooks to manage global application state, which includes user authentication and coin data. To make API calls to the backend server, I implemented API routes that prevent CORS issues by making the API calls on the server instead of the client.

Additionally, I implemented a middleware to redirect the user depending on their status. For example, if the user is logged in and tries to access the login page, they will be redirected to the main route which displays the table of coins.

For unit testing, I used React Testing Library to test individual components and ensure they are functioning as intended. I am currently working on implementing end-to-end tests using Cypress.

Overall, the frontend is designed to be user-friendly and responsive, with a simple and intuitive interface that allows users to view and manage their coin portfolio easily.

## Requirements with docker

To run this project, you need to have Docker installed on your machine. If you don't have Docker installed, you can download it from [here](https://www.docker.com/get-started).

## Installation with Docker

To get started, clone the project to your local machine using the following command:

```
git clone https://github.com/marce-ldv/intermedia-watcher.git
```

Once you have cloned the project, create a `.env.development` file inside the `packages` directory of the frontend repo:

```
touch packages/.env.development
```

Open the `.env.development` file and add the following environment variables. You can follow the `.env.example` file:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/
NEXT_API_ROUTE_URL=http://localhost:5000/
```

Now create a `.env` file in the root directory of the backend and add the following environment variables:

```
SANITY_TOKEN=
JWT_SECRET=
SESSION_SECRET=
SANITY_PROJECT_ID=
```

You can follow the `.env.example` file for reference.

Now that you have set up the environment variables, go to the root of the project and run the following command to start the application:

```
docker-compose up
```

This command will build the Docker images and start the containers for both the frontend and the backend.

Once the containers are up and running, you can access the application by visiting `http://localhost:3000` in your web browser.

Additionally, you can access the frontend by opening your browser and typing `http://localhost:3000` in the address bar. You should be able to see the homepage with the list of available cryptocurrencies.

For the backend, you can access the API documentation by opening your browser and typing `http://localhost:5000/api-docs` in the address bar. This will take you to the Swagger UI page, where you can browse and test the available API endpoints.

If you encounter any issues during the setup process, please make sure that you have followed all the steps correctly and that the required dependencies are installed on your system. You can also refer to the project's documentation or contact the developer for further assistance.

## Usage

The application allows users to view a table of cryptocurrency coins, along with their current price and market cap. Users can also search for a specific coin by name, and view its details on a separate page.

To get started, simply log in to the application using your preferred authentication method. Once you are logged in, you can view the table of coins, search for a specific coin, and view its details.

## Testing

To run the unit tests for the frontend, run the following command in the root:

```
npm run test:frontend
```

To run the end-to-end tests using Cypress (wip), run the following command in the `frontend` directory:

```
npm run cy:open
```

This will open the Cypress test runner, where you can select and run the tests.


## How to run the application in local:

Before running the application, make sure you have Node.js 16 or higher installed on your machine. If you are on Windows, run the following command before starting the application:

```
npm install -g win-node-env
```

However, if you are on Linux or Mac, you can ignore the above command.

To run the application, navigate to the root of the project and run the following command:

```
yarn && yarn dev
```

This will install the dependencies and start the application. The frontend and backend will be running simultaneously.

Note: If you want to run the application using Docker, please refer to the section "How to run the application using Docker" in the README.


## Credits

This application was created by Marcelo Ludovino.

Thank you for using this application!
