;

'use strict';

const STEP_TRANSITION_DURATION = 700;
let currentStep = 1;
let deltaYDown = 0;
let deltaYUp = 0;
let header;
let steps;
let stepInTransition = false;

function initStepsNew() {
    steps.forEach((step, index) => index === 0
        ? step.style.top = '0vh'
        : step.style.top = '100vh');
    document.addEventListener('wheel', event => {
        if (stepInTransition) {
            return;
        }

        if (event.deltaY > 0) {
            if (currentStep === 5) {
                return;
            }

            deltaYDown = 0;
            deltaYUp += event.deltaY;

            if (deltaYUp >= window.innerHeight) {
                deltaYUp = 0;
                currentStep++;
                get(`.step--${ currentStep }`).style.top = '0vh';
                stepInTransition = true;
            }
        } else {
            if (currentStep === 1) {
                return;
            }

            deltaYUp = 0;
            deltaYDown += Math.abs(event.deltaY);

            if (deltaYDown >= window.innerHeight) {
                deltaYDown = 0;
                get(`.step--${ currentStep }`).style.top = '100vh';
                currentStep--;
                stepInTransition = true;
            }
        }

        if (currentStep === 1 && header.classList.contains('header--hidden-main-menu')) {
            header.classList.remove('header--hidden-main-menu');
        } else if (currentStep !== 1 && !header.classList.contains('header--hidden-main-menu')) {
            header.classList.add('header--hidden-main-menu');
        }

        if (stepInTransition) {
            setTimeout(() => stepInTransition = false, STEP_TRANSITION_DURATION);
        }
    });
}

function get(selector) {
    return document.querySelector(selector);
}

function getAll(selector) {
    return document.querySelectorAll(selector);
}

window.onload = () => {
    header = get('.header');
    steps = getAll('.step');

    initStepsNew();
};
