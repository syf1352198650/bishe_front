<template>
    <div>
        <el-menu-item v-if="hasChild(props.item.children,item)" :index="props.basePath">
          <span>{{ (state.d as any) ?.meta?.title }}</span>
    </el-menu-item>
  <el-sub-menu v-else :index="props.item.path">
            <template #title>
                <span>{{ props.item?.meta?.title }}</span>
            </template>
            <SlidebarItem 
            v-for="child in item.children"
            :key="child.path"
            :item="child"
            :basePath="child.path"
            ></SlidebarItem>
            
    </el-sub-menu>
   

  
    </div>
</template>


<script lang="ts">

export default {
    name:'SlidebarItem'
}
</script>


<script setup lang="ts">
// import * as path from "path";


import { reactive } from "vue";
interface Iprops{
    basePath:string,
    item:any
}
const props=defineProps<Iprops>()
// console.log(props.item,'props');

const state=reactive({
    d:null
})
const hasChild=(children=[],item:any)=>{
    // console.log(children)
      const showingChildren = children.filter(v => {
          if (!v) {  //判断v中是否存在
          return false //过滤这条数据
        } else {
          state.d = v ;
          return true   //添加这条数据
        }
      });
      if (showingChildren.length ===0) {
        state.d = { ... item };
     
        
        return true;
      }else if (showingChildren.length === 1){ //或者子级长度为1
        
        return true;
      }else {
 
        return false;
      }
    }
 
// const resolvePath=(routePath:string)=> {
  
//       return path.resolve(props.basePath, routePath)
      
//     }


</script>

<style scoped>

</style>