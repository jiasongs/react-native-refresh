'use strict';

export default {
  Idle: 'Idle' /** 普通闲置状态 */,
  Pulling: 'Pulling' /** 松开就可以进行刷新的状态 */,
  Refreshing: 'Refreshing' /** 正在刷新中的状态 */,
  End: 'End' /** 结束刷新，但还没有执行完重置动画 */,
};
