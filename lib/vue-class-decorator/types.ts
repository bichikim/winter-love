import Vue from 'vue'
export type VueClass = { new (...args: any[]): Vue } & typeof Vue

export type TDecoratorFactoryRunner = (target: any, key: string, ...args: any[]) => void
