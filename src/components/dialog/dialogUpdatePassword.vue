<template>
    <vs-dialog v-model="visible" class="my-dialog" not-close prevent-close>
        <template #header>
            <h4 class="dialog-title">
                {{
                    profileData && profileData.last_password_updated_at
                        ? 'Please Update Your Password'
                        : 'Please Change Your Password'
                }}
            </h4>
            ``
        </template>

        <div>
            <vs-row>
                <vs-col w="6">
                    <vs-input
                        v-model="form.password"
                        type="password"
                        label-placeholder="New Password"
                        :progress="getProgress"
                        :visiblePassword="hasVisiblePassword"
                        icon-after
                        @click-icon="hasVisiblePassword = !hasVisiblePassword"
                    >
                        <template #icon>
                            <i :class="hasVisiblePassword ? 'bx bx-show-alt' : 'bx bx-hide'" />
                        </template>

                        <template #message-danger>
                            <div class="text-left">
                                <span v-if="errors.password.length > 0" style="padding-top: 10px">
                                    {{ errors.password[0] }}
                                </span>
                            </div>
                        </template>
                    </vs-input>
                </vs-col>
                <vs-col w="6">
                    <vs-input
                        v-model="form.passwordConfirm"
                        type="password"
                        label-placeholder="Confirm Password"
                        :visiblePassword="hasVisiblePasswordConfirm"
                        icon-after
                        @click-icon="hasVisiblePasswordConfirm = !hasVisiblePasswordConfirm"
                    >
                        <template #icon>
                            <i
                                :class="hasVisiblePasswordConfirm ? 'bx bx-show-alt' : 'bx bx-hide'"
                            />
                        </template>

                        <template #message-danger>
                            <div class="text-left">
                                <span
                                    v-if="errors.passwordConfirm.length > 0"
                                    style="padding-top: 10px"
                                >
                                    {{ errors.passwordConfirm[0] }}
                                </span>
                            </div>
                        </template>
                    </vs-input>
                </vs-col>
            </vs-row>
        </div>

        <p
            v-if="profileData && profileData.last_password_updated_at !== null"
            class="message-text-password"
        >
            <b>Note</b> : Expired Password, Please Change Your Password
        </p>

        <template #footer>
            <div class="footer-dialog">
                <vs-button block @click="updatePassword"> Update </vs-button>
            </div>
        </template>
    </vs-dialog>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'

export default {
    mixins: [master],
    data() {
        return {
            visible: false,
            vsLoading: null,
            hasVisiblePassword: false,
            hasVisiblePasswordConfirm: false,
            form: {
                password: '',
                passwordConfirm: '',
            },
            profileData: null,
            errors: {
                password: [],
                passwordConfirm: [],
            },
        }
    },
    computed: {
        getProgress() {
            let progress = 0
            const errors = []

            const password = this.form.password || ''

            if (password.length === 0) {
                this.errors.password = []
                return 0
            }

            // at least one number
            if (/\d/.test(password)) {
                progress += 10
            } else {
                errors.push('Password must contain a number')
            }

            // at least one uppercase letter
            if (/[A-Z]/.test(password)) {
                progress += 10
            } else {
                errors.push('Password must contain an uppercase letter')
            }

            // at least one lowercase letter
            if (/[a-z]/.test(password)) {
                progress += 10
            } else {
                errors.push('Password must contain a lowercase letter')
            }

            // at least 6 characters
            if (password.length >= 6) {
                progress += 10
            } else {
                errors.push('Password must be longer than 5 characters')
            }

            // at least one special character
            if (/[^A-Za-z0-9]/.test(password)) {
                progress += 10
            } else {
                errors.push('Password must contain a special character')
            }

            if (errors.length === 0) {
                progress = 100
            }

            // update errors
            this.errors.password = errors

            return progress
        },
    },
    mounted() {
        const isFirstLogin = JSON.parse(this.$ls.get('is_first_login'))
        if (isFirstLogin) {
            this.fetchProfileData().then(() => {
                this.visible = true
            })
        }
    },
    methods: {
        async updatePassword() {
            try {
                let formValid = false
                this.errors.password = []
                this.errors.passwordConfirm = []

                if (this.form.password.length === 0 && this.form.passwordConfirm.length === 0) {
                    this.errors.password = ['The password field is required.']
                    this.errors.passwordConfirm = ['The password confirm field is required.']
                } else if (this.form.password.length === 0) {
                    this.errors.password = ['The password field is required.']
                } else if (this.form.passwordConfirm.length === 0) {
                    this.errors.passwordConfirm = ['The password confirm field is required.']
                } else if (this.form.password !== this.form.passwordConfirm) {
                    this.errors.passwordConfirm = ['Passwords did not match']
                } else {
                    this.errors.password = []
                    this.errors.passwordConfirm = []
                    formValid = true
                }

                if (!formValid) {
                    return
                }

                const payload = {
                    user_name: this.profileData.user_name,
                    user_login: this.profileData.user_login,
                    user_email: this.profileData.user_email,
                    password: this.form.password,
                    password_confirmation: this.form.passwordConfirm,
                }

                this.showLoading('Updating password....')

                const res = await axios.put(
                    this.URL.profile + `?n=${this.listenNodeId}`,
                    payload,
                    this.Helper.header()
                )

                this.openNotification('success', null, 'Success!', 'Password Updated!')

                this.$ls.set('is_first_login', false)
                const user = this.listenActiveUser
                user.last_password_updated_at = res.data.data.last_password_updated_at
                this.$store.dispatch(`SET_USER_DATA`, user)

                this.visible = false
            } catch (e) {
                let msg = 'Update password failed!'
                if (e.response.status === 422) {
                    msg = e.response.data.message
                }

                this.openNotification(
                    'danger',
                    e.response ? e.response.data.code : '',
                    'Failed!',
                    msg
                )
            } finally {
                this.hideLoading()
            }
        },

        async fetchProfileData() {
            this.showLoading()
            try {
                this.profileData = this.listenActiveUser
            } catch (err) {
                this.openNotification('danger', 'Failed!', 'Failed to populate data!')

                this.checkAuth(err.response)
            }
            this.hideLoading()
        },

        showLoading(text = 'Loading....') {
            if (this.vsLoading === null) {
                this.vsLoading = this.$vs.loading({
                    text,
                    type: 'scale',
                    background: '#EAEAEA',
                })
            }
        },

        hideLoading() {
            if (this.vsLoading !== null) {
                this.vsLoading.close()
                this.vsLoading = null
            }
        },
    },
}
</script>

<style scoped>
.my-dialog >>> .vs-dialog {
    min-width: 440px !important;
}

.message-text-password {
    font-size: 10px;
    text-align: justify;
    margin-left: 12.5px;
}
</style>
