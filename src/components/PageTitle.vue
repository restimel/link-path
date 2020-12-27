<template>
    <div class="page-title">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: {
        msg: String,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-title {
  margin: 40px 0 0;
}

</style>
