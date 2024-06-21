import "../css/task.css";

export const Task = () => {
  return (
    <form className="input">
      <input
        type="input"
        placeholder="Enter a task"
        className="input__box"
      ></input>
      <button className="input__submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default Task;
