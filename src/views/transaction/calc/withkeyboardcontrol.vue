<template>
    <div style="display: contents;">
        <slot name='listcontent' v-bind:selectedIndex="selectedIndex"></slot>
    </div>
</template>
<script>
export default {
  name: "with-keyboard-controll",
  props: {
    listLength: Number
  },
  data() {
    return {
      selectedIndex: 0
    };
  },
//   render(h) {
//     return h(
//       "li",
//       this.$scopedSlots.default({ selectedIndex: this.selectedIndex })
//     );
//   },
  methods: {
    keyHandler(e) {
      /**
        38 - up
        40 - down
        9 - tab
        13 - enter
        27 - escape
       */
      const key = e.which || e.keyCode;
      if (key === 38 || (e.shiftKey && key === 9)) {
        this.handleKeyUp(e);
      } else if (key === 40 || key === 9) {
        this.handleKeyDown(e);
      } else if (key === 13) {
        this.handleEnter(e);
      } else if (key === 27) {
        this.escape(e);
      }
    },
    escape(e) {
      e.preventDefault();
      this.$emit("selected", null);
    },
    handleEnter(e) {
      e.preventDefault();
      this.$emit("selected", this.selectedIndex);
    },
    handleKeyUp(e) {
      e.preventDefault();
      if (this.selectedIndex <= 0) {
        // If index is less than or equal to zero then set it to the last item index
        this.selectedIndex = this.listLength - 1;
      } else if (
        this.selectedIndex > 0 &&
        this.selectedIndex <= this.listLength - 1
      ) {
        // If index is larger than zero and smaller or equal to last index then decrement
        this.selectedIndex--;
      }
    },
    handleKeyDown(e) {
      e.preventDefault();
      // Check if index is below 0
      // This means that we did not start yet
      if (
        this.selectedIndex < 0 ||
        this.selectedIndex === this.listLength - 1
      ) {
        // Set the index to the first item
        this.selectedIndex = 0;
      } else if (
        this.selectedIndex >= 0 &&
        this.selectedIndex < this.listLength - 1
      ) {
        this.selectedIndex++;
      }
    },
    addKeyHandler(e) {
      window.addEventListener("keydown", this.keyHandler);
      console.log('inject key handler add')
    },
    removeKeyHandler() {
      window.removeEventListener("keydown", this.keyHandler);
      console.log('inject key handler destroy')
    }
  },
  created() {
    // this.addKeyHandler();
  },
  destroyed() {
    // this.removeKeyHandler();
  }
};
</script>