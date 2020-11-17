```js
import { finishTask } from '../../api/task'
import Toast from '../../utils/toast'
import Cache from '../../globalData/cache';
import TASK from '../../api/task_config';
import { TASK_ERROR } from '../../api/task_status';
import { track } from '../../sensor/courier';
import { delay } from '../../utils/utils'
import { getStallLevelConf } from '../../api/home'
import GUEST from '../../api/guest_type';
import MALL_STATUS from '../../api/mall_status';

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    list: {
      type: Array,
      value: [],
      observer (value, oldValue) {
        if (value.length !== 0 && oldValue.length === 0) {
          this.setData({
            mallList: value
          })
        }
      }
    },
    userToolInfo: {
      type: Object,
      value: {},
      async observer (val) {
        let level = +(val && val.level) || 0 // 吆喝次数
        let { stallConfig } = this.data // 地摊配置
        if (+stallConfig.level == level) { return }
        const STALL_LEVEL = await getStallLevelConf() // 获取地摊等级配置

        if (level == (+stallConfig.level + 1)) {// 地摊升级了
          const [cur, next] = STALL_LEVEL.reduce((acc, cur) =>
            (cur.level == level || (cur.level == (level + 1)))
              ? (acc.push(cur), acc)
              : acc
            , []) // 找出当前等级和下一等级的配置
          let levelConfig = {}
          levelConfig.value = level
          levelConfig.cover = cur.cover2 || cur.cover
          levelConfig.next = next.peddling - cur.peddling
          this.setData({ levelConfig })
          this.toggleUpgradeDialog()
          this.triggerEvent('playUpgradeMusic')
        }

        for (let i = 0; i < STALL_LEVEL.length; i++) {
          if (level >= +STALL_LEVEL[i].level) {
            stallConfig = STALL_LEVEL[i]
          }
        }

        this.setData({ stallConfig })
      }
    }
  },
  data: {
    ifShowShout: false, // 是否展示吆喝动画
    activeRedBag: {}, // 点击的红包信息
    ifShowRedBagDialog: false, // 是否展示红包弹框
    isShowLuckyMan: false, // 是否展示幸运顾客
    isShowUpgrade: false, // 是否显示升级弹窗
    isShowThief: false, // 是否显示小偷
    stallConfig: {}, // 当前地摊配置
    levelConfig: {}, // 升级等级配置
    buyGoodsNum: 1, // 购买的商品数量
  },
  methods: {
    // 更新用户金币
    updateUserAssets (e) {
      const detail = e && e.detail
      this.triggerEvent('updateUserAssets', detail)
    },
    toggleUpgradeDialog () {
      if (this.data.isShowUpgrade) { // 关闭升级弹窗显示升级奖励
        this.triggerEvent('showUpgradeReward')
      }
      this.setData({ isShowUpgrade: !this.data.isShowUpgrade })
    },
    // 显示幸运客人
    showExclaimCustomer (e) {
      const info = e && e.detail
      const { isShowLuckyMan } = this.data
      if (
        !isShowLuckyMan &&
        info.compare_task == TASK.LUCKY_GAME
      ) { // 显示幸运顾客
        this.setData({ isShowLuckyMan: true })
      }
    },
    // 隐藏幸运客人
    hideLuckyMan () {
      this.setData({ isShowLuckyMan: false })
    },
    // 隐藏小偷
    hideThief () {
      this.setData({ isShowThief: false })
    },
    // 驱赶小偷成功
    drivedThief () {
      let { stealMallId, mallList } = this.data
      let [stoleMallItem, idx] = mallList
        .reduce((acc, cur, i) => cur.id == stealMallId
          ? (acc.push([cur, i]), acc) : acc
          , []) // 找出偷了的商品和相应的索引

      if (stoleMallItem) { // 恢复成商品
        // TODO:调用接口恢复商品
        stoleMallItem.status = '1'
        this.setData({ mallList, itemShowIdx: idx })
        setTimeout(() => this.setData({ itemShowIdx: -1 }, 400)) // 重置
      }
    },
    // 偷货品
    stealGoods () {
      let stoleMallItem = this.data.mallList.find(item => item.status == '1') // 找出可偷的商品
      if (stoleMallItem && stoleMallItem.id) {
        this.setData({ stealMallId: stoleMallItem.id })
        this.updateMallStatus(stoleMallItem.id, /*type=steal*/'steal')
      }
    },
    // 收集红包
    collectRedBag (e) {
      this.triggerEvent('playBtnMusic');
      const activeRedBag = e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.item;
      this.setData({
        activeRedBag,
        ifShowRedBagDialog: true
      });
      track('collect_redbag', {
        type: 1,
        cash: activeRedBag.cash
      });
    },
    /**
     * 更新红包状态
     * @param {*} e 
     */
    updateRedBagStatus (e) {
      const { activeRedBag } = e && e.detail;
      this.updateMallStatus(activeRedBag.id, 'collectRedBag');   // 更新商品状态
      this.triggerEvent('addCash', { cash: activeRedBag.cash });
    },
    /**
     * 
     * @param {*} id 商品ID
     * @param {*} type 产生红包or收红包
     */
    async updateMallStatus (id, type) {
      let oldList = JSON.parse(JSON.stringify(this.data.mallList)) // 拷贝旧数据
      let { mallList, buyGoodsNum } = this.data;
      let itemHideIdx = -1 // 需要变成红包的商品id
      let chargeMalls = []; // 土豪客人消耗的商品
      if (type === 'collectRedBag') {
        this.transMallToRedBag(id);
      } else {
        this.transRedBagToHide(id);
      }
      // 土豪客人
      if (id === 'richMan') { // 土豪客人
        let count = 0;
         chargeMalls = mallList.reduce((acc, cur) => (
          type === 'collectRedBag' ? 
          (cur.status == MALL_STATUS.RICH_RED_BAG ? (cur.status = MALL_STATUS.HIDE) : acc) :  // 收红包
          (cur.status == MALL_STATUS.MALL  && count < buyGoodsNum ? 
          (count == 0 ? cur.status = MALL_STATUS.RICH_RED_BAG : cur.status = MALL_STATUS.HIDE , acc.push(cur.id), count++) : acc) // 商品转换为红包
        ), []);
        console.log(chargeMalls);
      } else { // 普通客人或者小偷
        mallList.forEach((item, index) => { 
          if (+item.id === +id) {
            if (type == 'collectRedBag') { // 普通客人收集红包
              item.status = MALL_STATUS.HIDE;
            } else if (type == 'steal') { // 小偷
              itemHideIdx = index
              item.status = MALL_STATUS.HIDE;
            } else { // 普通客人购买商品
              itemHideIdx = index
              item.status = MALL_STATUS.RED_BAG;
            }
          }
        });
      }
      if (itemHideIdx != -1 || chargeMalls.length !== 0) { // 商品进行消失动画
        this.setData({ 
          itemHideIdx,
          chargeMalls
        })
        await delay(380)
      }

      this.setData({
        mallList,
        itemHideIdx: -1,
        chargeMalls: []
      }, () => {
        Cache.set('stallMall', this.data.mallList);
        this.triggerEvent('judgeIfShowBubble', { oldList, list: mallList });
      });
    },
    // 转换商品为红包
    transMallToRedbag(id) {
      if (id === 'richMan') { // 土豪客人
        let count = 0;
        chargeMalls = mallList.reduce((acc, cur) => (
          cur.status == MALL_STATUS.MALL  && count < buyGoodsNum ? 
          (count == 0 ? cur.status = MALL_STATUS.RICH_RED_BAG : cur.status = MALL_STATUS.HIDE , acc.push(cur.id), count++) : acc // 商品转换为红包
        ), []);
        this.showMallDisAnimation(chargeMalls, 'richMan');
      } else {
        let itemHideIdx = -1;
        mallList.forEach((item, index) => { 
          if (+item.id === +id) {
            itemHideIdx = index
            item.status = MALL_STATUS.RED_BAG;
          }
        });
        this.showMallDisAnimation(itemHideIdx);
      }
      return mallList;
    },
    // 更新收红包之后的状态
    transRedbagToHide(id, mallList) {
      mallList.forEach(item => {
        if (+item.id === +id) {
          item.status = MALL_STATUS.HIDE;
        }
      });
      return mallList;
    },
    // 更新小偷偷商品
    updateStealMall(id) {
      let itemHideIdx = -1;
      mallList.forEach(item => {
        if (item.id == id) {
          itemHideIdx = index
          item.status = MALL_STATUS.HIDE;
        }
      })
      this.showMallDisAnimation(itemHideIdx);
      return mallList;
    },
    /**
     * 展示商品消失动画
     * @param {*} val 需要更新的值
     * @param {*} type 小偷偷商品，普通客人购买，土豪客人购买
     */
    async showMallDisAnimation(val, type) {
      const key = type === 'richMan' ? chargeMalls : itemHideIdx;
      this.setData({
        [`${key}`]: val
      });
      await delay(380);
    },
    handleShout (e) {
      const { mallList } = this.data;
      const ifStallEmpty = mallList.some(item => (+item.status === 1 || +item.status === 2)); // status: 0：空， 1:有商品，2:有红包
      const ifShowRedBagToast = mallList.some(item => (+item.status === 2)) && !mallList.some(item => (+item.status === 1));
      if (!ifStallEmpty) { // 无商品，无红包
        this.triggerEvent('openMarket');
        this.triggerEvent('toggleRequestShoutStatus');
        return;
      } else if (ifShowRedBagToast) { // 有红包,无货
        Toast.info('先收取地摊上的红包再来吆喝吧~');
        this.triggerEvent('toggleRequestShoutStatus');
        return;
      } else if (e && e.type == 'freshGuide') {
        this.finishGuideShout()
      } else {
        this.finishShoutTask();
      }
    },
    // 吆喝
    finishShoutTask () {
      return finishTask({ taskId: TASK.SHOUT })
        .then((data) => {
          if (+data.status !== TASK_ERROR) {
            this.triggerEvent('shoutEnd', data)
            this.handleShoutData(data);
          } else {
            Toast.info(data.msg);
          }
        })
        .catch(err => {
          Toast.info(err.msg || '吆喝失败');
        })
    },
    // 新手引导吆喝任务
    finishGuideShout () {
      return finishTask({
        taskId: TASK.FRESH_GUIDE
      })
        .then(info => {
          if (info.status != TASK_ERROR) {
            this.triggerEvent('shoutEnd', info)
            this.handleShoutData(info);
          } else {
            Toast.show(info.msg)
          }
        })
        .catch(err => {
          Toast.info(err.msg || '引导吆喝失败');
        })
    },
    // 处理吆喝后的数据
    handleShoutData (data) {
      const guest = (data && data.extra && data.extra.guest) || GUEST.NORMAL_CUSTOMER;
      if(guest == GUEST.THIEF) { // 小偷
        this.setData({ 
          isShowThief : true
        })
      } else if(guest == GUEST.NORMAL_CUSTOMER || guest == RICH_MAN ) { // 普通客人或者土豪客人
        const clickGoods =  this.data.mallList.find(item => +item.status === 1);
        const { cash = '0.00', goods_num = 1 } = data && data.extra;
        this.data.mallList.forEach(item => {
          if (+clickGoods.id === +item.id) {
            item.cash = cash;
          }
        });
        this.setData({
          animalId: (guest == RICH_MAN) ? 'richMan' : (clickGoods && clickGoods.id),
          // ifShowShout: true,
          mallList: this.data.mallList,
          buyGoodsNum: goods_num // 购买的商品数量
        }, () => {
          Cache.set('stallMall', this.data.mallList);
        });
      }
    },
    shoutAnimationFinish (e) {
      const { id } = e && e.detail;
      if (+id === +this.data.animalId) { // 所有动物动画执行完毕，摊主不再展示吆喝动画
        this.setData({
          ifShowShout: false,
        })
      }
    },
    // 本次进货商品所有消耗完，动物执行完动画
    allShoutFinish () {
      this.setData({
        animalId: ''
      })
    },
    // 进货成功，更新地摊商品
    updateStallMall (list) {
      const oldList = JSON.parse(JSON.stringify(this.data.mallList)) // 拷贝旧数据
      if (list.length && list.length > 0) {
        this.setData({ mallList: list }, () => {
          Cache.set('stallMall', this.data.mallList);
          this.triggerEvent('judgeIfShowBubble', { oldList, list });
        })
      }
    },
    buyGoods (e) {
      const { id } = e && e.detail;
      if (id) {
        this.updateMallStatus(id);
        this.triggerEvent('toggleRequestShoutStatus');
      }
    },
    // 关闭开红包
    closeRedBagDialog () {
      this.setData({
        ifShowRedBagDialog: false
      })
    },
    playBtnMusic () {
      this.triggerEvent('playBtnMusic');
    },
    // 展示摊主吆喝动画
    showStallAnimation() {
      this.setData({
        ifShowShout: true
      })
    }
  }
})
```

