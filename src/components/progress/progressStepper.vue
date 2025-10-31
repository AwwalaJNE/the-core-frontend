<template>
    <div class="progress-stepper-wrapper">
        <div class="progress-stepper-container">
            <div class="steps">
                <div v-for="(step, index) in stepsWithDummy" :key="index" class="step-wrapper">
                    <div
                        class="circle"
                        :class="{ active: isCircleActive(index), dummy: index === steps.length }"
                    >
                        {{ index === steps.length ? '' : step.label || index + 1 }}
                    </div>
                    <div
                        v-if="index < stepsWithDummy.length - 1"
                        class="line"
                        :class="{ active: isLineActive(index) }"
                    ></div>
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
            if (this.currentStepIndex < this.steps.length - 1) this.currentStepIndex++
        },
        prevStep() {
            if (this.currentStepIndex > 0) this.currentStepIndex--
        },
        isCircleActive(index) {
            return index <= this.currentStepIndex
        },
        isLineActive(index) {
            return index < this.currentStepIndex
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
    justify-content: center;
    position: relative;
    gap: 0.5rem;
}

.step-wrapper {
    display: flex;
    align-items: center;
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
    transition: all 0.3s ease;
}

.circle.active {
    background-color: #195bff;
    color: #fff;
    transform: scale(1.1);
}

.circle.dummy {
    background-color: #cfd8dc;
    color: transparent;
}

.line {
    width: 60px;
    height: 6px;
    background-color: #e0e0e0;
    border-radius: 9999px;
    margin: 0 10px;
    transition: background-color 0.3s ease;
}

.line.active {
    background-color: #195bff;
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
    transition: all 0.3s ease;
}

.stepper-buttons {
    margin-top: 10px;
}
</style>
