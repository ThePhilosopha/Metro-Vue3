<template>
  <div
    :style="sceneStyle"
    @mousemove="onMouseMove($event)"
    @mousedown="onMouseDown($event)"
    @mouseup="onMouseUp($event)"
    @mouseleave="onMouseLeave"
    @touchmove.prevent="onTouchMove($event)"
    ref="scene">
    <div :style="boxContainerStyle">
      <div :style="frontFaceStyle">
        <slot name="front"></slot>
      </div>
      <div :style="backFaceStyle">
        <slot name="back"></slot>
      </div>
      <div :style="topFaceStyle">
        <slot name="top"></slot>
      </div>
      <div :style="bottomFaceStyle">
        <slot name="bottom"></slot>
      </div>
      <div :style="rightFaceStyle">
        <slot name="right"></slot>
      </div>
      <div :style="leftFaceStyle">
        <slot name="left"></slot>
      </div>
    </div>
    <div :class="{ border: isHover && !isMouseDown }" :style="glareBoundingBox">
      <div :style="hoverGlareStyle">
      </div>
      <div :class="{ ripple: isAnimating }" :style="clickGlareStyle" @animationend="resetAnimation">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  faceStyle: {
    type: Object,
    default: undefined
  },
  frontStyle: {
    type: Object,
    default: undefined
  },
  backStyle: {
    type: Object,
    default: undefined
  },
  rightStyle: {
    type: Object,
    default: undefined
  },
  leftStyle: {
    type: Object,
    default: undefined
  },
  topStyle: {
    type: Object,
    default: undefined
  },
  bottomStyle: {
    type: Object,
    default: undefined
  },
  rotateX: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 200
  },
  width: {
    type: Number,
    default: 250
  },
  perspective: {
    type: Number,
    default: 750
  },
  maxTiltX: {
    type: Number,
    default: 20
  },
  maxTiltY: {
    type: Number,
    default: 10
  },
  clickGlareSize: {
    type: Number,
    default: 90
  },
  clickGlareOpacity: {
    type: Number,
    default: 0.2
  },
  hoverGlareOpacity: {
    type: Number,
    default: 0.3
  }
})

const emit = defineEmits(['click', 'touchmove'])

// Template refs
const scene = ref(null)

// Reactive state
const curTiltTransform = ref('')
const clickGlareTop = ref(0)
const clickGlareLeft = ref(0)
const glareScale = ref(5)
const hoverX = ref(0)
const hoverY = ref(0)
const mouseDownX = ref(0)
const mouseDownY = ref(0)
const isHover = ref(false)
const isMouseDown = ref(false)
const isAnimating = ref(false)

// Computed styles
const sceneStyle = computed(() => ({
  position: 'relative',
  cursor: 'pointer',
  width: `${props.width}px`,
  height: `${props.height}px`,
  perspective: `${props.perspective}px`,
  overflow: 'hidden',
  'background-color': 'rgba(153,153,153,0.3)'
}))

const curFaceTransform = computed(() =>
  `translateZ(-${props.height / 2}px) rotateX(${props.rotateX}deg)`
)

const boxContainerStyle = computed(() => ({
  width: '100%',
  height: '100%',
  position: 'relative',
  'transform-style': 'preserve-3d',
  transition: 'transform 0.5s',
  transform: `${curTiltTransform.value} ${curFaceTransform.value}`,
  'will-change': 'transform'
}))

const glareBoundingBox = computed(() => {
  const translateZ = Math.max(props.height / 2, props.width / 2)
  const scaleOffset = props.perspective ? props.perspective / (props.perspective - translateZ) : 1
  return {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    overflow: 'hidden',
    'transform-style': 'preserve-3d',
    transform: `scale(${1 / scaleOffset}, ${1 / scaleOffset}) translateZ(${translateZ}px`,
    'pointer-events': 'none'
  }
})

const hoverGlareStyle = computed(() => ({
  position: 'absolute',
  width: `${props.width * 2}px`,
  height: `${props.height * 2}px`,
  'background-image': `radial-gradient(circle at center, rgba(255,255,255, 0.7) 0%, rgba(255,255,255,0.1) 100%)`,
  transform: `translate(${hoverX.value - props.width / 2}px, ${hoverY.value - props.height / 2}px) translate(-${props.width / 2}px, -${props.height / 2}px)`,
  opacity: isHover.value ? props.hoverGlareOpacity : 0,
  'transform-style': 'preserve-3d'
}))

const clickGlareStyle = computed(() => {
  const glareScaledsize = props.clickGlareSize * glareScale.value
  const glareScaledOffset = (glareScaledsize - props.clickGlareSize) / 2
  const glareTop = clickGlareTop.value - props.clickGlareSize / 2
  const glareLeft = clickGlareLeft.value - props.clickGlareSize / 2
  return {
    position: 'absolute',
    width: `${props.clickGlareSize}px`,
    height: `${props.clickGlareSize}px`,
    opacity: 0,
    'border-radius': '50%',
    '--glare-top': `${glareTop}px`,
    '--glare-left': `${glareLeft}px`,
    '--glare-opacity': `${props.clickGlareOpacity}`,
    '--glare-scaled-size': `${glareScaledsize}px`,
    '--glare-scaled-top': `${glareTop - glareScaledOffset}px`,
    '--glare-scaled-left': `${glareLeft - glareScaledOffset}px`,
    'transform-style': 'preserve-3d'
  }
})

const frontFaceStyle = computed(() => ({
  ...props.faceStyle,
  ...props.frontStyle,
  position: 'absolute',
  width: `${props.width}px`,
  height: `${props.height}px`,
  transform: `translateZ(${props.height / 2}px)`,
  outline: '1px solid transparent'
}))

const backFaceStyle = computed(() => ({
  ...props.faceStyle,
  ...props.backStyle,
  position: 'absolute',
  width: `${props.width}px`,
  height: `${props.height}px`,
  transform: `translateZ(-${props.height / 2}px) rotateZ(180deg) rotateY(180deg)`,
  outline: '1px solid transparent'
}))

const topFaceStyle = computed(() => ({
  ...props.faceStyle,
  ...props.topStyle,
  position: 'absolute',
  width: `${props.width}px`,
  height: `${props.height}px`,
  transform: `translateY(-${props.height / 2}px) rotateX(90deg)`,
  outline: '1px solid transparent'
}))

const bottomFaceStyle = computed(() => ({
  ...props.faceStyle,
  ...props.bottomStyle,
  position: 'absolute',
  width: `${props.width}px`,
  height: `${props.height}px`,
  transform: `translateY(${props.height - props.height / 2}px) rotateX(-90deg)`,
  outline: '1px solid transparent'
}))

const leftFaceStyle = computed(() => ({
  ...props.faceStyle,
  ...props.leftStyle,
  position: 'absolute',
  width: `${props.height}px`,
  height: `${props.height}px`,
  transform: `translateX(-${props.height / 2}px) rotateY(-90deg)`,
  outline: '1px solid transparent'
}))

const rightFaceStyle = computed(() => ({
  ...props.faceStyle,
  ...props.rightStyle,
  position: 'absolute',
  width: `${props.height}px`,
  height: `${props.height}px`,
  transform: `translateX(${props.width - props.height / 2}px) rotateY(90deg)`,
  outline: '1px solid transparent'
}))

// Methods
function getRelativePos2Scene(pageX, pageY) {
  const boundingRect = scene.value.getBoundingClientRect()
  return {
    x: pageX - (boundingRect.left + window.scrollX),
    y: pageY - (boundingRect.top + window.scrollY)
  }
}

function onMouseDown(event) {
  const relativePos = getRelativePos2Scene(event.pageX, event.pageY)
  mouseDownX.value = event.pageX
  mouseDownY.value = event.pageY
  tiltTile(relativePos)
  clickGlare(relativePos)
  isMouseDown.value = true
}

function onMouseUp(event) {
  if (mouseDownX.value === event.pageX && mouseDownY.value === event.pageY) {
    emit('click', event)
  }
  recoverTile()
  isMouseDown.value = false
}

function onMouseMove(event) {
  const relativePos = getRelativePos2Scene(event.pageX, event.pageY)
  hoverGlare(relativePos)
}

function onMouseLeave() {
  recoverTile()
  resetHover()
}

function onTouchMove(event) {
  emit('touchmove', event)
}

function tiltTile(relativePos) {
  const percentageX = relativePos.x / props.width
  const percentageY = relativePos.y / props.height
  const tiltX = ((0.5 - percentageY) * props.maxTiltX).toFixed(2)
  const tiltY = ((percentageX - 0.5) * props.maxTiltY).toFixed(2)
  curTiltTransform.value = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
}

function recoverTile() {
  curTiltTransform.value = ''
}

function resetHover() {
  isHover.value = false
}

function clickGlare(relativePos) {
  clickGlareTop.value = relativePos.y
  clickGlareLeft.value = relativePos.x
  isAnimating.value = true
}

function resetAnimation() {
  isAnimating.value = false
}

function hoverGlare(relativePos) {
  isHover.value = true
  hoverX.value = relativePos.x
  hoverY.value = relativePos.y
}
</script>

<style>
.ripple {
  background-image: radial-gradient(rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 100%);
  filter: blur(5px);
  opacity: var(--glare-opacity);
  animation-name: ripple;
  animation-duration: 1.3s;
  animation-timing-function: ease-in;
}

@keyframes ripple {
  0% {
    transform: translate(var(--glare-left), var(--glare-top));
    opacity: var(--glare-opacity);
  }

  100% {
    width: var(--glare-scaled-size);
    height: var(--glare-scaled-size);
    transform: translate(var(--glare-scaled-left), var(--glare-scaled-top));
    opacity: 0;
  }
}

.border::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 2px solid rgba(255, 255, 255, 0.6);
}
</style>