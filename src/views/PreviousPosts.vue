<template>
  <div>
    <vue-confirm-dialog></vue-confirm-dialog>
    <Loader v-if="loading"></Loader>
    <table v-else >
      <thead>
        <tr>
          <th>Канал</th>
          <th>Зображення</th>
          <th>Авто</th>
          <th>Опис</th>
          <th>Дата публікації</th>
          <th>Статус</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" v-bind:key="post.id">
          <td>
            <img
                v-bind:alt="post.canal"
                v-if="post.canal === 'telegram'"
                class="canalImage"
                src="../assets/images/telegram.png"/>
            <img
                v-bind:alt="post.canal"
                v-if="post.canal === 'instagram'"
                class="canalImage"
                src="../assets/images/Instagram.png"/>
          </td>
          <td>
            <img v-img v-bind:src="post.mainPhoto" v-bind:alt="post.carName" class="carImage">
          </td>
          <td class="carName">
            <a v-bind:href="post.url" target="_blank"> {{post.carName}} </a>
          </td>
          <td class="description">
            {{post.description}}
          </td>
          <td>
            {{post.postDate}}
          </td>
          <td>
            {{post.isPosted ? 'Опубліковано' : 'Заплановано'}}
          </td>
          <td>
            <button v-if="!post.isPosted" @click="deleteSavedPost(post.id)" class="removeButton">X</button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav>
      <ul class="pagination">
        <li class="page-item">
          <button type="button" class="page-link" v-if="page != 1" @click="page--"> Previous </button>
        </li>
        <li class="page-item">
          <button
              type="button"
              class="page-link"
              @click="page = pageNumber"
              v-bind:class="{selectedPage : page === pageNumber}"
              v-for="pageNumber in pages.slice(Math.max(page-3, 0), page+3)"
              v-bind:key="pageNumber"> {{pageNumber}} </button>
        </li>
        <li class="page-item">
          <button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import api from "@/api";
import Loader from "@/components/Loader";

export default {
  name: "PreviousPosts",
  data() {
    return {
      posts: [],
      page: 1,
      perPage: 10,
      pages: [],
      loading: true
    }
  },
  created() {
    this.onCreate()
  },
  watch: {
    page: async function (val) {
      this.loading = true;
      window.scrollTo(0,0);
      await api.getSavedPosts(val).
          then(response => {
            this.posts = response.data;
          });
      this.loading = false;
    }
  },
  methods: {
    async onCreate() {
      this.loading = true;
      await api.getSavedPosts(1).
      then(response => {
        this.posts = response.data;
        let totalPages = Math.ceil( response.headers['x-total-count'] / this.perPage);
        for (let p = 1; p <= totalPages; p++) {
          this.pages.push(p);
        }
      });
      this.loading = false;
    },
    deleteSavedPost(id) {
      this.$confirm(
          {
            message: "Ви дійсно хочете видалити запланований пост?",
            button: {
              no: 'Відміна',
              yes: 'Так'
            },
            callback: async confirm => {
              if (confirm) {
                await api.deleteSavedPost(id);
                this.posts = this.posts.filter(p => p.id !== id);
              }
            }
          }
      )
    }
  },
  components: {Loader}
}
</script>

<style scoped>
  .carName a:hover {
    color: #aaf;
  }

  .carName a {
    font-size: 16px;
    color: white;
    text-decoration: none;
  }

  .carName {
    text-align: center;
  }

  .removeButton {
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    font-weight: bold;
    cursor: pointer;
  }

  .description {
    font-size: 1px;
    width: 40%;
  }

  .selectedPage {
    border: 2px solid #74b807!important;
    font-weight: 600!important;
  }

  .carImage {
    width: 120px;
  }

  .canalImage {
    width: 32px;
  }

  button.page-link {
    display: inline-block;
  }
  button.page-link {
    font-size: 20px;
    border: 2px solid transparent;
    margin: 3px;
    background-color: #333;
    color: #29b3ed;
    font-weight: 500;
  }
  button.page-link:focus {
    outline: none;
  }
  .pagination {
    display: flex;
    list-style: none;
  }

</style>