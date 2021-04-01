<template>
  <div>
    <div class="progress m-3" style="height: 20px">
      <div
        class="progress-bar"
        role="progressbar"
        :style="'width:' + progressBar"
      ></div>
    </div>
    <form @submit.prevent="sendData">
      <FormInput
        v-for="(input, index) in fields"
        :key="input.name + index"
        :name="input.name"
        :value="input.value"
        :pattern="input.pattern"
        @changedata="onChange(index, $event)"
      />
      <button
        type="submit"
        :disabled="done < fields.length"
        class="btn btn-primary"
      >
        Добавить
      </button>
    </form>
  </div>
</template>

<script>
import FormInput from "./Input";
import { mapActions } from "vuex";
export default {
	name: 'form-data',
  components: {
    FormInput,
  },
  data: () => ({
    fields: [
      {
        name: "ID",
        arrName: "id",
        value: "",
        pattern: /^\d+$/,
      },
      {
        name: "First Name",
        arrName: "firstName",
        value: "",
        pattern: /^[a-zA-Z]*$/,
      },
      {
        name: "Last Name",
        arrName: "lastName",
        value: "",
        pattern: /^[a-zA-Z]*$/,
      },
      {
        name: "Email",
        arrName: "email",
        value: "",
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
      },
      {
        name: "Phone",
        value: "",
        arrName: "phone",
        pattern: /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d$/,
      },
    ],
    controls: [],
    done: 0,
  }),
  created() {
    for (let i = 0; i < this.fields.length; i++) {
      this.controls.push(false);
    }
  },
  computed: {
    ...mapActions("usersTable", ["addUser"]),
    progressBar() {
      return (this.done / this.fields.length) * 100 + "%";
    },
  },
  methods: {
    onChange(index, data) {
      this.fields[index].value = data.value;
      this.controls[index] = data.valid;
      let done = 0;
      for (let i = 0; i < this.controls.length; i++) {
        if (this.controls[i]) {
          done++;
        }
      }
      this.done = done;
    },
    sendData() {
      let data = {};
      for(let i = 0; i < this.fields.length; i++){
			data[this.fields[i].arrName] = this.fields[i].value
		}
		//TODO: здесь проблема
      this.addUser(data);
		this.$bvModal.hide('modal-1')
		//this.addUser(1);
      console.log(data);
    },
  },
};
</script>

<style>
</style>
