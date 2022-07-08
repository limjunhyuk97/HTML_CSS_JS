import { Header, Todos } from "./components";

import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "todo1" },
    { id: 2, text: "todo2" },
  ]);

  return (
    <div className="container">
      <Header />
      <Todos todos={todos}></Todos>
    </div>
  );
}

export default App;
