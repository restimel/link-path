<template>
    <div class="page">
        <PageTitle msg="About"/>
        <Form :values="values" />
    </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import Form from '@/components/Form.vue';
import appConfig from '@/appConfig.json';

export default {
    name: 'About',
    data() {
        return {
            values: [{
                label: 'Program name',
                value: appConfig.name,
                type: 'rawText',
            }, {
                label: 'Version',
                value: appConfig.version,
                type: 'rawText',
            }, {
                label: 'Author',
                value: appConfig.author,
                type: 'rawText',
            }, {
                label: 'License',
                value: appConfig.license,
                type: 'rawText',
            }, {
                type: 'empty',
            }, {
                label: 'Description',
                value: appConfig.description,
                type: 'rawText',
            }],
        };
    },
    components: {
        PageTitle,
        Form,
    },
};
</script>