export const actions = {
  async getPosts(){
    try {
      const response = await this.$axios.get('/posts')
      return response?.data || []
    } catch (e) {
      console.log(e)
    }

  }
}
