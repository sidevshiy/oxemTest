<template>
  <div class="container">
    <div class="input-group mb-3 mt-5">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1"><i class="bi-alarm"></i></span>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder="Username"
        aria-label="Username"
        aria-describedby="basic-addon1"
        v-model="queryString"
      />
      <BButton v-b-modal.modal-1>Добавить</BButton>
    </div>
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col" 
              v-for="(heading,index) in headings" :key="index"
              @click="sorted({key: heading.name, type: heading.type});isSorted(index)"
              >
                  {{ heading.name }} <i v-if="heading.isSorted" class="bi bi-caret-down-fill" :class="showSorted(heading.type)"></i>
              </th>
          <th scope="col">Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in paginatedUsers"
          :key="user.id + '-' + index"
          @click="chooseUser(user.id)"
        >
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.phone }}</td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example mt-3">
      <ul class="pagination justify-content-center">
        <li class="page-item" v-for="page in pages" :key="page">
          <a class="page-link" href="#" @click="pageClick(page)">{{ page }}</a>
        </li>
      </ul>
    </nav>
    <div v-if="currentUser" class="mt-5">
      Выбран пользователь <b>{{ currentUser.firstName }}</b
      ><br />
      Описание:<br />
      <textarea v-model="currentUser.description"> </textarea><br />
      Адрес проживания: <b>{{ currentUser.address.streetAddress }}</b> Город:
      <b>{{ currentUser.address.city }}</b
      ><br />
      Провинция/штат: <b>{{ currentUser.address.state }}</b> Индекс:
      <b>{{ currentUser.address.zip }}</b>
    </div>
    <BModal id="modal-1" size="lg"  hide-footer>
      <Form></Form>
    </BModal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { BButton, BModal } from "bootstrap-vue";
import Form from './Form'
export default {
  components: {
    BModal,
    BButton,
    Form
  },
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    usersPerPage: 30,
    currentPage: 1,
    currentUser: null,
    queryString: '',
    headings: [
      {
        name: 'id',
        type: 'integer',
        isSorted: false,
      },
      {
        name: 'firstName',
        type: 'string',
        isSorted: false,
      },
      {
        name: 'lastName',
        type: 'string',
        isSorted: false,
      },
    ]
  }),
  computed: {
    ...mapGetters('usersTable',['integerReverse','stringReverse']),
    showSorted(){
      return (type) => {
        return type == 'integer' ? (this.integerReverse ? 'bi-caret-down-fill' : 'bi-caret-up-fill')  : 
        (this.stringReverse ? 'bi-caret-down-fill' : 'bi-caret-up-fill');
      }
    },
    pages() {
      return Math.ceil(this.users.length / this.usersPerPage);
    },
    paginatedUsers() {
      if(this.queryString !== '') {
        return this.users.filter(user => {
          return user.firstName.toUpperCase().indexOf(this.queryString.toUpperCase()) !== -1 || 
          user.lastName.toUpperCase().indexOf(this.queryString.toUpperCase()) !== -1 ||
          user.phone.indexOf(this.queryString) !== -1 ||
          user.id.toString().indexOf(this.queryString) !== -1;
        });
      }
      let from = (this.currentPage - 1) * this.usersPerPage;
      let to = from + this.usersPerPage;
      return this.users.slice(from, to);
    },
  },
  methods: {
    pageClick(page) {
      this.currentPage = page;
    },
    chooseUser(id) {
      this.currentUser = {
        ...this.paginatedUsers.filter((user) => user.id == id)[0],
      };
    },
    isSorted(index){
      this.headings.map(elem => {
        elem.isSorted = false;
      })
      this.headings[index].isSorted = true;
    },
    ...mapActions('usersTable', ['sorted']),
  },
};
</script>

<style>
.btn {
  margin-left: 15px;
}

tr {
  cursor: pointer;
}

tr:hover {
  background-color: #6b7a8a;
}
</style>
