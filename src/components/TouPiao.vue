<template>
  <div class="wrapper">
    <div>
      <a-typography-title :level="2">华东师范大学中国基础教育卓越原创案例展评活动</a-typography-title>
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
            <video style="width:100%; height:100%; object-fit: fill"
                :src="video.url"
                controls
            ></video>
            <p>{{video.organization}}</p>
            <template #actions>
              <div>
                <div><a-radio v-model:checked="checked[video.videoId].value" @click="checked[video.videoId].value=!checked[video.videoId].value">
                  投票<like-outlined key="like" /></a-radio>
                </div>
              </div>
            </template>
          </a-card>
        </a-col>

      </a-row>
    </div>

    <div :style="{ background: 'rgb(190, 200, 200)', padding: '26px 16px 16px' }">
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

    const query = () => {
      axios.get('/api/vote/queryAll')
          .then(response => {
            const data=response.data;
            videos.value=data
          })
    }

    function chooseVote(event,id) {
      checked[id]=!checked[id];
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
              message.error('抱歉,投票出错！',onclose=()=>{
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

      videos,
      voteList
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
  height: 90vh;
  width: 100vw;
  margin: auto;
}
</style>