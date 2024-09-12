<script setup>
import { ref, onMounted } from 'vue'
import anime from 'animejs'



// Variables to use later
var rangeWrapper = ref(null) // document.querySelector('.range__wrapper');
var rangeInput = ref(null)// document.querySelector('.range__input');
var rangeValues = ref(null)//document.querySelector('.range__values');
var rangeValueNumberTop = ref(null)//document.querySelector('.range__value__number--top');
var rangeValueNumberBottom = ref(null) // document.querySelector('.range__value__number--bottom');
var rangeSliderPaths1 = ref(null)//document.querySelectorAll('.range__slider__path');
var rangeSliderPaths2 = ref(null)//document.querySelectorAll('.range__slider__path');

onMounted(() => {
    var mouseX = 0;
    var mouseY = 0;
    var mouseInitialY = 0;
    var mouseDy = 0;
    var mouseDyLimit = 150;
    var mouseDyFactor = 3;
    var max = 60;
    var rangeMin = parseInt(rangeInput.value.min);
    var rangeMax = parseInt(rangeInput.value.max);
    var rangeValue = parseInt(rangeInput.value.value);
    var rangeHeight = 480;
    var currentY = rangeHeight * rangeValue / max;
    var rangeMinY = rangeHeight * rangeMin / max;
    var rangeMaxY = rangeHeight * rangeMax / max;
    var scaleMax = 0.32;
    var scale, newPath, newY, newSliderY, lastMouseDy, rangeWrapperLeft, pageX, pageY;

    // Update slider value, initially using the `input` value
    updateValue();

    // Function to build the slider `path`, using the given `dy` and `ty` values
    function buildPath(dy, ty) {
        return 'M 0 ' + ty + ' q ' + mouseX + ' ' + dy + ' 320 0 l 0 480 l -320 0 Z';
    }

    // Function to update the slider value
    function updateValue() {
        // Clear animations if are still running
        anime.remove([rangeValues, rangeSliderPaths1.value, rangeSliderPaths2.value]);

        // Calc the `input` value using the current `y`
        rangeValue = parseInt(currentY * max / rangeHeight);
        // Calc `scale` value for numbers
        scale = (rangeValue - rangeMin) / (rangeMax - rangeMin) * scaleMax;
        // Update `input` value
        rangeInput.value.value = rangeValue;
        // Update numbers values
        rangeValueNumberTop.value.innerText = max - rangeValue;
        rangeValueNumberBottom.value.innerText = rangeValue;
        // Translate range values
        rangeValues.value.style.transform = 'translateY(' + (rangeHeight - currentY) + 'px)';
        // Apply corresponding `scale` to numbers
        rangeValueNumberTop.value.style.transform = 'scale(' + (1 - scale) + ')';
        rangeValueNumberBottom.value.style.transform = 'scale(' + (1 - (scaleMax - scale)) + ')';

        // Some maths calc
        if (Math.abs(mouseDy) < mouseDyLimit) {
            lastMouseDy = mouseDy;
        } else {
            lastMouseDy = mouseDy < 0 ? -mouseDyLimit : mouseDyLimit;
        }

        // Calc the `newSliderY` value to build the slider `path`
        newSliderY = currentY + lastMouseDy / mouseDyFactor;
        if (newSliderY < rangeMinY || newSliderY > rangeMaxY) {
            newSliderY = newSliderY < rangeMinY ? rangeMinY : rangeMaxY;
        }

        // Build `path` string and update `path` elements
        newPath = buildPath(lastMouseDy, rangeHeight - newSliderY);
        rangeSliderPaths1.value.setAttribute('d', newPath);
        rangeSliderPaths2.value.setAttribute('d', newPath);
    }

    // Function to simulate the elastic behavior
    function elasticRelease() {
        // Morph the paths to the opposite direction, to simulate a strong elasticity
        anime({
            targets: [rangeSliderPaths1.value, rangeSliderPaths2.value],
            d: buildPath(-lastMouseDy * 1.3, rangeHeight - (currentY - lastMouseDy / mouseDyFactor)),
            duration: 150,
            easing: 'linear',
            complete: function () {
                // Morph the paths to the normal state, using the `elasticOut` easing function (default)
                anime({
                    targets: [rangeSliderPaths1.value, rangeSliderPaths2.value],
                    d: buildPath(0, rangeHeight - currentY),
                    duration: 4000,
                    elasticity: 880
                });
            }
        });

        // Translate the values to the opposite direction, to simulate a strong elasticity
        anime({
            targets: rangeValues,
            translateY: rangeHeight - (currentY + lastMouseDy / mouseDyFactor / 4),
            duration: 150,
            easing: 'linear',
            complete: function () {
                // Translate the values to the right position, using the `elasticOut` easing function (default)
                anime({
                    targets: rangeValues,
                    translateY: rangeHeight - currentY,
                    duration: 4000,
                    elasticity: 880
                });
            }
        });
    }

    // Handle `mousedown` and `touchstart` events, saving data about mouse position
    function mouseDown(e) {
        mouseY = mouseInitialY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY;
        rangeWrapperLeft = rangeWrapper.value.getBoundingClientRect().left;
    }

    // Handle `mousemove` and `touchmove` events, calculating values to morph the slider `path` and translate values properly
    function mouseMove(e) {
        if (mouseY) {
            pageX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX;
            pageY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY;
            mouseX = pageX - rangeWrapperLeft;
            mouseDy = (pageY - mouseInitialY) * mouseDyFactor;
            newY = currentY + mouseY - pageY;
            if (newY >= rangeMinY && newY <= rangeMaxY) {
                currentY = newY;
                mouseY = pageY;
            } else {
                currentY = newY < rangeMinY ? rangeMinY : rangeMaxY;
            }
            // After doing maths, update the value
            updateValue();
        }
    }

    // Handle `mouseup`, `mouseleave` and `touchend` events
    function mouseUp() {
        // Trigger elastic animation in case `y` value has changed
        if (mouseDy) {
            elasticRelease();
        }
        // Reset values
        mouseY = mouseDy = 0;
    }

    // Events listeners
    rangeWrapper.value.addEventListener('mousedown', mouseDown);
    rangeWrapper.value.addEventListener('touchstart', mouseDown);
    rangeWrapper.value.addEventListener('mousemove', mouseMove);
    rangeWrapper.value.addEventListener('touchmove', mouseMove);
    rangeWrapper.value.addEventListener('mouseup', mouseUp);
    rangeWrapper.value.addEventListener('mouseleave', mouseUp);
    rangeWrapper.value.addEventListener('touchend', mouseUp);

})

</script>

<template>
    <!-- Wrapper for the range input slider -->
    <div ref="rangeWrapper" class="range__wrapper">
        <!-- The real input, it will be hidden, but updated properly with Javascript -->
        <!-- For a production usage, you may want to add a label, and also put it inside a form -->
        <input ref="rangeInput" class="range__input" type="range" min="0" max="40" value="8" />

        <!-- SVG elements -->
        <svg class="range__slider" width="320px" height="480px" viewBox="0 0 320 480">
            <defs>
                <!-- Range marks symbol, it will be reused below -->
                <symbol id="range__marks" shape-rendering="crispEdges">
                    <path class="range__marks__path" d="M 257 30 l 33 0"></path>
                    <path class="range__marks__path" d="M 268 60 l 22 0"></path>
                    <path class="range__marks__path" d="M 278 90 l 12 0"></path>
                    <path class="range__marks__path" d="M 278 120 l 12 0"></path>
                    <path class="range__marks__path" d="M 278 150 l 12 0"></path>
                    <path class="range__marks__path" d="M 278 180 l 12 0"></path>
                    <path class="range__marks__path" d="M 278 210 l 12 0"></path>
                    <path class="range__marks__path" d="M 278 240 l 12 0"></path>
                    <path class="range__marks__path" d="M 278 270 l 12 0"></path>
                    <path class="range__marks__path" d="M 278 300 l 12 0"></path>
                    <path class="range__marks__path" d="M 278 330 l 12 0"></path>
                    <path class="range__marks__path" d="M 278 360 l 12 0"></path>
                    <path class="range__marks__path" d="M 278 390 l 12 0"></path>
                    <path class="range__marks__path" d="M 268 420 l 22 0"></path>
                    <path class="range__marks__path" d="M 257 450 l 33 0"></path>
                </symbol>
                <!-- This clipPath element will allow us to hide/show the white marks properly -->
                <!-- The `path` used here is an exact copy of the `path` used for the slider below -->
                <clipPath id="range__slider__clip-path">
                    <path ref="rangeSliderPaths1" class="range__slider__path" d="M 0 480 l 320 0 l 0 480 l -320 0 Z"></path>
                </clipPath>
            </defs>
            <!-- Pink marks -->
            <use xlink:href="#range__marks" class="range__marks__pink"></use>
            <!-- Slider `path`, that will be morphed properly on user interaction -->
            <path ref="rangeSliderPaths2" class="range__slider__path" d="M 0 480 l 320 0 l 0 480 l -320 0 Z"></path>
            <!-- Clipped white marks -->
            <use xlink:href="#range__marks" class="range__marks__white" clip-path="url(#range__slider__clip-path)">
            </use>
        </svg>

        <!-- Range values -->
        <div ref="rangeValues" class="range__values">
            <div class="range__value range__value--top">
                <!-- This element will be updated in the way: `100 - inputValue` -->
                <span ref="rangeValueNumberTop" class="range__value__number range__value__number--top"></span>
                <!-- Some text for the `top` value -->
                <span class="range__value__text range__value__text--top">
                    <span>Points</span>
                    <span>You Need</span>
                </span>
            </div>
            <div class="range__value range__value--bottom">
                <!-- This element will be updated with the `inputValue` -->
                <span ref="rangeValueNumberBottom" class="range__value__number range__value__number--bottom"></span>
                <!-- Some text for the `bottom` value -->
                <span class="range__value__text range__value__text--bottom">
                    <span>Points</span>
                    <span>You Have</span>
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
body {
    overflow: hidden;
    position: fixed;
}

.range__wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    height: 480px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.2);
    user-select: none;
    cursor: pointer;
    overflow: hidden;
}

.range__input {
    display: none;
}

.range__slider {
    position: absolute;
    left: 0;
    top: 0;
}

.range__slider__path {
    fill: #FF4B81;
}

.range__marks__path {
    fill: none;
    stroke: inherit;
    stroke-width: 1px;
}

.range__marks__pink {
    stroke: #FF4B81;
}

.range__marks__white {
    stroke: white;
}

.range__values {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
}


.range__value {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    padding: 40px 30px;
}

.range__value--top {
    position: absolute;
    bottom: 100%;
    color: #FF4B81;
}

.range__value--bottom {
    color: white;
}

.range__value__number {
    font-size: 70px;
    margin: 0 10px;
}

.range__value__number--top {
    transform-origin: 100% 100%;
}

.range__value__number--bottom {
    transform-origin: 100% 0;
}

.range__value__text {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    text-transform: uppercase;

    span:first-child {
        margin-bottom: 3px;
    }
}

.range__value__text--top {
    align-self: flex-end;
    margin-bottom: 13px;
}

.range__value__text--bottom {
    margin-top: 10px;
}
</style>