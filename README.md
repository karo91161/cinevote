# CineVote 🎬

A small React project for learning purposes, focusing on state management, components, and modern React hooks.

## 🧩 Features

- Fetch and display movie data (static or API-ready)
- Allow users to vote on movies
- Display vote counts
- Store watched movie list in `localStorage`
- Autofocus on the search input when page loads or when pressing **Enter**
- Track user rating decision flow using `useRef`
- Responsive UI

## 🛠️ Custom Hooks

- `useMovies` – Handles movie data fetching from the API
- `useLocalStorage` – Global getter and setter for `localStorage` operations
- `useKey` – Global keypress handler (e.g., Enter, Escape)

## ⚙️ Technologies Used

- React (functional components)
- React Hooks (`useState`, `useEffect`, `useRef`, custom hooks)
- CSS Modules
- JavaScript (ES6+)

## 🖼️ Screenshots

Below are a few screenshots of the current UI:

![Home screen](home.png)  
*Home screen*

![Movie details](movie-details.png)  
*Movie details*

![Rate](rate.png)  
*Rating component*

![Watched](watched-list.png)  
*Home screen with watched movie list*


## 🚀 Getting Started

```bash
git clone https://github.com/karo91161/cinevote.git
cd cinevote
npm install
npm start
