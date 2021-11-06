<template>
  <!-- Begin page content -->
  <main class="flex-shrink-0 mt-5">
    <div class="container">
      <div class="card">
        <h5 class="card-header">POST LIST</h5>
        <div class="card-body">
          <router-link
            :to="{ name: 'post.create' }"
            type="button"
            class="btn btn-sm btn-success"
            >ADD POST</router-link
          >
          <div class="row mt-3">
            <div class="col-md-12">
              <table class="table table-hover">
                <thead class="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">TITLE</th>
                    <th scope="col">CONTENT</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(post, index) in posts" :key="index">
                    <th scope="row" width="1">{{ post.id }}</th>
                    <td>{{ post.title }}</td>
                    <td>{{ post.content }}</td>
                    <td width="100">
                      <div class="d-flex justify-content-start">
                        <router-link
                          :to="{ name: 'post.edit', params: { id: post.id } }"
                          class="btn btn-sm btn-warning"
                          >Edit</router-link
                        >
                        <button @click.prevent="deletePost(post.id)" class="btn btn-sm btn-danger ms-2">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
export default {
  setup() {
    // reactive state
    let posts = ref([]);

    // mounted
    onMounted(() => {
      // get api from laravel backend
      axios
        .get("http://localhost/backend-api/public/api/post")
        .then((response) => {
          // assign state posts with response data
          posts.value = response.data.data;
          console.log(response.data.data)
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function deletePost(id) {
        // delete post by id 
        axios.delete(`http://localhost/backend-api/public/api/post/${id}`).then(() => {
            // splice posts
            const index = this.posts.findIndex(post => post.id === id) // find the post index 
            if (~index) {
                // if the post exists in array
                this.posts.splice(index, 1)
            }

        }).catch(error => {
            console.log(error.response.data)
        })
    }

    return {
      posts,
      deletePost
    };
  },
};
</script>