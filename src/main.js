import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './style.css'
import App from './App.vue'
import axios from "axios";
import router from "./router";

const app=createApp(App)

app.config.globalProperties.axios=axios

app.use(router)

app.use(Antd).mount('#app');
