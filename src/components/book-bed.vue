<template>
  <section>
    <link rel="stylesheet" href="https://unpkg.com/v-calendar/lib/v-calendar.min.css">
    <link
      rel="stylesheet"
      href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css"
    >
    <div class="calendar-header">Select Dates & Book!</div>
    <v-date-picker
      :disabled-dates="unAvailable"
      picker-date="month"
      mode="range"
      :min-date="new Date()"
      v-model="selectedDate"
    >
      <b-field :type="inputState.type" slot-scope="props">
        <b-input
          type="text"
          icon="calendar"
          :value="props.inputValue"
          :placeholder="inputState.message"
          @change.native="props.updateValue($event.target.value)"
          expand
        ></b-input>
        <p class="control" v-if="selectedValue"></p>
      </b-field>
    </v-date-picker>

    <button class="danger-button" @click="$emit('bookRequest', selectedDate)">Book</button>
  </section>
</template>


<script>
export default {
  props: {
    unAvailable: Array,
    default: []
  },
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
    allowedDates(val) {
      return parseInt(val.split("-")[2], 10) % 2 === 0;
    },
    minDate(today) {
      var isTodayAvailable = this.checkToday(today);
      if (isTodayAvailable) this.startDate = today;
      else this.minDate(today.getDate() + 1);
    },
    checkToday(currDate) {
      return this.unAvailable.every(
        date => new Date(date.start) > currDate || new Date(date.end) < currDate
      );
    }
  }
};
</script>


<style  scoped lang="scss">
@import "@/assets/scss/_vars.scss";

* {
  font-family: $main-font-light;
}

.calendar-header {
  font-family: $main-font-bold;
  text-align: left;
  font-size: 19px;
  margin-bottom: 5px;
  font-style: italic;
}
.container {
  // width: 90%;
  min-width: 200px;
}
section {
  width: 100%;
}
.modal-content {
  background-color: white;
  border-radius: 4px;
  border: 2px gray solid;
  padding: 45px;
  width: 90%;
}
</style>
