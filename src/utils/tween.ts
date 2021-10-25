import { TWEEN_ANIMATION, TWEEN_DELAY } from '@/utils/duration';

// 动画函数
const tween = ( // eslint-disable-line
  startValue: number = 0, endValue: number = 20000000, updateValue: Function,
) => {
  import(/* webpackChunkName: "es6-tween" */ 'es6-tween').then(({ Tween, update }) => {
    // 创建变更函数
    function animate() {
    /**
     *  Tween 的 update 返回一个 bool 值
     *  true 代表动画还在执行中
     *  false 代表动画已经结束
     */
      if (update()) {
      /**
       *  要求浏览器在下次重绘之前调用指定的回调函数更新动画。
       *  requestAnimationFrame 函数是浏览器专门为动画提供的 Api , 使其动画变得更佳的连贯
       */
        requestAnimationFrame(animate);
      }
    }
    // 创建 Tween 实例
    const tweenobj = new Tween({ tweeningValue: startValue })
      .to({ tweeningValue: endValue }, TWEEN_ANIMATION)
      .on('update', () => { // 监听变更
        updateValue(tweenobj); // update 函数执行后,会重新返回处理完后的数据到 tweenobj
      })
      .delay(TWEEN_DELAY)
      .start();

    // 执行动画
    animate();
  });
};

export default tween;
