<template>
  <!-- Begin page content -->
  <main class="flex-shrink-0">
    <div class="container">
      <h1 class="mt-5">Index Post</h1>
      <div class="row">
        <div class="col-md-12">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(post, index) in posts" :key="index">
                <th scope="row">{{ post.id }}</th>
                <td>{{ post.title }}</td>
                <td>{{ post.content }}</td>
                <td>
                    <router-link :to="{name: 'post.edit', params:{id: post.id }}" class="btn btn-warning">Edit</router-link>
                    <button class="btn btn-danger ms-2">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
export default {
    setup() {
        // reactive state
        let posts = ref([])

        // mounted
        onMounted(() => {
            // get api from laravel backend
            axios.get('http://localhost/backend-api/public/api/post').then(response => {
                // assign state posts with response data
                posts.value = response.data.data
                console.log(response.data)
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        return {
            posts
        }
    }
};
</script>