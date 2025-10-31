<template>
    <div class="progress-stepper-wrapper">
        <div class="progress-stepper-container">
            <div class="steps">
                <div
                    v-for="(step, index) in stepsWithDummy"
                    :key="index"
                    :class="index !== steps.length ? 'step-wrapper' : ''"
                >
                    <div
                        class="circle"
                        :class="{
                            active: isCircleActive(index),
                            dummy: index === steps.length,
                            'delayed-active': isCircleDelayedActive(index),
                        }"
                    >
                        {{ index === steps.length ? '' : step.label || index + 1 }}
                    </div>

                    <div
                        v-if="index < stepsWithDummy.length - 1"
                        class="line"
                        :class="{
                            'active-full': isLineActive(index),
                            'active-half-right': isLineHalfRightActive(index),
                            'active-half-left': isLineHalfLeftActive(index),
                        }"
                    ></div>
                </div>
            </div>
        </div>

        <div class="line-separator"></div>

        <div class="stepper-content" v-if="currentStepIndex < steps.length">
            <slot :name="`step-${currentStepIndex}`"></slot>
        </div>

        <vs-row justify="flex-end" align="center">
            <vs-col w="3" v-if="currentStepIndex === 0">
                <vs-button
                    transparent
                    block
                    danger
                    flat
                    :active="true"
                    :data-testid="`cancel-button`"
                    @click="cancel"
                >
                    Cancel
                </vs-button>
            </vs-col>

            <vs-col w="3" v-if="currentStepIndex > 0 && currentStepIndex < steps.length">
                <vs-button
                    transparent
                    block
                    flat
                    type="submit"
                    :data-testid="`previous-button`"
                    @click="prevStep"
                >
                    Previous Step
                </vs-button>
            </vs-col>

            <vs-col w="3" v-if="currentStepIndex < steps.length - 1">
                <vs-button
                    transparent
                    block
                    flat
                    :active="true"
                    type="submit"
                    :data-testid="`next-button`"
                    @click="nextStep"
                >
                    Next Step
                </vs-button>
            </vs-col>

            <vs-col w="3" v-if="currentStepIndex === steps.length - 1">
                <vs-button
                    transparent
                    block
                    flat
                    :active="true"
                    type="submit"
                    :data-testid="`submit-button`"
                    @click="handleSubmit"
                >
                    Proceed
                </vs-button>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
export default {
    name: 'ProgressStepper',
    props: {
        steps: { type: Array, required: true },
        stepValidators: { type: Array, default: () => [] },
    },
    data() {
        return {
            currentStepIndex: 0,
            delayedActiveIndex: 0,
        }
    },
    computed: {
        stepsWithDummy() {
            return [...this.steps, { label: null, dummy: true }]
        },
    },
    methods: {
        nextStep() {
            const validator = this.stepValidators[this.currentStepIndex]
            if (validator && !validator()) {
                this.$emit('invalid-step', this.currentStepIndex)
                return
            }

            if (this.currentStepIndex < this.steps.length - 1) {
                const nextIndex = this.currentStepIndex + 1
                this.delayedActiveIndex = -1

                this.currentStepIndex++

                setTimeout(() => {
                    this.delayedActiveIndex = nextIndex
                }, 600)
            }
        },
        prevStep() {
            if (this.currentStepIndex > 0) {
                this.currentStepIndex--
                this.delayedActiveIndex = this.currentStepIndex
            }
        },
        isCircleActive(index) {
            return index < this.currentStepIndex
        },
        isCircleDelayedActive(index) {
            return index === this.delayedActiveIndex
        },
        isLineActive(index) {
            return index < this.currentStepIndex - 1
        },
        isLineHalfRightActive(index) {
            return index === this.currentStepIndex - 1
        },
        isLineHalfLeftActive(index) {
            return index === this.currentStepIndex
        },
        cancel() {
            this.currentStepIndex = 0
            this.delayedActiveIndex = -1
            this.$emit('cancel')
        },
        handleSubmit() {
            const validator = this.stepValidators[this.currentStepIndex]
            if (validator && !validator()) {
                this.$emit('invalid-step', this.currentStepIndex)
                return
            }
            this.$emit('submit', (success = true) => {
                if (success) this.currentStepIndex = this.steps.length
            })
        },
    },
}
</script>

<style scoped>
.progress-stepper-wrapper {
    width: 100%;
}

.progress-stepper-container {
    position: relative;
    width: 100%;
    height: 36px;
    margin: 2.5em auto;
}

.steps {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.step-wrapper {
    display: flex;
    align-items: center;
    flex: 1;
}

.circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: darkgrey;
    z-index: 1;
    transition: all 0.3s ease;
}

.circle.active,
.circle.delayed-active {
    background-color: #195bff;
    color: #fff;
    transform: scale(1.15);
    box-shadow: 0 0 10px rgba(25, 91, 255, 0.4);
    transition: all 0.4s ease;
}

.circle.dummy {
    background-color: #cfd8dc;
    color: transparent;
}

.line {
    position: relative;
    flex: 1;
    height: 6px;
    background-color: #e0e0e0;
    border-radius: 9999px;
    margin: 0 10px;
    overflow: hidden;
}

.line::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #195bff;
    transition: width 0.6s cubic-bezier(0.65, 0, 0.35, 1);
    width: 0%;
}

.line.active-full::before {
    width: 100%;
}

.line.active-half-left::before {
    width: 50%;
    left: 0;
    transition-delay: 0.6s;
}

.line.active-half-right::before {
    width: 100%;
    transition-delay: 0s;
}

.line-separator {
    height: 1px;
    background-color: #e0e0e0;
    border-radius: 9999px;
    margin-top: 10px;
}

.stepper-content {
    margin-bottom: 20px;
    min-height: 150px;
    transition: all 0.5s cubic-bezier(0.65, 0, 0.35, 1);
    transform: translateY(0);
}
.stepper-content-enter-active,
.stepper-content-leave-active {
    transition: all 0.5s cubic-bezier(0.65, 0, 0.35, 1);
}
.stepper-content-enter {
    opacity: 0;
    transform: translateY(10px);
}
.stepper-content-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
