<template>
  <b-col
    class="px-2 mb-3"
  >
    <b-card
      v-if="post"
      :title="post.title"
      class="post-card"
    >
      <b-card-text> {{ post.body }}</b-card-text>

      <small class="text-muted"> {{ authorName }} </small>
    </b-card>
  </b-col>

</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: Object
  },
  computed: {
    authorName () {
      if (!this.post?.user) return 'Автор не определен'
      return this.post.user.name
    }
  }
}
</script>

<style scoped>

</style>
