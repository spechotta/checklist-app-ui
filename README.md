# checklist-app-ui

This is the frontend for a checklist management application built using **TypeScript**, **React**, **Next.js**, and **Material UI**. 
It connects to my [checklist-app-api](https://github.com/spechotta/checklist-app-api) repository to display and manage checklists and their items in a responsive user interface.

> ⚠️ This project is currently under active development. Planned features include the ability to create and delete checklists, implement user authentication to restrict checklist access, and provide a user interface for managing account settings.

---

## Features
- View, create, edit, and delete checklists and checklist items
- Responsive layout using Material UI
- Search bar with dynamic filtering (in development)
- Real-time updates to the UI after checklist item operations

---

## Tech Stack

- **Language**: TypeScript
- **JavaScript Library**: React.js
- **React Framework**: Next.js
- **Component Library/Styling**: Material UI (MUI)
- **Networking**: Axios

---

## Getting Started
### Prerequisites

Before running the application, please make sure these are installed:

- **Node.js**
- **Google Chrome** is the preferred browser (developed using Chrome DevTools)

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/spechotta/checklist-app-ui.git

2. **Install dependencies:**

   ```bash
   npm install

3. **Run the application:**

    - From the terminal:
    ```bash
    npm run dev
    ```
    - Alternatively, you may create a run/debug configuration within IntelliJ (or your preferred IDE) to run the application.    

### Notes
- The app will be available at: http://localhost:3000.
- The frontend expects the backend to be running on http://localhost:8000 by default.