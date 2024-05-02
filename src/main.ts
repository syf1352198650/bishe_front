import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/index.css'
import { createPinia} from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "./permission"
const app = createApp(App)

import './assets/scss/base/main.scss'
import SvgIcon from './components/svg-icon/index.vue'
import ECharts from 'vue-echarts'
import { use as EchartsUse } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart, MapChart, EffectScatterChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, GeoComponent } from 'echarts/components';

EchartsUse([
    CanvasRenderer,
    BarChart, LineChart, PieChart, MapChart, EffectScatterChart,
    GridComponent, TooltipComponent, LegendComponent, GeoComponent,
])

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('svg-icon', SvgIcon)
app.component('echarts', ECharts)
app.use(ElementPlus).use(createPinia()).use(router).mount('#app')
