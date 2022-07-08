const Todo = ({ todo }) => {
  return (
    <div className="todo">
      <h3>
        {todo.text}
        <span>x</span>
      </h3>
    </div>
  );
};

export default Todo;
