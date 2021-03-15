<template>
  <div
      class="shape"
      :style="[{
        top: shape.shapePositionY + 'px',
        left: shape.shapePositionX + shape.startPositionX + 'px',
      }, shape.style, styles]"
  >
    {{ shape.weight }}
  </div>
</template>

<script>
export default {
  name: 'Shape',
  props: {
    shape: {type: Object, required: true},
    styles: {type: Object},
  },
};
</script>

<style scoped>
.shape {
  position: absolute;
  z-index: 50;
}
</style>