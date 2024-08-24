# Recipes 

This is school project build with Ionic/Angular and Firebase REST API. It is simple app for managing recipes.

## Overview

Recipes is a comprehensive platform for discovering, managing, and sharing recipes. Users can add, edit, and delete recipes. The app also supports user registration and login, enabling personalized experiences.

## Features

- **User Authentication**: Register, log in, and manage user profiles.
- **Recipe Management**: Add, edit, delete, and view recipes.

## Technologies Used

- **Frontend and Backend**: [Angular.js](https://angular.dev/) and [Ionic](https://ionic.io/)
- **Database**: [Firestore](https://firebase.google.com/products/firestore) for recipe and user data
- **Authentication**: [Firebase Authentication](https://firebase.google.com/products/auth)
- **APIs**: REST APIs for communication between frontend and backend

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Clone the Repository

```bash
git clone https://github.com/dubravkaD/recipes.git
cd recipes
```

### Install Dependencies

```bash
npm install
```

### Configuration

**Firebase Setup**:

_ Create Firebase project and set up your Realtime Database
- In src/environments/environments.ts add your apiKey and databaseURL

```typescript
firebaseConfig:{
    apiKey:"YOUR API KEY",
    databaseURL:"YOUR DATABASE URL"
}  
```

## Running the App

To start the server and run the app locally, use:

```bash
ionic serve
```

The app will be available at `http://localhost:8100`

## Usage

### User Registration and Login 🔐

- Navigate to the registration or login page to create or access your account.
- Use your email and password for authentication.

### Managing Recipes 📋

- **Add Recipe**: Go to the Profile and select Add Recipe, fill out the form, and submit.
- **Edit Recipe**: Navigate to your recipe you wish to edit and make changes.
- **Delete Recipe**: Slide the recipe and choose the Delete option.

### Viewing Recipes 📖

- **Browse Recipes**: View the recipe list on the home page.
- **Recipe Details**: Click on a recipe to view its detailed information.

### View Profile

- **Browse Profile Information**: Navigate to Profile and click on username or email to view information.

## Roadmap

### Features in plan

- **Comments and Reviews**: Post comments and reviews, and interact with other users
- **Recipe Search and Filter**: Search for recipes by keywords and filter by categories
- **Image Handling**: Upload and view images associated with recipes

## Contributing

To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a pull request.

