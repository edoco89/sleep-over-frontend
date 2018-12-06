<template>
  <section class="container">
      <link rel="stylesheet" href="https://unpkg.com/v-calendar/lib/v-calendar.min.css">
      <link
        rel="stylesheet"
        href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css">
    <v-date-picker picker-date="month" mode="range" :min-date="new Date()" v-model="selectedDate">
      <b-field :type="inputState.type" slot-scope="props">
        <b-input
          type="text"
          icon="calendar"
          :value="props.inputValue"
          :placeholder="inputState.message"
          @change.native="props.updateValue($event.target.value)"
          expand
        ></b-input>
        <p class="control" v-if="selectedValue">
        </p>
      </b-field>
    </v-date-picker>

    <button class="danger-button" @click="$emit('bookRequest', selectedDate)">Book</button>
  </section>
</template>


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
    allowedDates(val){
      return parseInt(val.split('-')[2], 10) % 2 === 0;
     }
  }
};
</script>


<style  scoped lang="scss">
@import "@/assets/scss/_vars.scss";

* {
  font-family: $main-font-light;
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
