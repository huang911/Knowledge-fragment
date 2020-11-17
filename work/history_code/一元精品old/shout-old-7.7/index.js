
const ANIMAL_SPEED = 36; // 定义动物的速度为54px/s;
const ANIMAL_W = 56; // 动物自身的宽度为56px;
let animationEndCount = 0; // 对动画结束进行计数；

Component({
  properties: {
    ifShowShout:{
      type: Boolean,
      value: false,
      observer(val){
        if(val){
          wx.nextTick(() => {
            this.showShoutAnimation()
          });
        }
      }
    }
  },
  data: {

  },
  lifetimes: {
    attached() {
      
    }
  },
  methods: {
    showShoutAnimation() {
      const leftTopAnimation = this.getAnimation().left(80).step({duration: (80+ANIMAL_W)/ANIMAL_SPEED*1000});
      const rightTopAnimation = this.getAnimation().right(30).step({duration: (30+ANIMAL_W)/ANIMAL_SPEED*1000});
      const leftBottomAnimation = this.getAnimation().left(30).step({duration: (30+ANIMAL_W)/ANIMAL_SPEED*1000});
      this.setData({
        leftTopAnimation: leftTopAnimation.export(),
        rightTopAnimation: rightTopAnimation.export(),
        leftBottomAnimation: leftBottomAnimation.export()
      })
    },
    getAnimation() {
      return wx.createAnimation({
        timingFunction: 'linear',
      })
    },
    animationEnd(e) {
      const { id }= e.target;
      animationEndCount++;
      if (animationEndCount <= 3) {
        this.showBackAnimation(id);
      } else if (animationEndCount === 6) { // 三个动物的吆喝动画已执行结束
        this.triggerEvent('shoutAnimationFinish');
        
      }
    },
    showBackAnimation(id) {
      let direction = 1; // 1:x轴正方向，-1：x轴负方向
      if (id === 'right-top')direction = -1
      this.selectComponent(`#${id}`).showBounceRedBag(direction);
      setTimeout(() => {
        const { screenWidth } = getApp().globalData.systemInfo;
        const leftTopAnimation = this.getAnimation().left(screenWidth+ANIMAL_W).step({duration: (screenWidth+ANIMAL_W-80)/ANIMAL_SPEED*1000});
        const rightTopAnimation = this.getAnimation().right(screenWidth+ANIMAL_W).step({duration: (screenWidth+ANIMAL_W-30)/ANIMAL_SPEED*1000});
        const leftBottomAnimation = this.getAnimation().left(-ANIMAL_W).step({duration: (ANIMAL_W+30)/ANIMAL_SPEED*1000});
        switch(id) {
          case 'left-top':
            this.setData({
              leftTopAnimation
            });
            break;
          case 'right-top':
            this.setData({
              rightTopAnimation
            });
            break;
          case 'left-bottom':
            this.setData({
              leftBottomAnimation
            });
            break;
          default: break;
        }
      }, 2000);
    }
  }
})