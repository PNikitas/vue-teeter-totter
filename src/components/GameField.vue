<template>
  <div
      class="gamefield"
      :style="{ width: BOARD_LENGTH_PX + 'px'}"
      @keydown.right="isAutoplay || moveRight()"
      @keydown.left="isAutoplay || moveLeft()"
  >
    <Header :pause="pause" :start="start" :autoplay="autoplay"/>

    <ScorePanel/>

    <Shape :shape="assembleShape(leftShape, 0, shapePositionY)"/>
    <Shape :shape="assembleShape(rightShape, BOARD_LENGTH_PX / 2, shapePositionY)"/>

    <p v-if="isPause">PAUSE</p>
    <p v-if="isSimulationOver">SIMULATION OVER</p>

    <TeeterBoard/>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';

import {assembleShape, calculateLandingPosition} from '@/helpers';
import {BOARD_LENGTH_PX, LENGTH_MULTIPLIER, MOMENTUM_LIMIT, SPEED_GAIN} from '@/helpers/constants';

import Header from './Header';
import ScorePanel from './ScorePanel';
import Shape from './Shape';
import TeeterBoard from './TeeterBoard';

export default {
  name: "GameField",
  components: {
    Header,
    TeeterBoard,
    Shape,
    ScorePanel,
  },
  data: function () {
    return {
      BOARD_LENGTH_PX,
      shapePositionY: 0,
      handleFall: null,
      speed: 1,
      landingPosition: window.innerHeight - 130,
    };
  },

  methods: {
    assembleShape,
    calculateLandingPosition,

    ...mapMutations([
      'updatePause',
      'updateLeftShape',
      'updateRightShape',
      'updateSimulationOver',
      'updateAutoplay',
      'startSimulation',
    ]),
    ...mapActions([
      'setLeftShapes',
      'setRightShapes',
      'setLeftTotalWeight',
      'setRightTotalWeight',
      'setLeftTotalMomentum',
      'setRightTotalMomentum',
      'setTotalAllWeight',
      'setShapesWeight',
      'setShapesPosition',
      'moveRight',
      'moveLeft',
    ]),

    pause: function () {
      this.isPause && this.initFalling();
      this.updatePause();
    },

    start: function () {
      this.startSimulation();
      if (this.shapePositionY === 0) {
        this.shapePositionY = 1;
      }
    },

    autoplay: function () {
      this.updateAutoplay();
      this.startSimulation();
    },

    initFalling: function () {
      clearTimeout(this.handleFall);

      if (this.shapePositionY <= this.getLandingPosition && this.isSimulationStart) {
        this.handleFall = setTimeout(() => {
          if (this.isPause || this.isSimulationOver) {
            clearTimeout(this.handleFall);
          } else {
            if (this.isAutoplay) {
              /* M = m * R */
              let predictRightMomentum = this.rightShape.weight * (this.rightShape.shapePositionX + this.rightShape.size / 2) / LENGTH_MULTIPLIER + this.totalMomentum.rightTotalMomentum;
              let predictLeftMomentum = this.leftShape.weight * (BOARD_LENGTH_PX / 2 - this.leftShape.shapePositionX - this.leftShape.size / 2) / LENGTH_MULTIPLIER + this.totalMomentum.leftTotalMomentum;

              if (predictRightMomentum > predictLeftMomentum) {
                this.moveLeft();
              } else if (predictRightMomentum < predictLeftMomentum) {
                this.moveRight();
              }
            }
            return (this.shapePositionY += this.speed);
          }
        }, 5);
      }
    },
  },

  watch: {
    shapePositionY: function () {
      if (this.shapePositionY >= this.getLandingPosition) {
        this.setLeftShapes({
          shapePositionX: this.leftShape.shapePositionX,
          weight: this.leftShape.weight,
          style: this.leftShape.style,
        });

        this.setRightShapes({
          shapePositionX: this.rightShape.shapePositionX,
          weight: this.rightShape.weight,
          style: this.rightShape.style,
        });

        this.setLeftTotalWeight(this.leftShape.weight);
        this.setRightTotalWeight(this.rightShape.weight);

        /* M = m * R */
        this.setLeftTotalMomentum(this.leftShape.weight * (BOARD_LENGTH_PX / 2 - this.leftShape.shapePositionX - this.leftShape.size / 2) / LENGTH_MULTIPLIER);
        this.setRightTotalMomentum(this.rightShape.weight * (this.rightShape.shapePositionX + this.rightShape.size / 2) / LENGTH_MULTIPLIER);

        this.setTotalAllWeight(this.totalWeight.leftTotalWeight + this.totalWeight.rightTotalWeight);

        this.setShapesWeight({leftShapeWeight: this.leftShape.weight, rightShapeWeight: this.rightShape.weight});

        this.setShapesPosition({
          leftShapePosition: BOARD_LENGTH_PX / 2 - this.leftShape.shapePositionX,
          rightShapePosition: this.rightShape.shapePositionX
        });

        this.updateLeftShape();
        this.updateRightShape();

        this.shapePositionY = 1;

        if (Math.abs(this.totalMomentum.leftTotalMomentum - this.totalMomentum.rightTotalMomentum) > MOMENTUM_LIMIT) {
          this.updateSimulationOver();
        } else {
          this.speed = this.speed + SPEED_GAIN;
        }
      }
      this.initFalling();
    },
  },

  computed: {
    ...mapGetters([
      'isPause',
      'leftShape',
      'rightShape',
      'shapes',
      'totalWeight',
      'totalMomentum',
      'totalAllWeight',
      'shapesWeight',
      'shapesPosition',
      'isSimulationOver',
      'isAutoplay',
      'isSimulationStart',
      'angle',
    ]),

    getLandingPosition: function () {
      if (!document.querySelector(".board") && this.leftShape.shapePositionX) {
        return this.landingPosition - this.leftShape.size;
      }

      return calculateLandingPosition('.board', this.leftShape, this.angle);
    },
  },
};
</script>

<style scoped>
.gamefield {
  position: absolute;
  top: 0;
  left: 50%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightblue;
  transform: translateX(-50%);
}
</style>