<template>
  <b-col class="postPage">
    <b-row
      class="my-4"
      align-h="center"
      cols="1"
      cols-sm="1"
      cols-md="2"
      cols-lg="3"
    >
      <b-input-group class="col px-2" prepend="🔍">
        <b-form-input
          v-model="userTextFilter"
          placeholder="Filter by author..."
        />
      </b-input-group>
    </b-row>
    <b-row
      cols="1"
      cols-sm="1"
      cols-md="2"
      cols-lg="3"
    >
      <post-card
        v-for="post in filteredPosts"
        :key="post.id"
        :post="post"
      />
    </b-row>

  </b-col>
</template>

<script>
import { mapActions } from 'vuex'
import PostCard from '~/components/pages/PostCard'

export default {
  name: 'PostsPage',
  components: { PostCard },
  data: () => ({
    userTextFilter: '',
    users: [],
    posts: []
  }),
  computed: {
    filteredPosts () {
      if (!this.userTextFilter) return this.posts
      let searchText = this.userTextFilter.toLowerCase()
      return this.posts.filter(post => {
        const { name } = post?.user
        if (typeof name !== 'string') return false
        return (name.toLowerCase().indexOf(searchText) > -1)
      })
    }
  },
  methods: {
    ...mapActions('service/posts', ['getPosts']),
    ...mapActions('service/users', ['getUsers']),
    async setUsers () {
      this.users = await this.getUsers()
    },
    async setPosts () {
      this.posts = (await this.getPosts()).map(post => ({
        ...post,
        user: this.users.find(user => user.id === post.userId)
      }))
    }
  },
  async created () {
    await this.setUsers()
    await this.setPosts()
  }
}
</script>

<style scoped lang="scss">

</style>
