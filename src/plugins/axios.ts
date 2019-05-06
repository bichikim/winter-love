import {Context} from '@/types/project'
import axios from 'axios'
import Vue from 'vue'

export interface AxiosOptions {
  baseURL
}

export default <A, S, V extends Vue = Vue>(
  context: Context<A, S, V>,
  options: AxiosOptions,
) => {
  const {baseURL} = options
  const {app} = context
  app.axios = axios.create({
    baseURL,
  })
  return context
}
