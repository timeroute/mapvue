<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, reactive, ref } from "vue";

const chartRef = ref();
const chart = ref();
const state = reactive({
  text: "sdfasdf",
});

onMounted(() => {
  setInterval(() => {
    state.text = Math.random() * 100;
  }, 1000);
  chart.value = echarts.init(chartRef.value, null, {
    width: 400,
    height: 400,
    renderer: "svg",
  });
  chart.value.setOption({
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  });
});

onUnmounted(() => {
  if (chart.value) chart.value.dispose();
});
</script>

<template>
  <div ref="chartRef" />
  <div style="color: red; font-size: 2em">
    <h2>{{ state.text }}</h2>
  </div>
</template>
