const BASE_URL = "http://localhost:8080/api/";

export default {
  async getTodos() {
    const response = await fetch(BASE_URL + "todos");
    return response.json();
  },
  createTodo(newTodo) {},
  updateTodo(todo2Update) {},
  deleteTodo(id) {},
};
