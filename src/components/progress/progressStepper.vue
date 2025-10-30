<template>
    <div class="progress-stepper">
        <div v-for="(step, index) in steps" :key="index" class="step-container">
            <!-- Step circle -->
            <div
                class="circle"
                :class="{
                    active: index + 1 === currentStep,
                    completed: index + 1 < currentStep,
                }"
            >
                {{ index + 1 }}
            </div>

            <!-- Connecting line -->
            <div v-if="index < steps.length - 1" class="line">
                <!-- full line for completed -->
                <div v-if="index + 1 < currentStep" class="line-fill full"></div>

                <!-- half and animated line for current -->
                <div v-else-if="index + 1 === currentStep" class="line-fill half"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProgressStepper',
    props: {
        steps: {
            type: Array,
            required: true,
        },
        currentStep: {
            type: Number,
            default: 1,
        },
    },
}
</script>

<style scoped>
.progress-stepper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.step-container {
    display: flex;
    align-items: center;
    position: relative;
}

.circle {
    width: 30px;
    height: 30px;
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
}

.circle.active {
    border-color: #3b82f6;
    background-color: #3b82f6;
    color: #fff;
}

.circle.completed {
    border-color: #3b82f6;
    background-color: #3b82f6;
    color: #fff;
}

.line {
    width: 60px;
    height: 3px;
    background-color: #d0d0d0;
    position: relative;
    overflow: hidden;
}

/* default blue fill */
.line-fill {
    height: 100%;
    position: absolute;
    top: 0;
    background-color: #3b82f6;
    transition: width 0.4s ease;
}

/* full line (for completed steps) */
.line-fill.full {
    left: 0;
    width: 100%;
}

/* half line (for current step) */
.line-fill.half {
    left: 0;
    width: 50%;
    animation: flowHalf 1s ease-in-out forwards;
}

/* animation: flowing left → right */
@keyframes flowHalf {
    0% {
        width: 0%;
        left: 0;
    }
    100% {
        width: 50%;
        left: 0;
    }
}
</style>
