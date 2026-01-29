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
        </template>

        <div class="dialog-body">
            <vs-row>
                <vs-col>
                    <vs-input
                        v-model="form.password"
                        :type="hasVisiblePassword ? 'text' : 'password'"
                        label-placeholder="New Password"
                        icon-after
                        @click-icon="hasVisiblePassword = !hasVisiblePassword"
                    >
                        <template #icon>
                            <i :class="hasVisiblePassword ? 'bx bx-show-alt' : 'bx bx-hide'" />
                        </template>

                        <template #message-danger>
                            <div class="text-left">
                                <span v-if="errors.password.length">{{ errors.password[0] }}</span>
                            </div>
                        </template>
                    </vs-input>

                    <div class="progress-container" v-if="form.password">
                        <div
                            class="progress-bar"
                            :style="{
                                width: progressValue + '%',
                                backgroundColor: progressColor,
                            }"
                        ></div>
                    </div>

                    <ul class="requirements" v-if="form.password && !allRequirementsMet">
                        <li
                            v-for="(req, i) in passwordRequirements"
                            :key="i"
                            :class="{ valid: req.valid }"
                        >
                            <i :class="req.valid ? 'bx bx-check-circle' : 'bx bx-x-circle'"></i>
                            {{ req.text }}
                        </li>
                    </ul>
                </vs-col>
            </vs-row>

            <vs-row>
                <vs-col>
                    <vs-input
                        v-model="form.passwordConfirm"
                        :type="hasVisiblePasswordConfirm ? 'text' : 'password'"
                        label-placeholder="Confirm Password"
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
                                <span v-if="errors.passwordConfirm.length">
                                    {{ errors.passwordConfirm[0] }}
                                </span>
                            </div>
                        </template>
                    </vs-input>
                </vs-col>
            </vs-row>

            <p
                v-if="profileData && profileData.last_password_updated_at !== null"
                class="message-text-password"
            >
                <b>Note:</b> Your password has expired. Please update it.
            </p>
        </div>

        <template #footer>
            <div class="footer-dialog">
                <vs-button block @click="updatePassword">Update</vs-button>
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
    watch: {
        'form.password'(newVal) {
            // Clear password errors when user types
            if (this.errors.password.length) this.errors.password = []

            // If user already filled confirm field, re-check match
            if (this.form.passwordConfirm && this.form.passwordConfirm !== newVal) {
                this.errors.passwordConfirm = ['Passwords do not match.']
            } else {
                this.errors.passwordConfirm = []
            }
        },
        'form.passwordConfirm'(newVal) {
            // Clear confirm errors when user types
            if (this.errors.passwordConfirm.length) this.errors.passwordConfirm = []

            // Live check for mismatch
            if (this.form.password && this.form.password !== newVal) {
                this.errors.passwordConfirm = ['Passwords do not match.']
            }
        },
    },

    computed: {
        allRequirementsMet() {
            return this.passwordRequirements.every((req) => req.valid)
        },
        passwordRequirements() {
            const pwd = this.form.password || ''
            return [
                { text: 'At least 8 characters', valid: pwd.length >= 8 },
                { text: 'At least one uppercase letter (A-Z)', valid: /[A-Z]/.test(pwd) },
                { text: 'At least one lowercase letter (a-z)', valid: /[a-z]/.test(pwd) },
                { text: 'At least one number (0-9)', valid: /\d/.test(pwd) },
                {
                    text: 'At least one special character (!@#$%^&*)',
                    valid: /[^A-Za-z0-9]/.test(pwd),
                },
            ]
        },
        progressValue() {
            const validCount = this.passwordRequirements.filter((r) => r.valid).length
            return validCount === 5 ? 100 : validCount * 20
        },
        progressColor() {
            if (this.progressValue < 40) return '#ff4d4f'
            if (this.progressValue < 80) return '#faad14'
            return '#52c41a'
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
            this.errors.password = []
            this.errors.passwordConfirm = []

            if (!this.form.password) this.errors.password.push('Password is required.')
            if (!this.form.passwordConfirm)
                this.errors.passwordConfirm.push('Password confirmation is required.')

            if (this.errors.password.length || this.errors.passwordConfirm.length) return

            // Requirement check
            if (!this.allRequirementsMet) {
                this.errors.password.push('Password does not meet the minimum requirements.')
                return
            }

            if (this.form.password !== this.form.passwordConfirm) {
                this.errors.passwordConfirm.push('Passwords do not match.')
                return
            }

            try {
                this.showLoading('Updating password...')
                const payload = {
                    user_name: this.profileData.user_name,
                    user_login: this.profileData.user_login,
                    user_email: this.profileData.user_email,
                    password: this.form.password,
                    password_confirmation: this.form.passwordConfirm,
                }

                const res = await axios.put(
                    this.URL.profile + `?n=${this.listenNodeId}`,
                    payload,
                    this.Helper.header()
                )

                this.openNotification('success', null, 'Success!', 'Password Updated!')
                this.$ls.set('is_first_login', false)
                const user = this.listenActiveUser
                user.last_password_updated_at = res.data.data.last_password_updated_at
                this.visible = false
            } catch (e) {
                const msg =
                    e.response?.status === 422 ? e.response.data.message : 'Update password failed!'
                this.openNotification('danger', e.response?.data.code || '', 'Failed!', msg)
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
        showLoading(text = 'Loading...') {
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
    border-radius: 12px;
}

.dialog-body {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 0.5rem 0;
}

.progress-container {
    height: 6px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 8px;
}

.progress-bar {
    height: 100%;
    transition: width 0.3s ease, background-color 0.3s ease;
}

.requirements {
    list-style: none;
    padding: 0.3rem 0 0;
    margin: 0;
    font-size: 0.85rem;
}

.requirements li {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #777;
    transition: color 0.3s;
}

.requirements li.valid {
    color: #52c41a;
}

.message-text-password {
    font-size: 0.85rem;
    text-align: justify;
    color: #777;
    margin-left: 4px;
}

.footer-dialog {
    margin-top: 1rem;
}
</style>
