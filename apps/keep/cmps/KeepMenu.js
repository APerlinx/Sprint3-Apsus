export default {
  template: `
    <section class="keep-app-menu">
      <i class="mdi mdi-lightbulb-on-outline" title="Notes" @click="handleDisplayNotes"></i> 
      <i class="mdi mdi-bell-outline" title="Nothing here yet ;)"></i> 
      <i class="mdi mdi-pencil" title="Edit labels"></i> 
      <i class="mdi mdi-archive" title="Archive" @click="handleDisplayArchived"></i> 
      <i class="mdi mdi-trash-can-outline" title="Trash" @click="handleDisplayTrash"></i> 
    </section>  
  `,
  methods: {
    handleDisplayNotes() {
      this.$emit('display-notes');
    },
    handleDisplayArchived() {
      this.$emit('display-archived');
    },
    handleDisplayTrash() {
      this.$emit('display-trash');
    },
  },
};
