#### 使用方式

```
this.$api.postLogin({account: '', password: ''})
    .then(response => {
    console.log(response)
})
    .catch(error => {
    console.log(error.response)
})
```
