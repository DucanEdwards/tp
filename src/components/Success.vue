<template>
  <div>
      <a-result
          status="success"
          title="投票成功!"
      >
        <template #extra>
          <a-button key="console" type="primary">
            <router-link to="/">回到首页</router-link>
          </a-button>
        </template>
      </a-result>
  </div>
</template>

<script>
export default {
  name: "Success"
}
</script>

<style scoped>

</style>