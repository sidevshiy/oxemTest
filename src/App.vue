<template>
  <div id="app">
    <TableUsers :users="users" v-if="!loading" />
    <div v-else class="d-flex justify-content-center mb-3">
      <BSpinner label="Loading..."></BSpinner>
    </div>
  </div>
</template>

<script>
import { BSpinner } from 'bootstrap-vue';
import TableUsers from './components/TableUsers';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    BSpinner,
    TableUsers
  },
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapGetters('usersTable', ['users'])
  },
  created(){
    this.loading = true;
    this.$store.dispatch('usersTable/getUsers').then(() => this.loading = false);
  }
}
</script>

<style>

</style>
