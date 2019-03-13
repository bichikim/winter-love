Basic using

```vue
<template>
<white-space>{{text}}</white-space>
</template>
<script>
export default {
  data(){
    return {
      text: 'foo\n bar\n',
    }
  }
}
</script>

```

Use a content prop
```vue
<template>
<white-space :content="text"></white-space>
</template>
<script>
export default {
  data(){
    return {
      text: 'foo\n bar\n',
    }
  }
}
</script>

```
