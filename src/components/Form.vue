<template>
  <div class="flex justify-center h-screen bg-gray-400">
    <div class="w-1/3">
      <p class="py-8 text-center text-5xl">Form</p>
      <t-input-group
        v-for="(label, index) in labels"
        :key="index"
        :label="label.name"
        label-class="text-white capitalize text-base"
      >
        <t-input
          base-class="border-2 block w-full rounded-lg shadow-inner bg-white border-gray-600 focus:outline-none focus:shadow-outline"
          v-model="label.value"
          size="sm"
          type="text"
          @change="handelInput(label.value)"
        />
      </t-input-group>
      <div class="flex justify-between ">
        <!-- <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="handelSubmit()"
        >
          Save
        </button> -->
        <div class="flex items-center">
          <div class="w-64 bg-white h-4 border-green-600 border-2 rounded-lg mx-4 p-0">
            <div
              :style="{ width: this.progress + '%' }"
              class="bg-green-500 h-full rounded-lg"
            ></div>
          </div>
          <div>{{ progress }} % completed</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "Form",
  data() {
    return {
      labels: [
        {
          name: "label 1",
          value: "",
        },
        {
          name: "label 2",
          value: "",
        },
        {
          name: "label 3",
          value: "",
        },
        {
          name: "label 4",
          value: "",
        },
        {
          name: "label 5",
          value: "",
        },
      ],
      progress: 0,
    };
  },
  mounted() {
    this.handelInput();
  },
  methods: {
    handelInput(value) {
      var db = firebase.firestore();
      var count = 0;
      this.labels.forEach(async (label) => {
        if (value === label.value) {
          await db
            .collection("label")
            .doc(label.name)
            .set(label);
        }

        var getValue = await db
          .collection("label")
          .doc(label.name)
          .get();

        label.value = getValue.data().value;

        if (label.value != "") {
          count += 1;
        }
        this.progress = (100 / this.labels.length) * count;
      });
    },
    // async handelSubmit() {
    //   var db = firebase.firestore();
    //   this.labels.forEach(async (label) => {
    //     await db
    //       .collection("label")
    //       .doc(label.name)
    //       .set(label);
    //   });
    // },
  },
};
</script>
<style scoped></style>
