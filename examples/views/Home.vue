<template>
  <div class="container">
    <!-- Hero Section -->
    <div class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">MapVue</span>
          <span class="demo-tag">Demo</span>
        </h1>
        <p class="hero-subtitle">
          探索基于 Vue 3 和 MapboxGL 构建的现代化地图组件库
        </p>
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">50+</div>
            <div class="stat-label">组件</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">TypeScript</div>
            <div class="stat-label">支持</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">Vue 3</div>
            <div class="stat-label">原生</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="nav-bar">
      <div class="nav-content">
        <div class="nav-title">组件演示</div>
        <div class="nav-description">点击下方卡片体验各种地图组件的功能</div>
      </div>
    </div>

    <div class="content">
      <!-- Core Components -->
      <section class="component-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="section-icon">🗺️</span>
            核心组件
          </h2>
          <p class="section-description">地图容器和基础功能组件</p>
        </div>
        <div class="component-grid">
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VMap</h3>
              <span class="card-badge">Core</span>
            </div>
            <p class="card-description">地图容器组件，支持多种投影和交互</p>
            <div class="card-links">
              <router-link to="/vmap/basic" class="demo-link primary">
                <span>基础地图</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
              <router-link to="/vmap/syncmap" class="demo-link">同步地图</router-link>
              <router-link to="/vmap/comparemap" class="demo-link">对比地图</router-link>
              <router-link to="/vmap/flyzoom" class="demo-link">飞行缩放</router-link>
              <router-link to="/vmap/projection" class="demo-link">投影变换</router-link>
            </div>
          </div>
        </div>
      </section>
      <!-- Interactive Components -->
      <section class="component-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="section-icon">🎯</span>
            交互组件
          </h2>
          <p class="section-description">地图标记、弹窗和特效组件</p>
        </div>
        <div class="component-grid">
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VSprite</h3>
              <span class="card-badge">Effect</span>
            </div>
            <p class="card-description">精灵图标管理器</p>
            <div class="card-links">
              <router-link to="/vsprite/basic" class="demo-link primary">
                <span>基础使用</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VMarker</h3>
              <span class="card-badge">Hot</span>
            </div>
            <p class="card-description">自定义地图标记点</p>
            <div class="card-links">
              <router-link to="/vmarker/basic" class="demo-link primary">
                <span>基础标记</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
              <router-link to="/vmarker/withchart" class="demo-link">图表标记</router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VPopup</h3>
              <span class="card-badge">UI</span>
            </div>
            <p class="card-description">信息弹窗组件</p>
            <div class="card-links">
              <router-link to="/vpopup/basic" class="demo-link primary">
                <span>基础弹窗</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
              <router-link to="/vpopup/withchart" class="demo-link">图表弹窗</router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VFog</h3>
              <span class="card-badge">Effect</span>
            </div>
            <p class="card-description">大气雾效果</p>
            <div class="card-links">
              <router-link to="/vfog/basic" class="demo-link primary">
                <span>雾效演示</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VFeatureState</h3>
              <span class="card-badge">State</span>
            </div>
            <p class="card-description">要素状态管理</p>
            <div class="card-links">
              <router-link to="/vfeaturestate/basic" class="demo-link primary">
                <span>状态控制</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </section>
      <!-- Control Components -->
      <section class="component-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="section-icon">🎛️</span>
            控件组件
          </h2>
          <p class="section-description">地图控制和导航组件</p>
        </div>
        <div class="component-grid">
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VAttributionControl</h3>
              <span class="card-badge">Control</span>
            </div>
            <p class="card-description">版权信息控件</p>
            <div class="card-links">
              <router-link to="/vattributioncontrol/basic" class="demo-link primary">
                <span>基础使用</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VNavigationControl</h3>
              <span class="card-badge">Control</span>
            </div>
            <p class="card-description">导航控制按钮</p>
            <div class="card-links">
              <router-link to="/vnavigationcontrol/basic" class="demo-link primary">
                <span>导航控件</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VScaleControl</h3>
              <span class="card-badge">Control</span>
            </div>
            <p class="card-description">比例尺控件</p>
            <div class="card-links">
              <router-link to="/vscalecontrol/basic" class="demo-link primary">
                <span>比例尺</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </section>
      <!-- Data Source Components -->
      <section class="component-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="section-icon">📊</span>
            数据源组件
          </h2>
          <p class="section-description">各种数据格式的数据源支持</p>
        </div>
        <div class="component-grid">
          <div class="component-card large">
            <div class="card-header">
              <h3 class="card-title">VGeoSource</h3>
              <span class="card-badge">Popular</span>
            </div>
            <p class="card-description">GeoJSON 数据源，支持点、线、面和聚合</p>
            <div class="card-links">
              <router-link to="/vsource/vgeosource/point" class="demo-link primary">
                <span>点数据</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
              <router-link to="/vsource/vgeosource/line" class="demo-link">线数据</router-link>
              <router-link to="/vsource/vgeosource/polygon" class="demo-link">面数据</router-link>
              <router-link to="/vsource/vgeosource/cluster" class="demo-link">聚合模式</router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VImageSource</h3>
              <span class="card-badge">Media</span>
            </div>
            <p class="card-description">图片数据源</p>
            <div class="card-links">
              <router-link to="/vsource/vimagesource/basic" class="demo-link primary">
                <span>图片叠加</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VRasterSource</h3>
              <span class="card-badge">Raster</span>
            </div>
            <p class="card-description">栅格瓦片数据源</p>
            <div class="card-links">
              <router-link to="/vsource/vrastersource/basic" class="demo-link primary">
                <span>栅格瓦片</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VRasterDemSource</h3>
              <span class="card-badge">3D</span>
            </div>
            <p class="card-description">DEM 高程数据源</p>
            <div class="card-links">
              <router-link to="/vsource/vrasterdemsource/basic" class="demo-link primary">
                <span>高程数据</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VVectorSource</h3>
              <span class="card-badge">Vector</span>
            </div>
            <p class="card-description">矢量瓦片数据源</p>
            <div class="card-links">
              <router-link to="/vsource/vvectorsource/basic" class="demo-link primary">
                <span>矢量瓦片</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VVideoSource</h3>
              <span class="card-badge">Media</span>
            </div>
            <p class="card-description">视频数据源</p>
            <div class="card-links">
              <router-link to="/vsource/vvideosource/basic" class="demo-link primary">
                <span>视频叠加</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VCanvasSource</h3>
              <span class="card-badge">Canvas</span>
            </div>
            <p class="card-description">Canvas 数据源</p>
            <div class="card-links">
              <router-link to="/vsource/vcanvassource/basic" class="demo-link primary">
                <span>Canvas 图层</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </section>
      <!-- Layer Components -->
      <section class="component-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="section-icon">🎨</span>
            图层组件
          </h2>
          <p class="section-description">丰富的可视化图层类型</p>
        </div>
        <div class="component-grid">
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VBackgroundLayer</h3>
              <span class="card-badge">Basic</span>
            </div>
            <p class="card-description">背景图层</p>
            <div class="card-links">
              <router-link to="/vlayer/vbackgroundlayer/basic" class="demo-link primary">
                <span>背景色</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VCircleLayer</h3>
              <span class="card-badge">Popular</span>
            </div>
            <p class="card-description">圆形点图层</p>
            <div class="card-links">
              <router-link to="/vlayer/vcirclelayer/basic" class="demo-link primary">
                <span>圆形标记</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VFillLayer</h3>
              <span class="card-badge">Area</span>
            </div>
            <p class="card-description">填充面图层</p>
            <div class="card-links">
              <router-link to="/vlayer/vfilllayer/basic" class="demo-link primary">
                <span>区域填充</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VFillExtrusionLayer</h3>
              <span class="card-badge">3D</span>
            </div>
            <p class="card-description">3D 挤压图层</p>
            <div class="card-links">
              <router-link to="/vlayer/vfillextrusionlayer/basic" class="demo-link primary">
                <span>3D 建筑</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VHeatmapLayer</h3>
              <span class="card-badge">Hot</span>
            </div>
            <p class="card-description">热力图图层</p>
            <div class="card-links">
              <router-link to="/vlayer/vheatmaplayer/basic" class="demo-link primary">
                <span>热力图</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VLineLayer</h3>
              <span class="card-badge">Line</span>
            </div>
            <p class="card-description">线条图层</p>
            <div class="card-links">
              <router-link to="/vlayer/vlinelayer/basic" class="demo-link primary">
                <span>线条绘制</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VRasterLayer</h3>
              <span class="card-badge">Raster</span>
            </div>
            <p class="card-description">栅格图层</p>
            <div class="card-links">
              <router-link to="/vlayer/vrasterlayer/basic" class="demo-link primary">
                <span>栅格显示</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VSymbolLayer</h3>
              <span class="card-badge">Symbol</span>
            </div>
            <p class="card-description">符号图层</p>
            <div class="card-links">
              <router-link to="/vlayer/vsymbollayer/basic" class="demo-link primary">
                <span>符号标注</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VHillShadeLayer</h3>
              <span class="card-badge">Effect</span>
            </div>
            <p class="card-description">山体阴影图层</p>
            <div class="card-links">
              <router-link to="/vlayer/vhillshadelayer/basic" class="demo-link primary">
                <span>山体阴影</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
          <div class="component-card">
            <div class="card-header">
              <h3 class="card-title">VSkyLayer</h3>
              <span class="card-badge">Sky</span>
            </div>
            <p class="card-description">天空盒图层</p>
            <div class="card-links">
              <router-link to="/vlayer/vskylayer/basic" class="demo-link primary">
                <span>天空效果</span>
                <svg class="link-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <h3 class="footer-title">MapVue</h3>
          <p class="footer-subtitle">现代化 Vue 地图组件库</p>
        </div>
        <div class="footer-links">
          <a href="https://github.com/timeroute/mapvue" target="_blank" class="footer-link">
            GitHub
          </a>
          <a href="https://mapvue.netlify.app/" target="_blank" class="footer-link">
            文档
          </a>
          <a href="https://www.npmjs.com/package/mapvue" target="_blank" class="footer-link">
            NPM
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2022 MapVue by timeroute. MIT License.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* 基础样式 */
* {
  box-sizing: border-box;
}

.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Hero Section */
.hero {
  padding: 4rem 2rem;
  text-align: center;
  color: white;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.gradient-text {
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.demo-tag {
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Navigation Bar */
.nav-bar {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  text-align: center;
  color: white;
}

.nav-content {
  max-width: 800px;
  margin: 0 auto;
}

.nav-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.nav-description {
  opacity: 0.8;
}

/* Content */
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* Section */
.component-section {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.component-section:hover {
  transform: translateY(-5px);
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.section-icon {
  font-size: 2rem;
}

.section-description {
  color: #6b7280;
  font-size: 1rem;
}

/* Component Grid */
.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.component-grid .large {
  grid-column: span 2;
}

/* Component Card */
.component-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.component-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.component-card:hover::before {
  transform: scaleX(1);
}

.component-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.card-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.card-badge:where([class*="Core"]) {
  background: #dbeafe;
  color: #1d4ed8;
}

.card-badge:where([class*="Hot"]) {
  background: #fef2f2;
  color: #dc2626;
}

.card-badge:where([class*="Popular"]) {
  background: #f0fdf4;
  color: #16a34a;
}

.card-badge:where([class*="Effect"]) {
  background: #fefce8;
  color: #ca8a04;
}

.card-badge:where([class*="UI"]) {
  background: #f3e8ff;
  color: #7c3aed;
}

.card-badge:where([class*="Control"]) {
  background: #f1f5f9;
  color: #475569;
}

.card-badge:where([class*="Media"]) {
  background: #fdf2f8;
  color: #be185d;
}

.card-badge:where([class*="3D"]) {
  background: #ecfdf5;
  color: #059669;
}

.card-badge:where([class*="State"]) {
  background: #eff6ff;
  color: #2563eb;
}

.card-badge:where([class*="Raster"]) {
  background: #fef7ff;
  color: #a21caf;
}

.card-badge:where([class*="Vector"]) {
  background: #f0f9ff;
  color: #0369a1;
}

.card-badge:where([class*="Canvas"]) {
  background: #fefce8;
  color: #a16207;
}

.card-badge:where([class*="Basic"]) {
  background: #f8fafc;
  color: #64748b;
}

.card-badge:where([class*="Line"]) {
  background: #f0fdfa;
  color: #0d9488;
}

.card-badge:where([class*="Area"]) {
  background: #f1f5f9;
  color: #334155;
}

.card-badge:where([class*="Symbol"]) {
  background: #fdf4ff;
  color: #a21caf;
}

.card-badge:where([class*="Sky"]) {
  background: #eff6ff;
  color: #1d4ed8;
}

.card-description {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

/* Card Links */
.card-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.demo-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.demo-link.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
}

.demo-link.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.demo-link:not(.primary) {
  background: #f1f5f9;
  color: #475569;
  border-color: #e2e8f0;
}

.demo-link:not(.primary):hover {
  background: #e2e8f0;
  color: #334155;
  border-color: #cbd5e1;
}

.link-icon {
  width: 16px;
  height: 16px;
}

/* Footer */
.footer {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 3rem 2rem 2rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-brand h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.footer-subtitle {
  opacity: 0.8;
  margin: 0;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-link {
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.footer-link:hover {
  opacity: 1;
}

.footer-bottom {
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  opacity: 0.6;
  font-size: 0.9rem;
}

/* 响应式 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .hero-stats {
    gap: 1.5rem;
  }

  .content {
    padding: 2rem 1rem;
    gap: 2rem;
  }

  .component-section {
    padding: 1.5rem;
  }

  .component-grid {
    grid-template-columns: 1fr;
  }

  .component-grid .large {
    grid-column: span 1;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .card-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 2rem 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .nav-bar {
    padding: 1rem;
  }
}
</style>
