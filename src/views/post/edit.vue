<template>
  <!-- Begin page content -->
  <main class="flex-shrink-0 mt-5">
    <div class="container">
      <div class="card">
        <h5 class="card-header">EDIT POST</h5>
        <div class="card-body">
          <router-link
            :to="{ name: 'post.index' }"
            type="button"
            class="btn btn-sm btn-success"
            >BACK TO POST LIST</router-link
          >
          <div class="row mt-3">
            <form @submit.prevent="update" class="row g-3">
              <div class="col-md-12">
                <label for="title" class="form-label">Post Title</label>
                <input type="text" class="form-control" id="title" v-model="post.title" />
                <small v-if="validation.title" class="text-danger">
                    {{ validation.title[0] }}
                </small>
              </div>
              <div class="col-12">
                <label for="content" class="form-label">Post Content</label>
                <textarea id="content" cols="30" rows="4" v-model="post.content" class="form-control"></textarea>
                <small v-if="validation.content" class="text-danger">
                    {{ validation.content[0] }}
                </small>
              </div>
              
              <div class="col-12">
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
import axios from "axios";
import { onMounted, ref, reactive } from "vue";
import { useRouter, useRoute } from 'vue-router';
export default {
  setup() {
    // reactive state
    const post = reactive({
        title: '',
        content: ''
    })

    // state validation
    const validation = ref([])

    // vue router
    const router = useRouter()

    // vue route
    const route = useRoute()

    // mounted
    onMounted(() => {
        // get show post api from laravel backend
        axios.get(`http://localhost/backend-api/public/api/post/${route.params.id}`).then(response => {
            // assign state post with response data
            post.title = response.data.data.title
            post.content = response.data.data.content
        }).catch(error => {
            console.log(error.response.data)
        })
    });

    function update() {
        let title = post.title
        let content = post.content
        
        axios.put(`http://localhost/backend-api/public/api/post/${route.params.id}`, {
            title: title,
            content: content
        }).then(() => {
            // redirect to index post
            router.push({
                name: 'post.index'
            })
        }).catch(error => {
            // assign state validation with error
            validation.value = error.response.data.errors
        })
    }

    return {
      post,
      validation,
      router,
      update
    };
  },
};
</script>