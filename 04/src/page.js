// 懒加载

import(/* webpackChunkName: 'pageA' */ './subPageA').then((subPageA)=> {
  console.log(subPageA);
})

import(/* webpackChunkName: 'pageB' */ './subPageB').then((subPageB)=> {
  console.log(subPageB);
})

// import * as _ from 'lodash'
import(/* webpackChunkName: 'lodash' */ 'lodash').then((_)=>{
  console.log(_.join('2', '6'));
})

export default 'page'
