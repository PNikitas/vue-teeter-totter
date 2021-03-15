<template>
  <div class="score">
    <div>Total weight - {{ totalWeight.leftTotalWeight }}kg</div>
    <div>Total momentum - {{ totalMomentum.leftTotalMomentum.toFixed(1) }}kgm</div>
  </div>

  <div class="score score--right">
    <div>Total weight - {{ totalWeight.rightTotalWeight }}kg</div>
    <div>Total momentum - {{ totalMomentum.rightTotalMomentum.toFixed(1) }}kgm</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'ScorePanel',
  computed: {
    ...mapGetters(['totalWeight', 'totalMomentum']),
  }
};
</script>

<style scoped>
.score {
  position: absolute;
  left: 20px;
  top: 100px;
}

.score--right {
  right: 20px;
  text-align: right;
}
</style>