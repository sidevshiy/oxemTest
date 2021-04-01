<template>
  <div class="form-group">
    <label for="inputEmail4"
      >{{ name }} <i v-if="activated" class="bi" :class="validClass"></i
    ></label>
    <input type="text" :value="value" @input="onInput" class="form-control" />
  </div>
</template>

<script>
export default {
	name:"form-input",
  props: {
    name: String,
    value: String,
    pattern: RegExp,
  },
  data: () => ({
    activated: false
  }),
  computed: {
    validClass() {
      return this.pattern.test(this.value)
        ? "bi-check-circle-fill"
        : "bi-x-circle-fill";
    },
  },
  methods: {
    onInput(e) {
      this.activated = true;
      this.$emit("changedata", {
        value: e.target.value,
        valid: this.pattern.test(e.target.value),
      });
    },
  },
};
</script>

<style scoped>
.bi-check-circle-fill {
	color: green;
}

.bi-x-circle-fill {
	color: red;
}
</style>
