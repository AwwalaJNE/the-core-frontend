<template>
    <div class="progress-stepper-wrapper">
        <div class="progress-stepper-container">
            <div class="line-full"></div>
            <div class="line-progress" :style="{ width: progressWidth }"></div>
            <div class="steps">
                <div
                    v-for="index in steps.length + 1"
                    :key="index"
                    class="circle"
                    :class="{ active: isCircleActive(index - 1) }"
                >
                    {{ index === steps.length + 1 ? '' : index }}
                </div>
            </div>
        </div>

        <div class="line-separator"></div>

        <div class="stepper-content" v-if="currentStepIndex < steps.length">
            <slot :name="`step-${currentStepIndex}`"></slot>
        </div>

        <vs-row justify="flex-end" align="center" class="stepper-buttons">
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
        }
    },
    computed: {
        progressWidth() {
            const totalCircles = this.steps.length + 1
            return `${(this.currentStepIndex / (totalCircles - 1)) * 100}%`
        },
    },
    methods: {
        nextStep() {
            const validator = this.stepValidators[this.currentStepIndex]
            if (validator && !validator()) {
                this.$emit('invalid-step', this.currentStepIndex)
                return
            }
            if (this.currentStepIndex < this.steps.length - 1) this.currentStepIndex++
        },
        prevStep() {
            if (this.currentStepIndex > 0) this.currentStepIndex--
        },
        isCircleActive(index) {
            return index <= this.currentStepIndex
        },
        cancel() {
            this.currentStepIndex = 0
            this.$emit('cancel')
        },
        handleSubmit() {
            const validator = this.stepValidators[this.currentStepIndex]
            if (validator && !validator()) {
                this.$emit('invalid-step', this.currentStepIndex)
                return
            }

            this.$emit('submit', (success = true) => {
                if (success) {
                    this.currentStepIndex = this.steps.length
                }
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

.line-separator {
    height: 1px;
    background-color: #e0e0e0;
    border-radius: 9999px;
}

.line-full {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 6px;
    background-color: #e0e0e0;
    border-radius: 9999px;
    transform: translateY(-50%);
    z-index: 1;
    pointer-events: none;
}

.line-progress {
    position: absolute;
    top: 50%;
    left: 0;
    height: 6px;
    background-color: #195bff;
    border-radius: 9999px;
    transform: translateY(-50%);
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2;
    pointer-events: none;
}

.steps {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 3;
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
    position: relative;
    transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
        color 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease;
}

.circle.active {
    background-color: #195bff;
    color: #fff;
    transform: scale(1.1);
}

.stepper-content {
    margin-bottom: 20px;
    min-height: 150px;
    transition: all 0.3s ease;
}

.stepper-buttons {
    margin-top: 10px;
}
</style>
