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
      interests: [
        {
          value: "Sports",
          label: "Sports"
        },
        {
          value: "Food",
          label: "Food"
        },
        {
          value: "Bars",
          label: "Bars"
        },
        {
          value: "Chill",
          label: "Chill"
        },
        {
          value: "Books",
          label: "Books"
        },
        {
          value: "Travel and Hiking",
          label: "Travel and Hiking"
        },
        {
          value: "Kids",
          label: "Kids"
        },
        {
          value: "Musicals",
          label: "Musicals"
        },
        {
          value: "Rock",
          label: "Rock"
        },
        {
          value: "Javascript",
          label: "Javascript"
        }
      ],
      languages: [
        {
          value: "English",
          label: "English"
        },
        {
          value: "Hebrew",
          label: "Hebrew"
        },
        {
          value: "Swahili",
          label: "Swahili"
        },
        {
          value: "French",
          label: "French"
        },
        {
          value: "Spanish",
          label: "Spanish"
        },
        {
          value: "Romanian",
          label: "Romanian"
        },
        {
          value: "Chinese",
          label: "Chinese"
        },
        {
          value: "Japanese",
          label: "Japanese"
        },
        {
          value: "Thai",
          label: "Thai"
        },
        {
          value: "Portugese",
          label: "Portugese"
        },
        {
          value: "Russian",
          label: "Russian"
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
};
</script>