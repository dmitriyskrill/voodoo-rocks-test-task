export const actions = {
  async getUsers(){
    try {
      const response = await this.$axios.get('/users')
      return response?.data || []
    } catch (e) {
      console.log(e)
    }
  }
}
