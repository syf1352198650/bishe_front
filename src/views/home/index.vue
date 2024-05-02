<template>
  <div class="page-index">
      <div class="page-head">
          <h2 class="title">贷款统计</h2>
          <com-time></com-time>
      </div>
      <div class="page-main">
          <div class="column">
              <com-panel title="学院分布">
                  <chart1></chart1>
              </com-panel>
              <com-panel title="贷款数变化">
                  <chart2></chart2>
              </com-panel>
              <com-panel title="年级分布">
                  <chart3></chart3>
              </com-panel>
          </div>
          <div class="column column-middle">
              <com-panel class="middle-top">
                  <div class="item">
                      <div class="num">135800</div>
                      <div>贷款总数</div>
                  </div>
                  <div class="item">
                      <div class="num">158800</div>
                      <div>未完成贷款项</div>
                  </div>
              </com-panel>
              <div class="map-box">
                  <div class="map1"></div>
                  <div class="map2"></div>
                  <div class="map3"></div>
                  <chartMap></chartMap>
              </div>
          </div>
          <div class="column">
              <com-panel title="风险等级总计">
                  <chart4></chart4>
              </com-panel>
              <com-panel title="研究生贷款数变化">
                  <chart5></chart5>
              </com-panel>
              <com-panel title="地区分布">
                  <chart6></chart6>
              </com-panel>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import chart1 from './components/chart1.vue'
import chart2 from './components/chart2.vue'
import chart3 from './components/chart3.vue'
import chart4 from './components/chart4.vue'
import chart5 from './components/chart5.vue'
import chart6 from './components/chart6.vue'
import chartMap from './components/chartMap.vue'
import comTime from '@/components/com-time/index.vue'
import comPanel from '@/components/com-panel/index.vue'

</script>

<style lang="scss" scoped>
@import './assets/scss/index/index.scss';
</style>
