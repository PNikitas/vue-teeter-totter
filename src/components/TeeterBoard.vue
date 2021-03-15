<template>
  <div class="board-holder" :style="{transform: 'rotate(' + angle + 'rad)'}">

    <Shape
        v-for="standingShape in shapes.leftShapes"
        :key="standingShape.id"
        :shape="assembleShape(standingShape)"
        :styles="{'bottom': BOARD_WIDTH_PX + 'px'}"
    />

    <Shape
        v-for="standingShape in shapes.rightShapes"
        :key="standingShape.id"
        :shape="assembleShape(standingShape, BOARD_LENGTH_PX / 2)"
        :styles="{'bottom': BOARD_WIDTH_PX + 'px'}"
    />

    <div class="board"></div>
  </div>
  <div class="board-base"></div>

  <div class="physical-parameters">
    <div>angle = {{ angle }}rad</div>
    <div>velocity = {{ velocity }}m/s</div>
    <div>acceleration = {{ getAcceleration }}m/s^2</div>
    <div>inertia = {{ getInertia }}kg*m^2</div>
  </div>

</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import {assembleShape, calculateInertia, calculateAcceleration} from '@/helpers';
import {BOARD_WIDTH_PX, BOARD_LENGTH_PX, BENDING_TIMER_DIVIDER, MAX_BENDING} from '@/helpers/constants';

import Shape from './Shape';


export default {
  name: 'TeeterBoard',
  components: {
    Shape,
  },
  methods: {
    ...mapActions(['setAngle']),
    ...mapMutations(['updateSimulationOver']),
    assembleShape,
  },
  data: function () {
    return {
      BOARD_WIDTH_PX,
      BOARD_LENGTH_PX,
      velocity: 0,
    }
  },
  created: function () {
    setInterval(() => {
      if (!isNaN(this.getAcceleration) && !this.isPause && !this.isSimulationOver) {
        this.velocity += this.getAcceleration / BENDING_TIMER_DIVIDER;
      }
    }, 1000 / BENDING_TIMER_DIVIDER);

    setInterval(() => {
      if (!this.isPause && !this.isSimulationOver) {
        this.setAngle(this.velocity / BENDING_TIMER_DIVIDER);
        Math.abs(this.angle) > Math.PI / 2 * MAX_BENDING && this.updateSimulationOver();
      }
    }, 1000 / BENDING_TIMER_DIVIDER);
  },
  computed: {
    ...mapGetters([
      'isPause',
      'isSimulationOver',
      'shapes',
      'shapesWeight',
      'shapesPosition',
      'totalMomentum',
      'totalAllWeight',
      'angle',
    ]),

    getInertia: function () {
      if (!this.shapesWeight.length) {
        return 0;
      }
      return calculateInertia(this.shapesWeight, this.shapesPosition);
    },

    getAcceleration: function () {
      return calculateAcceleration(this.totalMomentum, this.getInertia);
    },
  },
};
</script>

<style scoped>
.board-holder {
  position: absolute;
  bottom: 120px;
  width: 100%;
  transition: 100ms;
}

.board {
  width: 100%;
  height: 10px;
  background: black;
}

.board-base {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 60px 120px 60px;
  border-color: transparent transparent #000000 transparent;
  transform: translate(-50%, 0);
}

.physical-parameters {
  position: absolute;
  bottom: 300px;
  left: 20px;
}
</style>