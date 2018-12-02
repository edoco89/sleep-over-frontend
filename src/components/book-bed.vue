<template>
  <section class="container">
    <link rel="stylesheet" href="https://unpkg.com/v-calendar/lib/v-calendar.min.css">
    <link
      rel="stylesheet"
      href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css">
    <v-date-picker mode="range" :min-date="new Date()" v-model="selectedDate">
      <b-field :type="inputState.type" slot-scope="props">
        <b-input
          type="text"
          icon="calendar"
          :value="props.inputValue"
          :placeholder="inputState.message"
          @change.native="props.updateValue($event.target.value)"
          expanded
        ></b-input>
        <p class="control" v-if="selectedValue">
        </p>
      </b-field>
    </v-date-picker>

    <button @click="showBookMessage">Book</button>

    <div @click="closeModal" :class="{'is-active' : showModal}" class="modal">
      <div class="modal-background"></div>
      <div class="modal-content">Great! Your booking has been submitted,
        <br>we will notify you as soon as the host approves this request.
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
  </section>
</template>

// :available-dates='{ start: new Date(), end: null }' to show relevant options only

<script>
export default {
  data() {
    return {
      selectedDate: {
        start: new Date(),
        end: new Date()
      },
      selectedValue: {
        start: null,
        end: null
      },
      showModal: false
    };
  },
  computed: {
    inputState() {
      if (!this.selectedValue) {
        return {
          type: "is-danger",
          message: "Date required."
        };
      }
      return {
        type: "is-primary",
        message: ""
      };
    }
  },
  methods: {
    showBookMessage() {
      console.log("selectedDate", this.selectedDate); //date ready, need to add dispatch
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>


<style  scoped lang="scss">
@import "@/assets/scss/_vars.scss";

* {
  font-family: $main-font-light;
}

button {
  font-family: $main-font-bold;
  background-color: $button-danger-color;
  cursor: pointer;
  color: $button-danger-text-color;
  border: 0px;
  font-size: 1.3rem;
  padding: 5px 40px;
  margin-top: 10px;
  border-radius: 4px;
  width: 100%;
}

.container {
  width: 90%;
  min-width: 200px;
}

.modal-content {
  background-color: white;
  border-radius: 4px;
  border: 2px gray solid;
  padding: 45px;
  width: 90%;
}
</style>
