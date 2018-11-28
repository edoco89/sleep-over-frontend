<template>
<section>
     <link rel="stylesheet" href="https://unpkg.com/v-calendar/lib/v-calendar.min.css">
    <link rel="stylesheet" href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css">
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
        <!-- <a :class="["button", inputState.type]" @click="selectedValue = null">Clear</a> -->
      </p>
    </b-field>
  </v-date-picker>

  <button @click="showDate">Book</button>
  </section>
</template>

// :available-dates='{ start: new Date(), end: null }' to show relevant options only

<script>
export default {
  data() {
    return {
      selectedDate: new Date(2018, 0, 10),
      selectedValue: null,
    };
  },
  computed: {
    inputState() {
      if (!this.selectedValue) {
        return {
          type: 'is-danger',
          message: 'Date required.',
        };
      }
      return {
        type: 'is-primary',
        message: '',
      };
    },
  },
  methods: {
      showDate() {
          console.log( 'selectedDate', this.selectedDate) //date ready, need to add dispatch
          console.log('selectedValue', this.selectedValue)
      }
  }
};
</script>


<style  scoped lang="scss">
@import "@/assets/scss/_vars.scss";

button {
    background-color:$button-danger-color;
    cursor: pointer;
    color:$button-danger-text-color;
    border: 0px;
    font-size: 1.3rem;
    padding: 5px 20px;
    margin: 10px;
    border-radius: 4px;
}

</style>
