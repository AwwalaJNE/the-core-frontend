<template>
    <div class="progress-stepper">
        <div v-for="(step, index) in steps" :key="`step-${index}`" class="step-container">
            <!-- Circle -->
            <div
                class="circle"
                :class="{
                    active: stepIndex(index) === currentStep,
                    completed: stepIndex(index) < currentStep,
                }"
            >
                {{ stepIndex(index) }}
            </div>

            <!-- Line (only between steps) -->
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
            this.animationDirection = newVal > oldVal ? 'forward' : 'backward'
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
    justify-content: space-between;
    width: 100%;
}

.step-container {
    display: flex;
    align-items: center;
    flex: 1;
}

/* Lingkaran */
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

/* Garis antar step */
.line {
    flex: 1;
    height: 6px;
    background-color: #e0e0e0;
    margin: 0 10px; /* <-- kasih gap antara lingkaran dan garis */
    border-radius: 9999px;
    overflow: hidden;
    position: relative;
}

.line-fill {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
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
