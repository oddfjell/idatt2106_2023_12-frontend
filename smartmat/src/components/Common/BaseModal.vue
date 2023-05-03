<script>
export default {
    props: {
        show: Boolean
    }
}
</script>

<template>
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header">default header</slot>
                </div>

                <div class="modal-body">
                    <slot name="body">default body</slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        <button
                                class="modal-default-button"
                                @click="$emit('close')"
                        >OK</button>
                    </slot>
                </div>
            </div>
        </div>
</template>

<style>
@import "../../assets/style/basemodal.css";

</style>