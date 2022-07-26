<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { accessToken } from "../../../utils/mapUtil";

const canvasRef = ref();
const state = reactive({
  animate: false,
});

class Circle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  color: string;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    dx: number,
    dy: number,
    radius: number,
    color: string
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
  }

  update() {
    if (this.x + this.radius > 400 || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > 400 || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

watch(canvasRef, () => {
  console.log(canvasRef.value);

  const canvas = canvasRef.value.canvas;
  const ctx = canvas.getContext("2d");
  const circles: Circle[] = [];
  const radius = 20;

  for (let i = 0; i < 5; i++) {
    const color =
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    const x: number = Math.random() * (400 - radius * 2) + radius;
    const y: number = Math.random() * (400 - radius * 2) + radius;

    const dx: number = (Math.random() - 0.5) * 2;
    const dy: number = (Math.random() - 0.5) * 2;

    circles.push(new Circle(ctx, x, y, dx, dy, radius, color));
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, 400, 400);

    for (let r = 0; r < 5; r++) {
      circles[r].update();
    }
  }

  animate();
});
</script>

<template>
  <div class="container">
    <v-map
      :accessToken="accessToken"
      :options="{
        zoom: 5,
        minZoom: 4,
        center: [95.8991, 18.0887],
      }"
    >
      <v-canvas-source
        id="tiles"
        ref="canvasRef"
        :animate="state.animate"
        :coordinates="[
          [91.4461, 21.5006],
          [100.3541, 21.5006],
          [100.3541, 13.9706],
          [91.4461, 13.9706],
        ]"
      />
      <v-raster-layer id="tiles" source="tiles" />
    </v-map>
    <div class="control">
      <button @click="state.animate = !state.animate">动画</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
}
.control {
  position: absolute;
  right: 0;
  top: 0;
  margin: 12px;
}
</style>
