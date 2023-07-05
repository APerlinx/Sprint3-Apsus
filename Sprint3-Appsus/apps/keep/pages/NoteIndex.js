import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'


export default {

	template: `
    <main class="keep-index">
       <div class="add-note" contenteditable="true" role="textbox">
       <button class="add-icon" title="Add Note"><i class="fas fa-plus"></i></button>
       <button class="delete-icon" title="Delete Note"><i class="fas fa-trash"></i></button>
       </div>  
        <section class="notes">
          
          <div class="note">im a note</div>
          <div class="note">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
          <div class="note">Eius vero, fugiat nobis excepturi doloremque laboriosam</div>
          <div class="note">id quam dolor, dolorem repellat distinctio accusantium ad iusto earum nesciunt similique tempore deserunt? In?</div>
          <div class="note">Eius vero, fugiat nobis excepturi doloremque laboriosam</div>
          <div class="note">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        </section>
        <nav class="menu">
            <h1>navbar</h1>
        </nav>
    </main>
  
    `,
    data() {
        return {
            notes: [],
            filterBy: null,
        }
    },
    created() {
        noteService
          .query()
          .then(books => this.books = books)
          .catch((error) => console.error('Error fetching books:', error))
      },
}
