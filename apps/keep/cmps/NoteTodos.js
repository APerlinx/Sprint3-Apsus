export default {
  props: ['note'],
  template: `
        <article class="note-todo">
        <h2>{{ note.info.title }}</h2>
        <ul class="todo-list">
          <li v-for="todo in note.info.todos" :key="todo.txt" class="clean-list">
            <input type="checkbox" :id="todo.txt" />
            <label :for="todo.txt">{{ todo.txt }}</label>   
          </li>
         </ul>
        </article>
    
    `,
  computed: {},
};
