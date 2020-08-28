<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}

if (process.env.NODE_ENV === 'development') {
  const ctx =
    '{"UserId":33,"WxUserId":20,"TenantId":4,"SchoolName":"常青云国际双语幼儿园北苑校园","MemberType":1,"TenantMember":{"Mobile":"15811585973","StaffId":1,"DisplayName":"魏辰宇","Email":"chenyu.wei@cloudschools.cn","JobTitle":null,"LoginName":"15811585973","Gender":2,"Status":9,"CardNo":"","OrgId":0,"PhotoFileId":85633,"IsDeleted":false,"PhotoImageUrl":"http://api.apps.cloudschools.cn/api/pubfile/4/avatar/85633","TenantId":4,"Id":781,"Created":"2018-06-15T13:05:23+08:00","Modified":"2020-07-15T14:58:51+08:00"},"Parent":null,"Student":null,"ClientId":"demo-teacher","Menu":"[]","Perm":"{}","Language":"zh"}'

  const token =
    'mFH8I_lrYnqB9xPbW6saZbP9O9QIQjaa5bKrOcQfAxB8eV3Xj0ocvjapzQGvGeePumNMHJ2UxG8so6fZFVlvVM6bNz1QbA9eIAfujlOftB3-Ebq7abOhMQB_L5ol_EPNCZHxKMWU7rJ2Z7inCcHovidqKV2F5YGtdXyebHS2Ertnmjh7qXSGb0Ujlzkq5f6C'

  sessionStorage.setItem('token', token)
  sessionStorage.setItem('ctx', ctx)

  if (window.location.href.indexOf('?') < 0) {
    window.location.href = '/index.html?timestamp=' + new Date().getTime()
  }
}
</script>
<style lang="scss"></style>
