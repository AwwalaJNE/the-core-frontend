<template>
    <vs-dialog v-model="active" @close="handleClose">
        <template>
          <h4 class="not-margin">
            <slot name='header'></slot>
          </h4>
        </template>


        <div class="con-form">
          <slot name='content'></slot>
        </div>

        <template>
          <div class="footer-dialog">
            <slot name='footer'></slot>
          </div>
        </template>
    </vs-dialog>
</template>
<script>
export default {
    name:"dialog-master",
    props: {
        active: Boolean,
        closeDialog: Function
    },
    data() {
        return {
        }
    },
    methods: {
        handleClose(){
            this.closeDialog()
        }
    },
}
</script>
<style lang="scss">
    .not-margin {
	margin: 0px;
	font-weight: normal;
	padding: 10px;
}
.con-form {
	width: 100%;
	.flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
		a {
			font-size: 0.8rem;
			opacity: 0.7;
			&:hover {
				opacity: 1;
			}
		}
	}
	.vs-checkbox-label {
		font-size: 0.8rem;
	}
	.vs-input-content {
		margin: 10px 0px;
		width: calc(100%);
		.vs-input {
			width: 100%;
		}
	}
}
.footer-dialog {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: calc(100%);
	.new {
		margin: 0px;
		margin-top: 20px;
		padding: 0px;
		font-size: 0.7rem;
		a {
			color: getColor('primary') !important;
			margin-left: 6px;
			&:hover {
				text-decoration: underline;
			}
		}
	}
	.vs-button {
		margin: 0px;
	}
}
</style>