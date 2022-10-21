<template>
  <div class="wrapper">
    <div>
      <a-typography-title :level="2">中国基础教育卓越原创案例展评活动</a-typography-title>
    </div>

    <div style="background-color: #ececec; padding: 10px;height: 500px;overflow: scroll" ref="shipin" class="shipin">
      <a-row :gutter="[8,12]" type="flex" justify="space-around" align="middle">

        <a-col :lg="12" :sm="8" v-for="video in videos" :key="video.videoId">
          <!--  图标组号  -->
          <a-badge
              :count="video.videoId"
              :number-style="{
                  backgroundColor: '#fff',
                  color: '#52c41a',
                  boxShadow: '0 0 0 1px #d9d9d9 inset',
                }"
          />
          <a-card :title="video.description" :bordered="false">
            <video style="opacity:0.99;width:100%; height:100%; object-fit: fill"
                controls
                   preload="auto"
            >
              <source :src="video.url"  type="video/mp4"/>
            </video>
            <p>{{video.organization}}</p>
            <template #actions>
              <div>
                <div><a-radio v-model:checked="checked[video.videoId].value" @click="chooseVote(video.videoId)">
                  投票<like-outlined key="like" /></a-radio>
                </div>
              </div>
            </template>
          </a-card>
        </a-col>

      </a-row>
    </div>

    <div :style="{ background: 'rgb(190, 200, 200)', padding: '26px 16px 16px' }">
      <div style="margin-bottom: 10px"><a-tag color="#f50">请选择5-15项 已选择{{selected}}项</a-tag></div>
      <a-button type="primary" ghost @click="clearChoose">清空选择</a-button>
    </div>

    <div :style="{ background: 'rgb(190, 200, 200)', padding: '10px 16px 16px' }">
      <a-button type="primary" ghost @click="postVote">提交投票结果</a-button>
    </div>
  </div>
</template>

<script>
import { LikeOutlined } from '@ant-design/icons-vue';
import {defineComponent, ref,reactive} from 'vue';
import BScroll from 'better-scroll'
import {onMounted} from "vue";
import axios from "axios";
import { message } from 'ant-design-vue';

export default defineComponent({
  name: "toupiao",
  components: {
    LikeOutlined,
  },
  setup() {
    const checked = reactive([])
    // const state = reactive([ref(false)])
    const videos=ref([]);
    const scroll=ref({})
    const voteList=ref([])
    let selected=ref(0)

    const query = () => {
      axios.get('/api/vote/queryAll')
          .then(response => {
            const data=response.data;
            videos.value=data
          })
    }

    const chooseVote=(id)=>{
      if(checked[id].value){
        checked[id].value=!checked[id].value;
        selected.value--;
      }else {
        checked[id].value=!checked[id].value;
        selected.value++;
      }
    }

    const clearChoose = () => {
      for(let i=1;i<=71;i++){
        if (checked[i].value==true){
          checked[i].value=false
        }
      }
      selected.value=0
    }

    const postVote=()=>{
      for(let i=1;i<=71;i++){
        if (checked[i].value){
          voteList.value.push(i);
        }
      }
      let votes=voteList.value
      if (votes.length==0){
        voteList.value=[]
        message.warning('请选择要投票的作品');
        return
      }else if(votes.length<5 || votes.length>15){
        message.warning('请选择5-15个作品进行投票');
        return;
      }

      axios.post('/api/vote/singleVote',votes)
          .then((res)=>{
            const data = res.data;
            voteList.value=[]
            if(data=='ok'){
              message.success('投票成功,感谢参与！',onclose=()=>{
                location.reload()
              });
            }else{
              message.error('抱歉,无法重复投票！',onclose=()=>{
                location.reload()
              });
            }
          })
    }

    onMounted(() => {
      query()
      for (let i=0;i<=71;i++){
        checked.push(ref(false))
      }
    })

    return {
      checked,
      chooseVote,
      postVote,
      clearChoose,

      videos,
      voteList,
      selected
    };
  },
})
</script>

<style scoped>
/* For demo */
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}

.wrapper{
  height: 100vh;
  width: 100vw;
  margin: auto;
}
</style>