<template>
  <!-- Begin page content -->
  <main class="flex-shrink-0 mt-5">
    <div class="container">
      <div class="card">
        <h5 class="card-header">CREATE POST</h5>
        <div class="card-body">
          <router-link
            :to="{ name: 'post.index' }"
            type="button"
            class="btn btn-sm btn-success"
            >BACK TO POST LIST</router-link
          >
          <div class="row mt-3">
            <form @submit.prevent="store" class="row g-3">
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
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router'
import axios from "axios";
export default {
    setup() {
        // state post
        const post = reactive({
            title: '',
            content: ''
        })

        // state validation
        const validation = ref([])

        // vue router
        const router = useRouter()

        // method store
        function store() {
            let title = post.title
            let content = post.content

            axios.post('http://localhost/backend-api/public/api/post', {
                title: title,
                content: content
            }).then(() => {
                // redirect to post index
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
            store
        }
    }
};
</script>