<template>
  <div class="demo-layout">
    <!-- Header with Back Button -->
    <header class="demo-header">
      <div class="header-content">
        <button @click="goBack" class="back-button">
          <svg class="back-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd" />
          </svg>
          <span>返回首页</span>
        </button>

        <div class="demo-info">
          <h1 class="demo-title">{{ pageTitle }}</h1>
          <div class="demo-breadcrumb">
            <router-link to="/" class="breadcrumb-link">MapVue Demo</router-link>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">{{ pageTitle }}</span>
          </div>
        </div>

        <div class="header-actions">
          <a href="https://github.com/timeroute/mapvue" target="_blank" class="github-link" title="查看源码">
            <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          <button @click="toggleFullscreen" class="fullscreen-button" title="全屏">
            <svg v-if="!isFullscreen" class="fullscreen-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                clip-rule="evenodd" />
            </svg>
            <svg v-else class="fullscreen-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zM12 8a1 1 0 012 0v4a1 1 0 11-2 0V8z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Demo Content -->
    <main class="demo-content">
      <router-view />
    </main>

    <!-- Footer with Quick Actions -->
    <footer class="demo-footer">
      <div class="footer-content">
        <div class="quick-actions">
          <button @click="refreshDemo" class="action-button" title="刷新演示">
            <svg class="action-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clip-rule="evenodd" />
            </svg>
            <span>刷新</span>
          </button>

          <router-link to="/" class="action-button" title="返回首页">
            <svg class="action-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>首页</span>
          </router-link>
        </div>

        <div class="demo-meta">
          <span class="component-name">{{ componentName }}</span>
          <span class="separator">•</span>
          <span class="last-updated">MapVue {{ version }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isFullscreen = ref(false)

// 计算页面标题和组件名称
const pageTitle = computed(() => {
  const name = route.name as string
  const titleMap: Record<string, string> = {
    'BasicVMap': '基础地图',
    'Projection': '投影变换',
    'CompareMap': '对比地图',
    'SyncMap': '同步地图',
    'VMapFlyZoom': '飞行缩放',
    'BasicFog': '雾效演示',
    'BasicMarker': '基础标记',
    'MarkerWithChart': '图表标记',
    'VPopupBasic': '基础弹窗',
    'VPopupWithChart': '图表弹窗',
    'VFeatureStateBasic': '状态控制',
    'VSpriteBasic': '精灵图标',
    'VAttributionControlBasic': '版权控件',
    'VNavigationControlBasic': '导航控件',
    'VScaleControlBasic': '比例尺控件',
    'GeoSourcePoint': '点数据源',
    'GeoSourceLine': '线数据源',
    'GeoSourcePolygon': '面数据源',
    'GeoSourceCluster': '聚合数据源',
    'RasterSourceBasic': '栅格数据源',
    'RasterDemSourceBasic': 'DEM数据源',
    'ImageSourceBasic': '图片数据源',
    'VideoSourceBasic': '视频数据源',
    'CanvasSourceBasic': 'Canvas数据源',
    'VectorSourceBasic': '矢量数据源',
    'BackgroundLayerBasic': '背景图层',
    'HillshadeLayerBasic': '山体阴影图层',
    'FillLayerBasic': '填充图层',
    'FillExtrusionLayerBasic': '3D挤压图层',
    'LineLayerBasic': '线条图层',
    'CircleLayerBasic': '圆形图层',
    'HeatmapLayerBasic': '热力图图层',
    'RasterLayerBasic': '栅格图层',
    'SymbolLayerBasic': '符号图层',
    'SkyLayerBasic': '天空图层',
  }
  return titleMap[name] || name
})

const componentName = computed(() => {
  const path = route.path
  const segments = path.split('/').filter(Boolean)
  // 提取最后的组件类型，如 vmap, vmarker 等
  if (segments.length >= 2) {
    return segments[segments.length - 2]
  }
  return 'Component'
})

const version = ref('2.0.0')

// 返回首页
const goBack = () => {
  router.push('/')
}

// 刷新演示
const refreshDemo = () => {
  window.location.reload()
}

// 全屏切换
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

// 监听全屏状态变化
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})
</script>

<style scoped>
.demo-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f8fafc;
}

/* Header */
.demo-header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  position: relative;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  min-width: fit-content;
}

.back-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.back-icon {
  width: 16px;
  height: 16px;
}

.demo-info {
  flex: 1;
  text-align: center;
  min-width: 0;
}

.demo-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.demo-breadcrumb {
  font-size: 0.875rem;
  color: #6b7280;
}

.breadcrumb-link {
  color: #667eea;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: #764ba2;
}

.breadcrumb-separator {
  margin: 0 0.5rem;
}

.breadcrumb-current {
  color: #374151;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.github-link,
.fullscreen-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #f1f5f9;
  color: #475569;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.github-link:hover,
.fullscreen-button:hover {
  background: #e2e8f0;
  color: #334155;
}

.github-icon,
.fullscreen-icon {
  width: 20px;
  height: 20px;
}

/* Content */
.demo-content {
  flex: 1;
  position: relative;
  overflow: hidden;
}

/* 确保地图组件占满整个内容区域 */
.demo-content :deep(.container) {
  height: 100%;
  width: 100%;
}

.demo-content :deep(v-map) {
  height: 100%;
  width: 100%;
}

/* Footer */
.demo-footer {
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 0.75rem 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quick-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f8fafc;
  color: #475569;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.action-button:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #334155;
}

.action-icon {
  width: 16px;
  height: 16px;
}

.demo-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.component-name {
  font-weight: 500;
  color: #374151;
}

.separator {
  color: #d1d5db;
}

/* 响应式 */
@media (max-width: 768px) {
  .header-content {
    padding: 0.75rem 1rem;
    flex-wrap: wrap;
  }

  .demo-info {
    order: 1;
    width: 100%;
    margin: 0.5rem 0;
  }

  .back-button {
    order: 0;
  }

  .header-actions {
    order: 2;
  }

  .footer-content {
    padding: 0 1rem;
    flex-direction: column;
    gap: 0.75rem;
  }

  .quick-actions {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .back-button span {
    display: none;
  }

  .demo-title {
    font-size: 1.125rem;
  }

  .action-button span {
    display: none;
  }
}
</style>