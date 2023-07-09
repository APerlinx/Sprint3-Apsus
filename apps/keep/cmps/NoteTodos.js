export default {
  props: ['note', 'showTitle'],
  template: `
  <article class="note-todo">
    <h2 v-if="showTitle">{{ note.info.title }}</h2>
    <ul class="todo-list">
      <li v-for="todo in note.info.todos" :key="todo.txt" class="clean-list">
        <input type="checkbox" :id="todo.txt" :checked="todo.doneAt !== null" @click.stop="toggleDone(todo)" />
        <label :for="todo.txt" :class="{ 'todo-done': todo.doneAt !== null }">{{ todo.txt }}</label>
      </li>
    </ul>
  </article>
    `,
 methods: {
  toggleDone(todo) {
    if(todo.doneAt !== null) {
      todo.doneAt = null;
    } else {
      todo.doneAt = Date.now()
    }
  },
},
};
