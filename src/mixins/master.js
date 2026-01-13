/**
 * @desc Mixin master digunakan untuk assist variable/function
 * yg sifatnya reusable atau digunakan oleh banyak components
 * yg tidak perlu dimasukin ke store.
 * @param string -
 * @return mixin
 */

import URL from '@/config.js'
import helper from '@/helper.js'
import moment from 'moment'
import axios from 'axios'

import Vue from 'vue'

import successSound from '@/assets/sound/success.mp3'
import failedSound from '@/assets/sound/failed.mp3'
import warnSound from '@/assets/sound/warn.mp3'
import defaultSound from '@/assets/sound/default.mp3'

import joniNgintip from '@/assets/svg/mascot-ngintip.svg'

import DialogMaster from '@/components/dialog/dialogMaster.vue'

// import { parse } from "vue-currency-input";
const Master = {
    data() {
        return {
            URL: null,
            Helper: null,
            day: null,
            Loading: null,
            alert: null,
            isMobile: false,
            refLoading: null,
            activeInput: null,
        }
    },
    computed: {
        listenActiveUser() {
            return this.$store.getters.getUserInfo.info_user
        },
        listenNode() {
            return this.$store.getters.getUserInfo.info_node
        },
        listenPermissions() {
            return this.$store.getters.getUserInfo.info_permission
        },
        listenNodeId() {
            return this.listenActiveUser?.currently_used_node
        },
        listenCurrentNode() {
            return this.listenNode.find((item) => item.node_id === this.listenNodeId)
        },
        listenNodeCode() {
            return this.listenCurrentNode?.node_code
        },
        listenNodeIsCDM() {
            return this.listenCurrentNode?.is_cdm
        },
        listenUserRole() {
            return this.listenActiveUser.role
        },
        listenUserRoleName() {
            return this.listenUserRole.find((item) => item.app === 'CORE')?.app_role_name
        },
        listenIsGateway() {
            return (
                (this.listenCurrentNode.branch_code.slice(0, 3).includes('X') &&
                    !this.listenUserRoleName.toLowerCase().includes('airport')) ||
                false
            )
        },
        listenIsDeveloperMode() {
            return this.$ls.get('is_developer_mode') === '1' ? true : false
        },
    },
    methods: {
        startLoading(target = null, text = 'Loading...') {
            const el = target ? target.$el || target : this.$el
            this.refloading = this.$vs.loading({
                target: el,
                type: 'scale',
                text,
                background: '#EAEAEA',
                color: '#3b86ff',
            })
        },
        stopLoading() {
            if (this.refloading) {
                this.refloading.close()
                this.refloading = null
            }
        },

        setActiveInput(refName, formRefName = null, shouldSkipFocus = () => false) {
            this.activeInput = refName
            if (!shouldSkipFocus()) {
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.focusInput(refName, formRefName, shouldSkipFocus)
                    }, 0)
                })
            }
        },

        focusInput(refName, formRefName, shouldSkipFocus) {
            if (shouldSkipFocus()) return

            const inputEl = this.getInputByRef(refName)

            if (!inputEl) {
                requestAnimationFrame(() => this.focusInput(refName, formRefName, shouldSkipFocus))
                return
            }

            inputEl.focus()
        },
        preventUnfocus(e, formRefName = null, shouldSkipFocus = () => false) {
            if (shouldSkipFocus()) return

            const nextEl = e.relatedTarget

            // Ambil semua input refs yang tracked
            const refMap = Object.fromEntries(
                Object.entries(this.$refs)
                    .filter(([key]) => key.startsWith('formInput'))
                    .map(([key, ref]) => [key, this.getInputByRef(key)])
                    .filter(([_, el]) => el)
            )

            // Kalau pindah fokus ke dalam form tertentu, abaikan
            const formEl = formRefName ? this.$refs[formRefName]?.$el : null
            if (formEl && nextEl && formEl.contains(nextEl)) return

            // Kalau pindah ke input lain, update activeInput
            for (const [refName, el] of Object.entries(refMap)) {
                if (nextEl === el) {
                    this.activeInput = refName
                    return
                }
            }
        },

        handleGlobalClick(e) {
            const activeEl = this.getInputByRef(this.activeInput)
            if (!activeEl) return

            const nextEl = e.target

            const isNextInput =
                nextEl.tagName === 'INPUT' ||
                nextEl.closest?.('input, textarea, select, .vs-input, .el-select, .v-select')

            if (!isNextInput) {
                this.$nextTick(() => {
                    requestAnimationFrame(() => {
                        if (document.activeElement !== activeEl) {
                            activeEl.focus({ preventScroll: true })
                        }
                    })
                })
            }
        },

        getInputByRef(refName) {
            const el = this.$refs[refName]?.$el || this.$refs[refName]
            return el?.querySelector ? el.querySelector('input') : el
        },

        handleTabNavigation(event, currentInputRef, inputOrder) {
            if (event.key !== 'Tab') return

            event.preventDefault()
            if (!inputOrder || !inputOrder.length) return

            const currentIndex = inputOrder.indexOf(currentInputRef)
            if (currentIndex === -1) return

            const isShift = event.shiftKey

            const nextIndex = isShift
                ? (currentIndex - 1 + inputOrder.length) % inputOrder.length // Shift + Tab (prev)
                : (currentIndex + 1) % inputOrder.length // Tab (next)

            const nextRef = inputOrder[nextIndex]

            const ref = this.$refs[nextRef]
            const nextInput = ref?.$el?.querySelector('input')

            if (nextInput) nextInput.focus()
        },

        moneyformat(number) {
            let val =
                number != 0
                    ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                          number
                      )
                    : 'Rp 0'
            return val
        },
        moneyParsing(str) {
            // let option = {
            //     distractionFree: false,
            //     valueAsInteger: true,
            //     autoDecimalMode: true
            // }
            // return parse(str, this.options);
            let numb = 0
            if (typeof str == 'string') {
                if (str !== '') {
                    let txt = str.split('.')[0]
                    if (txt < 1) {
                        txt = 0
                    } else {
                        numb = txt.match(/\d/g)
                        numb = numb.join('')
                    }
                }
            }
            return numb
        },
        openLoading(msg) {
            this.Loading = this.$vs.loading({
                type: 'scale',
                text: msg ? msg : 'Please wait...',
                background: '#EAEAEA',
            })
        },
        closeLoading() {
            this.Loading.close()
        },
        openNotification(type = null, code, title, msg) {
            return new Promise((resolve) => {
                this.playNotificationSound(type)

                /* =========================
                 * SUCCESS
                 * ========================= */
                if (type === 'success') {
                    resolve()
                    return
                }

                /* =========================
                 * WARN (vs-notification)
                 * ========================= */
                if (type === 'warn') {
                    const notifications = document.querySelectorAll('.vs-notification')
                    for (const notification of notifications) {
                        const message = notification.querySelector('p')?.textContent
                        if (msg === message) {
                            resolve()
                            return
                        }
                    }

                    const duration = 3000

                    this.$vs.notification({
                        duration,
                        progress: 'auto',
                        color: type,
                        position: 'top-right',
                        title: `
                    <div style="padding-left: 2rem;">
                        ${title}
                    </div>
                `,
                        text: `
                    <div style="padding-left: 2rem;">
                        ${msg}
                    </div>
                `,
                        icon: `
                    <div style="display: flex; flex-direction: column; align-items: center; min-width: 64px; margin-left: 30px;">
                        <i class="bx bx-error" style="font-size: 24px;"></i>
                        <div style="font-size: 12px; margin-top: 4px; color: #fff; font-weight: bold">
                            ${code || ''}
                        </div>
                    </div>
                `,
                    })

                    setTimeout(() => {
                        resolve()
                    }, duration)

                    return
                }

                /* =========================
                 * DANGER (Dialog Custom)
                 * ========================= */
                if (type === 'danger') {
                    const DialogConstructor = Vue.extend(DialogMaster)
                    const instance = new DialogConstructor({
                        propsData: {
                            actived: true,
                            width: 'md',
                            className: 'dialog-danger',
                            hideCloseIcon: false,
                            closeDialog: () => {
                                instance.modalActive = false
                                clearInterval(instance.timer)
                                resolve() // ⬅️ manual close
                            },
                        },
                        data() {
                            return {
                                progress: 100,
                                timer: null,
                            }
                        },
                    })

                    instance.$mount()
                    document.body.appendChild(instance.$el)

                    /* === Inject CSS === */
                    const styleTag = document.createElement('style')
                    styleTag.textContent = `
                .dialog-danger .vs-dialog-content,
                .dialog-danger .vs-dialog__content,
                .dialog-danger .con-form,
                .dialog-danger .footer-dialog,
                .dialog-danger .not-margin {
                    margin: 0 !important;
                    padding: 0 !important;
                }
            `
                    document.head.appendChild(styleTag)

                    const bgColor = '#ff4d4f'
                    const duration = 5000
                    const step = 100 / (duration / 200)

                    /* === HEADER SLOT === */
                    instance.$slots.header = [
                        instance.$createElement('div', {
                            domProps: {
                                innerHTML: `
                            <div style="
                                background:${bgColor};
                                border-radius:20px 20px 0 0;
                                position:relative;
                                height:110px;
                                display:flex;
                                justify-content:center;
                            ">
                                <img 
                                    src="${joniNgintip}" 
                                    alt="mascot" 
                                    style="position:absolute; bottom:-5px; height:90px;" 
                                />
                            </div>
                        `,
                            },
                        }),
                    ]

                    /* === CONTENT SLOT === */
                    instance.$slots.content = [
                        instance.$createElement('div', {
                            domProps: {
                                innerHTML: `
                            <div style="text-align:center; padding:40px 20px 25px;">
                                <h2 style="margin:0; color:#333; font-weight:600;">
                                    ${title || 'Error'}
                                </h2>
                                ${
                                    code
                                        ? `<div style="color:#999; margin-top:4px;">${code}</div>`
                                        : ''
                                }
                                <div style="margin-top:10px; font-size:15px; color:#555;">
                                    ${msg || ''}
                                </div>
                                ${
                                    code
                                        ? `<a href="/help/error-dictionary?s=${code}"
                                             style="display:inline-block; margin-top:14px; color:#409EFF; font-size:14px;">
                                             What does this mean?
                                           </a>`
                                        : ''
                                }
                            </div>
                        `,
                            },
                        }),
                    ]

                    /* === FOOTER SLOT === */
                    instance.$slots.footer = [
                        instance.$createElement('div', {
                            style: `
                        position: relative;
                        width: 98%;
                        height: 8px;
                        border-radius: 0 0 20px 20px;
                        overflow: hidden;
                    `,
                            ref: 'progressWrapper',
                        }),
                    ]

                    instance.$forceUpdate()
                    instance.modalActive = true

                    /* === Progress Bar + Auto Close === */
                    instance.$nextTick(() => {
                        const bar = document.createElement('div')
                        bar.style = `
                    position:absolute;
                    top:0;
                    left:0;
                    height:98%;
                    width:100%;
                    background:${bgColor};
                    transition: width 0.2s linear;
                `
                        instance.$refs.progressWrapper.appendChild(bar)

                        let isPaused = false
                        const dialogEl = instance.$el.querySelector('.vs-dialog')

                        if (dialogEl) {
                            dialogEl.addEventListener('mouseenter', () => (isPaused = true))
                            dialogEl.addEventListener('mouseleave', () => (isPaused = false))
                        }

                        instance.timer = setInterval(() => {
                            if (isPaused) return

                            instance.progress -= step
                            if (instance.progress <= 0) {
                                clearInterval(instance.timer)
                                instance.modalActive = false
                                resolve() // ⬅️ auto close
                            } else {
                                bar.style.width = `${instance.progress}%`
                            }
                        }, 200)
                    })
                }
            })
        },
        openNotificationCenter(type = null, code, title, msg) {
            this.playNotificationSound(type)
            if (type === 'success') {
                return
            }

            // Cek apakah notifikasi dengan pesan yang sama sudah ada
            const existingNotifications = document.querySelectorAll('.custom-notification')
            for (const notification of existingNotifications) {
                const message = notification.querySelector('p').textContent
                if (msg === message) {
                    return
                }
            }

            // Buat elemen notifikasi
            const notification = document.createElement('div')
            notification.classList.add('custom-notification')
            notification.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border: 3px solid red;
                color: red;
                padding: 20px 30px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 500px;
                max-width: 90%;
                z-index: 1000;
                font-size: 18px;
                box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
                text-align: center;
                opacity: 1;
                transition: opacity 0.5s ease-in-out;
                font-family: Arial, sans-serif;
            `

            notification.innerHTML = `
                <div style="display: flex; align-items: center; flex-grow: 1; gap: 20px;">
                    <div style="
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        background: red;
                        color: white;
                        padding: 12px;
                        border-radius: 5px;
                        min-width: 80px;
                        min-height: 80px;
                        text-align: center;
                        font-size: 20px;
                        font-weight: bold;
                    ">
                        <i class="bx bx-error" style="font-size: 32px;"></i>
                        ${code ? `<span>${code}</span>` : ''}
                    </div>
                    <div style="flex-grow: 1; text-align: left;">
                        <strong style="font-size: 20px;">${title}</strong>
                        <p style="margin: 5px 0; font-size: 16px; color: black;">${msg}</p>
                    </div>
                </div>
                <button onclick="this.parentElement.remove()" style="
                    background: none;
                    border: none;
                    color: red;
                    font-size: 24px;
                    font-weight: bold;
                    cursor: pointer;
                "><i class="bx bx-x"></i></button>
            `

            // Tambahkan ke dalam body
            document.body.appendChild(notification)

            // Hapus otomatis setelah 5 detik
            setTimeout(() => {
                if (notification) {
                    notification.style.opacity = '0'
                    setTimeout(() => notification.remove(), 500)
                }
            }, 5000)
        },
        playNotificationSound(type) {
            let soundPath
            switch (type) {
                case 'success':
                case 'success-with-notif':
                    soundPath = successSound
                    break
                case 'danger':
                    soundPath = failedSound
                    break
                case 'warn':
                    soundPath = warnSound
                    break
                default:
                    soundPath = defaultSound
            }

            const sound = new Audio(soundPath)
            sound.play()
        },
        openProgress(type = null, title, msg) {
            // type success, success-with-notif, danger, warn
            this.alert = this.$vs.notification({
                duration: type == 'danger' ? 3000 : 3000,
                progress: 'auto',
                color: type,
                position: 'top-right',
                title: title,
                text: msg,
                icon: `<i class="bx ${
                    type == 'success' || type == 'success-with-notif'
                        ? 'bx-select-multiple'
                        : 'bx-error'
                }" ></i>`,
            })
        },
        closeProgress() {
            this.alert.close()
        },
        resetDateTime(date = new Date()) {
            Date.prototype.resetTime = function () {
                this.setHours('00')
                this.setMinutes('00')
                this.setSeconds('00')
                return this
            }

            return new Date(date).resetTime()
        },
        defaultDateTime(date = new Date()) {
            Date.prototype.defaultTime = function () {
                this.setHours('23')
                this.setMinutes('59')
                this.setSeconds('59')
                return this
            }

            return new Date(date).defaultTime()
        },
        checkAuth(res) {
            // This method is kept for backward compatibility and manual auth checks
            if (res.status === 401) {
                localStorage.clear()
                this.$router.push('/login')
            } else if (res.data && res.data.reason) {
                let reason = res.data.reason.toLowerCase()
                switch (true) {
                    case reason.includes('unauthenticated'):
                        localStorage.clear()
                        this.$router.push('/login')
                        break
                    default:
                    // code block
                }
            } else if (res.data && res.data.type === 'AuthenticationException') {
                localStorage.clear()
                this.$router.push('/login')
            }
        },
        async checkAuthRequest() {
            //
            await axios
                .get(this.URL.check_auth + '?n=' + this.listenNodeId, this.Helper.header())
                .catch((err) => {
                    this.checkAuth(err.response)
                })
        },
        addToObject(obj, key, value, index) {
            // Create a temp object and index variable
            let temp = {}
            let i = 0

            // Loop through the original object
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    // If the indexes match, add the new item
                    if (i === index && key && value) {
                        temp[key] = value
                    }

                    // Add the current item in the loop to the temp obj
                    temp[prop] = obj[prop]

                    // Increase the count
                    i++
                }
            }

            // If no index, add to the end
            if (!index && key && value) {
                temp[key] = value
            }

            return temp
        },
        dayConverter(val) {
            switch (val) {
                case '7':
                    this.day = 'Minggu'
                    break
                case '6':
                    this.day = 'Sabtu'
                    break
                case '5':
                    this.day = "Jum'at"
                    break
                case '4':
                    this.day = 'Kamis'
                    break
                case '3':
                    this.day = 'Rabu'
                    break
                case '2':
                    this.day = 'Selasa'
                    break
                case '1':
                    this.day = 'Senin'
                    break
                default:
                // code block
            }
            return this.day
        },
        dateConvert(val) {
            if (val != null) {
                return moment(val).format('DD-MMM-YYYY kk:mm')
            }
        },
        handlePrintShortcut(printFunction) {
            document.addEventListener('keydown', function (e) {
                if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
                    e.preventDefault()
                    e.stopImmediatePropagation()
                    e.stopPropagation()
                    printFunction()
                }
            })
        },
        redirectShortcut() {
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
                    if (e.key.toLowerCase() !== 'i' && e.key.toLowerCase() !== 'c') {
                        e.preventDefault()
                    }
                    switch (e.key.toLowerCase()) {
                        case 'h':
                            this.$router.push('/help/error-dictionary')
                            break
                        case 'x':
                            this.$router.push('/transaction/new-transactions')
                            break
                        case '?':
                            this.$router.push('/trace-bag')
                            break
                        case 'v':
                            this.$router.push('/incoming/pre-alert')
                            break
                        case 'b':
                            this.$router.push('/inventory/bagging')
                            break
                        case 'o':
                            this.$router.push('/sorting/unbagging')
                            break
                        default:
                    }
                }
                if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
                    if (!e.shiftKey) {
                        this.$router.push('/inventory/item')
                    }
                }
                if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                    if (!e.shiftKey) {
                        this.$router.push('/trace-connote')
                    }
                }
            })
        },
        handleSubmitShortcut(submitFunction) {
            document.addEventListener('keydown', function (e) {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault()
                    submitFunction()
                }
            })
        },

        setRoutePageHistory(meta, isFinish) {
            const routeHistory = this.$ls.get('route_history') || []

            if (!isFinish) {
                let temp = {
                    event_id: this.generateRandomUUID(),
                    timestamp: new Date().toISOString(),
                    resource_code: meta?.resource_code || '',
                    resource_type: meta?.resource_type || '',
                    resource_name: meta?.resource_name || '',
                }
                routeHistory.push(temp)
            }

            this.$ls.set('route_history', routeHistory)

            if ((routeHistory.length === 10 || isFinish) && routeHistory.length !== 0) {
                return this.handleAuditLog(routeHistory)
            }

            return Promise.resolve()
        },
        generateRandomUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const randomHex = (Math.random() * 16) | 0
                const value = c === 'x' ? randomHex : (randomHex & 0x3) | 0x8
                return value.toString(16)
            })
        },
        async handleAuditLog(route_history) {
            let form = {
                track_logs: route_history,
            }
            try {
                const res = await axios.post(
                    `${this.URL.tracking_audit}?n=${this.listenNodeId}`,
                    form,
                    this.Helper.header()
                )

                // this.openNotification('success', null, "Success", res?.data?.message ?? "success");
                localStorage.removeItem('vuejs__route_history')
            } catch (err) {
                // this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
            }
        },
        convertMinutesToTimeFormat(totalMinutes) {
            if (totalMinutes == null || isNaN(totalMinutes)) return '-'
            // pembulatan ke atas
            totalMinutes = Math.ceil(Math.abs(Number(totalMinutes)))

            const days = Math.floor(totalMinutes / 1440)
            const hours = Math.floor((totalMinutes % 1440) / 60)
            const minutes = totalMinutes % 60

            return `${days} DAYS, ${hours} HOURS, ${minutes} MINUTES`
        },
        getSLAType(totalMinutes) {
            if (totalMinutes < 0) {
                return `OVER SLA`
            } else if (totalMinutes < 30) {
                return 'WARNING SLA'
            } else {
                return 'ON SLA'
            }
        },
        formatDateTime(dateTimeStr) {
            const date = new Date(dateTimeStr)

            const day = date.getDate()
            const month = date.toLocaleString('default', { month: 'long' }).toUpperCase()
            const year = date.getFullYear()
            const formattedDate = `${day} ${month} ${year}`

            const hours = String(date.getHours()).padStart(2, '0')
            const minutes = String(date.getMinutes()).padStart(2, '0')
            const formattedTime = `${hours}:${minutes}`

            return `${formattedDate}\n${formattedTime}`
        },
        formatTimestamp(timestamp) {
            const date = new Date(timestamp)

            const formattedDate = date.toISOString().slice(0, 10)
            const formattedTime = date.toTimeString().slice(0, 8)

            return `${formattedDate} ${formattedTime}`
        },
        checkIfMobile() {
            this.isMobile = window.matchMedia('(max-width: 768px)').matches
        },

        redirectError(err) {
            if (err?.response?.status === 403) {
                this.$router.push('/forbidden')
            } else if (err?.response?.status === 500) {
                this.$router.push('/server-error')
            }
        },
        formatLabel(key) {
            return key
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (match) => match.toUpperCase())
                .toLowerCase()
                .replace(/\b\w/g, (match) => match.toUpperCase())
        },
        getOrionDocumentType(orion_number) {
            if (!orion_number || typeof orion_number !== 'string') return null

            const parts = orion_number.split('/')
            return parts[1] ?? null
        },
        formatElapsedTime(rawMinutes) {
            const totalMinutes = Math.round(rawMinutes)

            const days = Math.floor(totalMinutes / 1440)
            const hours = Math.floor((totalMinutes % 1440) / 60)
            const minutes = totalMinutes % 60

            return `${days} day(s) ${hours} hour(s) ${minutes} minute(s)`
        },
        formatElapsedDay(days) {
            return `${days} day(s)`
        },

        formatSlaTime(slaDate, endDate) {
            if (!slaDate) return '-'

            const slaTime = new Date(slaDate.replace(' ', 'T'))
            const actualTime = endDate ? new Date(endDate.replace(' ', 'T')) : new Date()

            if (isNaN(slaTime.getTime()) || isNaN(actualTime.getTime())) return '-'

            const diffMs = actualTime - slaTime
            const isOverdue = diffMs > 0
            const absDiff = Math.abs(diffMs)

            const days = Math.floor(absDiff / (1000 * 60 * 60 * 24))
            const hours = Math.floor((absDiff / (1000 * 60 * 60)) % 24)
            const minutes = Math.floor((absDiff / (1000 * 60)) % 60)
            const seconds = Math.floor((absDiff / 1000) % 60)

            const timeString = `${days} day(s) ${hours} hour(s) ${minutes} minute(s) ${seconds} second(s)`

            if (endDate) {
                const completedText = `Completed at ${this.formatTimezone(
                    actualTime.toLocaleString()
                )}`
                return isOverdue ? `${completedText}\n Overdue: ${timeString}` : completedText
            }

            return isOverdue ? `Overdue: ${timeString}` : `Remaining: ${timeString}`
        },
        sanitizeAlphanumeric(fieldName) {
            this[fieldName] = this[fieldName].replace(/[^a-zA-Z0-9_\/-]/g, '')
        },
        formatDateTimeId(datetime) {
            if (!datetime) return ''
            const d = new Date(datetime)

            const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' }
            const timeOptions = { hour: '2-digit', minute: '2-digit' }

            const dateStr = d.toLocaleDateString('id-ID', dateOptions).replace(',', '')
            const timeStr = d.toLocaleTimeString('id-ID', timeOptions).replace('.', ':')

            return `${dateStr} ${timeStr}`
        },
        getTLC(text) {
            if (!text) return null

            // 1. Prefer code inside parentheses like (MKQ000)
            let parenMatch = text.match(/\(\s*([A-Z]{3})(?=\d*\))/)
            if (parenMatch) return parenMatch[1]

            // 2. Otherwise, check if starts with XXX- pattern
            let startMatch = text.match(/^([A-Z]{3})(?=-)/)
            if (startMatch) return startMatch[1]

            // 3. Otherwise, fallback to any standalone XXX
            let anyMatch = text.match(/\b([A-Z]{3})\b/)
            if (anyMatch) return anyMatch[1]

            return null
        },
        hasPermission(permission) {
            const permissions = this.listenPermissions?.core || []
            return permissions.includes(permission)
        },
        formatTimezone(date) {
            if (!date || typeof date !== 'string' || date.trim() === '') {
                return ''
            }

            const d = new Date(date)
            if (isNaN(d.getTime())) {
                console.warn('Invalid date:', date)
                return '-'
            }

            const timeZone = this.$ls.get('timezone')

            const options = {
                timeZone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            }

            const parts = new Intl.DateTimeFormat('en-CA', options).formatToParts(d)
            const get = (type) => parts.find((p) => p.type === type)?.value

            return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get(
                'minute'
            )}:${get('second')}`
        },
        formatToWIB(date) {
            const fromTimezone = this.$ls.get('timezone')
            if (!date) return ''

            let utcDate

            if (date.includes('T') && date.endsWith('Z')) {
                // format ISO → langsung parse sebagai UTC
                utcDate = new Date(date)
            } else {
                // format manual "YYYY-MM-DD", "YYYY-MM-DD HH:mm", atau "YYYY-MM-DD HH:mm:ss"
                const [datePart, timePart] = date.split(' ')
                const [year, month, day] = datePart.split('-').map(Number)

                let hour = 0,
                    minute = 0,
                    second = 0
                if (timePart) {
                    const timeParts = timePart.split(':').map(Number)
                    hour = timeParts[0] ?? 0
                    minute = timeParts[1] ?? 0
                    second = timeParts[2] ?? 0
                }

                const baseDate = new Date(year, month - 1, day, hour, minute, second)

                // hitung UTC timestamp sesuai timezone asal
                const utcTimestamp =
                    baseDate.getTime() -
                    (new Date(
                        baseDate.toLocaleString('en-US', { timeZone: fromTimezone })
                    ).getTime() -
                        baseDate.getTime())
                utcDate = new Date(utcTimestamp)
            }

            // format ke Jakarta
            const parts = new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Asia/Jakarta',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            }).formatToParts(utcDate)

            const obj = {}
            for (const p of parts) {
                if (p.type !== 'literal') obj[p.type] = p.value
            }

            return `${obj.year}-${obj.month}-${obj.day} ${obj.hour}:${obj.minute}:${obj.second}`
        },
        formatToWIBIso(date) {
            const fromTimezone = this.$ls.get('timezone')
            if (!date) return ''

            let utcDate

            if (date.includes('T') && date.endsWith('Z')) {
                // format ISO → langsung parse sebagai UTC
                utcDate = new Date(date)
            } else {
                // format manual "YYYY-MM-DD", "YYYY-MM-DD HH:mm", atau "YYYY-MM-DD HH:mm:ss"
                const [datePart, timePart] = date.split(' ')
                const [year, month, day] = datePart.split('-').map(Number)

                let hour = 0,
                    minute = 0,
                    second = 0
                if (timePart) {
                    const timeParts = timePart.split(':').map(Number)
                    hour = timeParts[0] ?? 0
                    minute = timeParts[1] ?? 0
                    second = timeParts[2] ?? 0
                }

                const baseDate = new Date(year, month - 1, day, hour, minute, second)

                // hitung UTC timestamp sesuai timezone asal
                const utcTimestamp =
                    baseDate.getTime() -
                    (new Date(
                        baseDate.toLocaleString('en-US', { timeZone: fromTimezone })
                    ).getTime() -
                        baseDate.getTime())
                utcDate = new Date(utcTimestamp)
            }

            // Format ke Asia/Jakarta, lalu buat ISO string tanpa offset
            const parts = new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Asia/Jakarta',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            }).formatToParts(utcDate)

            const obj = {}
            for (const p of parts) {
                if (p.type !== 'literal') obj[p.type] = p.value
            }

            // Bentuk ISO 8601: YYYY-MM-DDTHH:mm:ssZ
            return `${obj.year}-${obj.month}-${obj.day}T${obj.hour}:${obj.minute}:${obj.second}Z`
        },
        formatTimezoneSLADate(date) {
            if (!date || typeof date !== 'string' || date.trim() === '') {
                return '-'
            }

            const d = new Date(date)
            if (isNaN(d.getTime())) {
                console.warn('Invalid date:', date)
                return '-'
            }

            const timeZone = this.$ls.get('timezone')

            const options = {
                timeZone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }

            const parts = new Intl.DateTimeFormat('en-CA', options).formatToParts(d)
            const get = (type) => parts.find((p) => p.type === type)?.value

            return `${get('day')} ${get('month')} ${get('year')} ${get('hour')}:${get('minute')}`
        },
    },
    mounted() {
        this.checkIfMobile()
        window.addEventListener('resize', this.checkIfMobile)
        document.addEventListener('mousedown', this.handleGlobalClick)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkIfMobile)
        document.removeEventListener('mousedown', this.handleGlobalClick)
    },
    created() {
        this.URL = URL
        this.Helper = helper
    },
}
export default Master
