export default {
  props: ['note'],
template: `
    <div class="color-options">
      <div
        v-for="color in colorOptions"
        :key="color"
        class="color-option color"
        :style="{ backgroundColor: color }"
        @click.stop="selectColor(color)" >
        <i
        v-if="color === 'none'"
        class="material-icons no-color-icon">
        remove_circle_outline
      </i>
      </div>
    </div>
  `,
  data() {
        return {
          colorOptions: [
            'rgba(173, 216, 230, 0.7)', // lightcyan with 50% opacity
            'rgba(255, 255, 0, 0.7)', // yellow with 50% opacity
            'rgba(0, 0, 255, 0.7)', // blue with 50% opacity
            'rgba(0, 128, 0, 0.7)', // green with 50% opacity
            'rgba(255, 192, 203, 0.7)', // pink with 50% opacity,
            'none'],
        }     
  },
  methods: {
      selectColor(color) {
        if(color === 'none') color = null
        this.$eventBus.emit('bg-color-change', { note: this.note, color })
      },
  }
}