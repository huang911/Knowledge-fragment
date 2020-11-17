/**
 * 1.3.1 若未完成第三步引导（选择并授权），则进入后从头展示引导
 * 1.3.2 若已完成第三步引导（选择并授权），则进入后展示第四步引导
 * 1.3.3 若已完成第四步引导（点击兑换），则进入后展示第五步引导
 */
import { mall, home } from '../../../routes'
import EventHub from '../../../utils/eventHub'
import { buildPosition, guideText } from '../../../common'
import { getStep, setStep } from '../../../api/guide'
import Cache from '../../../globalData/cache';
import { getCurrentPageComponent } from '../../../api/utils'
const STEP = ['isShowWelecome', 'isShowCollect', 'isShowExchange', 'isShowTask'];

Component({
  properties: {
  
  },
  lifetimes: {
    attached() {
      // 获取引导步骤
      const step = Cache.get('step');
      console.log(step);
      if (+step === 4)return undefined; // 已完成引导
      if (!step && +step !== 0) {
        getStep()
          .then(res => {
            this.judgeGuide(res.step);
          })
          .catch(err => this.judgeGuide(0));
      } else {
        this.judgeGuide(step);
      }
      // 监听引导过程中关闭任务弹框
      this.unscribe = EventHub.listen('closeTaskDialog', () => {
        this.setData({
          isShowUserGift: true
        })
      })
    },
    deattached() {
      const step = Cache.get('step');
      setStep(step);
      this.unscribe();
    }, 
  },
  pageLifetimes: {
    hide() { // 直接杀进程时监听
      const step = Cache.get('step');
      setStep(step);
      this.unscribe();
    }
  },
  data: {
    guideText
  },
  methods: {
    preventScroll() {
      // todo
    },
    /**
     * 判断引导步骤
     * @param {*} finishStep
     */
    judgeGuide(finishStep) {
      // 判断当前展示的弹框引导和页面是不是在同一个页
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const url = `/${currentPage.route}`;
      if (url.includes('/mall') && (!finishStep || +finishStep < 3) && getApp().globalData.entry === 'mall')return; // 从商城分享进来的，当前在首页，做的引导步骤小于4，或者还未做引导
      if (url.includes('/home') && +finishStep === 2) {
        this.setData({
          isShowExchange: true,
          QQVIP: buildPosition[3]
        })
      }
      if (url.includes('/mall') && +finishStep === 2) { // 引导从首页进入商城
        this.setData({
          isShowMallSelect: true,
        })
      } else if(url.includes('/home') && +finishStep === 3) {
        this.setData({
          isShowTask: true,
          task: buildPosition[15] // 心愿馆
        })
      } else {
        const step = +finishStep+1 <= 4 ? STEP[+finishStep] : '';
        this.setData({
          [`${step}`]: true
        })
      }
    },
    // 关闭欢迎弹框 step1
    closeWelcome() {
      this.setData({
        isShowWelcome: false
      }, () => {
        this.setData({
          isShowCollect: true
        })
      })
      Cache.set('step', 1);
    },
    // 关闭收集心愿弹框 step2
    closeCollect() {
      // 由后台下发心愿值
      const houseComponent = getCurrentPageComponent('gameHouse')
      houseComponent.setWishCount(1);
      houseComponent.wishClick();
      Cache.set('step', 2);
      setTimeout(() => {
        this.setData({
          isShowCollect: false
        }, () => {
          this.setData({
            isShowExchange: true,
            QQVIP: buildPosition[3] // 写死QQ会员馆
          })
        })
      }, 1500);
    },
    // 关闭兑换商品弹框 step3
    closeExchange() {
      this.setData({
        isShowExchange: false
      }, ()=> {
        wx.navigateTo({url: mall});
        // getApp().globalData.step = 'isShowMallSelect';
      })
    },
    // 关闭商城引导 step3
    closeMallSelect() {
      this.setData({
        isShowMallSelect: false
      }, () => {
        this.setData({
          isShowMallToast: true
        })
      })
    },
    // 关闭商城引导toast step3
    closeMallToast() {
      this.setData({
        isShowMallToast: false
      }, () => {
        wx.redirectTo({url: home});
        // getApp().globalData.step = 'isShowTask';
      })
      Cache.set('step', 3);
    },
    // 关闭任务中心引导 step4
    closeTask() {
      const taskComponent = getCurrentPageComponent('maskWish');
      this.setData({
        isShowTask: false
      }, () => {
        taskComponent.showMask();
        getApp().globalData.isGuideTask = true;
      })
      Cache.set('step', 4);
      // getApp().globalData.step = '';
    },
    // 关闭新用户礼包
    closeUserGift() {
      this.setData({
        isShowUserGift: false
      })
    }
  }
})
