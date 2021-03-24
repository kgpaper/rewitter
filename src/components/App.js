import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <div className="App">
      <AppRouter />
      <footer>&copy; Rewitter {new Date().getFullYear()} </footer>
    </div>
  );
}

export default App;
