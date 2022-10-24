<template>
  <div>
    <a-result
        status="warning"
        title="非投票时间段!"
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
  name: "Time"
}
</script>

<style scoped>

</style>