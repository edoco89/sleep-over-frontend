<template>
  <section>
    <el-select
      v-model="value5"
      @change="$emit('setFilter',value5)"
      placeholder="Select"
      multiple
      collapse-tags
      style="margin-left: 20px;"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </section>
</template>


<script>
export default {
  props: {
    opt: String,
    default: "amenities",
    set: Object,
    default: null
  },
  data() {
    return {
      options: [],
      amenities: [
        {
          value: "Wifi",
          label: "Wifi"
        },
        {
          value: "Pets",
          label: "Pets"
        },
        {
          value: "Air Conditioner",
          label: "Air Conditioner"
        },
        {
          value: "Shampoo",
          label: "Shampoo"
        },
        {
          value: "Parking",
          label: "Parking"
        },
        {
          value: "Children Ok",
          label: "Children Ok"
        },
        {
          value: "Accessible",
          label: "Accessible"
        }
      ],
      value5: []
    };
  },
  mounted() {
    this.options = this[this.opt];
    if (this.set) {
      for (let ament in this.set) {
        if (this.set[ament]) this.value5.push(ament);
      }
    }
  },
  computed: {}
};
</script>