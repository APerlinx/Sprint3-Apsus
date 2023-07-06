export default {
  props: ['note'],
  template: `
  <article class="note-todo">
    <h2>{{ note.info.title }}</h2>
    <ul class="todo-list">
      <li v-for="todo in note.info.todos" :key="todo.txt" class="clean-list">
        <input type="checkbox" :id="todo.txt" v-model="todo.done" />
        <label :for="todo.txt" :class="{ 'todo-done': todo.done }">{{ todo.txt }}</label>
      </li>
    </ul>
  </article>
    `,
  computed: {},
};
