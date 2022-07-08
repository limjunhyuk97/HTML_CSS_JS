import Todo from "./Todo.js";

const Todos = ({ todos }) => {
  return (
    <div>
      {todos.map((el, idx) => (
        <Todo key={idx} todo={el} />
      ))}
    </div>
  );
};

export default Todos;
