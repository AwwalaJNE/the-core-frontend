<template>
    <div
        class="progress-stepper"
        role="progressbar"
        :aria-valuenow="currentStep"
        :aria-valuemin="1"
        :aria-valuemax="steps.length"
    >
        <div
            v-for="(step, index) in steps"
            :key="`step-${index}`"
            class="step-container"
            :style="{ width: `${100 / steps.length}%` }"
        >
            <div
                class="circle"
                :class="{
                    active: stepIndex(index) === currentStep,
                    completed: stepIndex(index) < currentStep,
                }"
                :aria-label="`Step ${stepIndex(index)}: ${step}`"
                :aria-current="stepIndex(index) === currentStep ? 'step' : undefined"
            >
                {{ stepIndex(index) }}
            </div>

            <div v-if="index < steps.length - 1" class="line">
                <div
                    class="line-fill"
                    :class="{
                        full: stepIndex(index) < currentStep,
                        half: stepIndex(index) === currentStep,
                        [animationDirection]: stepIndex(index) === currentStep,
                    }"
                    :key="`line-${index}-${animationKey}`"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProgressStepper',
    props: {
        steps: { type: Array, required: true },
        currentStep: { type: Number, default: 1 },
    },
    data() {
        return {
            prevStep: 1,
            animationDirection: 'forward',
            animationKey: 0,
        }
    },
    methods: {
        stepIndex(index) {
            return index + 1
        },
    },
    watch: {
        currentStep(newVal, oldVal) {
            if (newVal > oldVal) {
                this.animationDirection = 'forward'
            } else if (newVal < oldVal) {
                this.animationDirection = 'backward'
            }
            this.prevStep = newVal
            this.animationKey = Date.now()
        },
    },
}
</script>

<style scoped>
.progress-stepper {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 24px;
    position: relative;
}

.step-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
}

.circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #d0d0d0;
    color: #777;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    background-color: #fff;
    transition: all 0.3s ease;
    z-index: 2;
    font-size: 14px;
    flex-shrink: 0;
}

.circle.active,
.circle.completed {
    border-color: #195bff;
    background-color: #195bff;
    color: #fff;
}

.line {
    position: absolute;
    left: 50%;
    right: -50%;
    height: 6px;
    background-color: #e0e0e0;
    top: 50%;
    transform: translateY(-50%);
    overflow: hidden;
    border-radius: 9999px;
}

.line-fill {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    background-color: #195bff;
    border-radius: 9999px;
    transform-origin: left center;
    transform: scaleX(0);
    transition: transform 0.6s cubic-bezier(0.55, 0.1, 0.3, 1);
}

.line-fill.full {
    transform: scaleX(1) !important;
}

.line-fill.half.forward {
    animation: fillForward 0.8s cubic-bezier(0.45, 0, 0.25, 1) forwards;
}

.line-fill.half.backward {
    transform-origin: right center;
    animation: fillBackward 0.8s cubic-bezier(0.45, 0, 0.25, 1) forwards;
}

@keyframes fillForward {
    0% {
        transform: scaleX(0);
    }
    100% {
        transform: scaleX(0.5);
    }
}

@keyframes fillBackward {
    0% {
        transform: scaleX(0.5);
    }
    100% {
        transform: scaleX(0);
    }
}
</style>
