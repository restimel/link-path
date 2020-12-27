<template>
    <div class="notifications">
        <div v-for="notif of notifications"
            class="notification"
            :class="notif.type"
            :key="notif.id"
            @click="removeNotif(notif.id)"
        >
            {{notif.msg}}
        </div>
    </div>
</template>

<script>
import {
    store,
    removeNotification,
    clearNotifications,
} from '@/Store.js';

export default {
    name: 'Notification',
    data() {
        return {
            store,
            checking: false,
        };
    },
    computed: {
        notifications() {
            return this.store.notifications;
        },
        length() {
            return this.notifications.length;
        },
    },
    methods: {
        removeNotif(id) {
            removeNotification(id);
        },
        check() {
            if (this.checking) {
                return;
            }

            const notifications = this.notifications;
            if (notifications.length) {
                clearNotifications();
                this.checking = true;
                setTimeout(() => {
                    this.checking = false;
                    this.check();
                }, 1000);
            } else {
                this.checking = false;
            }
        },
    },
    watch: {
        length() {
            this.check();
        },
    },
};
</script>

<style scoped>
.notifications {
    position: fixed;
    right: 10px;
    bottom: 60px;
}
.notification {
    border: 4px double white;
    padding: 10px;
    cursor: pointer;
    margin: 2px;
}
.success {
    background-color: rgba(170, 255, 100, 0.9);
}
.error {
    background-color: rgba(255, 120, 100, 0.9);
}
.info {
    background-color: rgba(100, 170, 255, 0.9);
}
</style>
