<template>
  <div class="container">
    <div class="header">
      <div class="title">MapVue Demo</div>
    </div>
    <div class="content">
      <section>
        <div class="title">核心组件</div>
        <div class="item">VMap</div>
        <div class="subitem">
          <router-link to="/vmap/basic">Basic VMap</router-link>
          <router-link to="/vmap/event">With Event</router-link>
        </div>
      </section>
      <section>
        <div class="title">通用组件</div>
        <div class="item">VSprite</div>
        <div class="subitem">
          <router-link to="/vsprite/basic">Basic</router-link>
        </div>
        <div class="item">VMarker</div>
        <div class="subitem">
          <router-link to="/vmarker/basic">Basic</router-link>
        </div>
        <div class="item">VPopup</div>
        <div class="subitem">
          <router-link to="/vpopup/basic">Basic</router-link>
        </div>
      </section>
      <section>
        <div class="title">控件组件</div>
        <div class="item">VAttributionControl</div>
        <div class="subitem">
          <router-link to="/vattributioncontrol/basic">Basic</router-link>
        </div>
        <div class="item">VNavigationControl</div>
        <div class="subitem">
          <router-link to="/vnavigationcontrol/basic">Basic</router-link>
        </div>
        <div class="item">VScaleControl</div>
        <div class="subitem">
          <router-link to="/vscalecontrol/basic">Basic</router-link>
        </div>
      </section>
      <section>
        <div class="title">数据源组件</div>
        <div class="item">VGeoSource</div>
        <div class="subitem">
          <router-link to="/vsource/vgeosource/point">Point</router-link>
          <router-link to="/vsource/vgeosource/line">Line</router-link>
          <router-link to="/vsource/vgeosource/polygon">Polygon</router-link>
        </div>
        <div class="item">VImageSource</div>
        <div class="subitem">
          <router-link to="/vsource/vimagesource/basic">Basic</router-link>
        </div>
        <div class="item">VRasterSource</div>
        <div class="subitem">
          <router-link to="/vsource/vrastersource/basic">Basic</router-link>
        </div>
        <div class="item">VRasterDemSource</div>
        <div class="subitem">
          <router-link to="/vsource/vrasterdemsource/basic">Basic</router-link>
        </div>
        <div class="item">VVectorSource</div>
        <div class="subitem">
          <router-link to="/vsource/vvectorsource/basic">Basic</router-link>
        </div>
        <div class="item">VVideoSource</div>
        <div class="subitem">
          <router-link to="/vsource/vvideosource/basic">Basic</router-link>
        </div>
      </section>
      <section>
        <div class="title">图层组件</div>
        <div class="item">VBackgroundLayer</div>
        <div class="item">VCircleLayer</div>
        <div class="item">VFillLayer</div>
        <div class="item">VFillExtrusionLayer</div>
        <div class="item">VHeatmapLayer</div>
        <div class="item">VLineLayer</div>
        <div class="item">VRasterLayer</div>
        <div class="item">VSymbolLayer</div>
        <div class="item">VHillShade</div>
        <div class="subitem">
          <router-link to="/vlayer/vhillshadelayer/basic">Basic</router-link>
        </div>
      </section>
    </div>
    <div class="footer">MapVue @ timeroute 2022</div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  background-color: #f6f6f6;
}
.header {
  height: 64px;
  line-height: 64px;
  padding: 0 24px;
  background-color: white;
  box-shadow: 0 0 16px #ccc;
}
.header .title {
  font-size: 1.2em;
}
.content {
  padding: 24px 0;
  margin: 24px;
  background-color: white;
  box-shadow: 0 0 16px #ccc;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.content section {
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.content section .title {
  margin-bottom: 12px;
  font-size: 1.1em;
}
.content section .subitem {
  padding-left: 24px;
  display: flex;
  flex-direction: column;
}
.footer {
  background-color: white;
  padding: 12px 24px;
  font-size: 0.9em;
  color: #999;
  text-align: center;
}
</style>
