
const intervalTime = 2000;
const allAnimal  = [{
  width: 112,
  height: 220,
  cover: 'http://file.52miniapps.com/group2/M00/7F/19/ChtgeF74X3mAJAfXAAAxNb7tTFU208.png'
}, {
  width: 112,
  height: 136,
  cover: 'http://file.52miniapps.com/group2/M00/7F/1A/ChtgdF74X4GAZTJ6AAAkzuPV1gs671.png'
}]
let backIndexs = [];
Component({
  properties: {
    ifShowAnimal:{
      type: Boolean,
      value: false,
      observer(val){
        if(val){
          this.showFlyAnimation()
        }
      }
    }
  },
  data: {
    collectAnimation: [],
    animals: []
  },
  lifetimes: {
    attached() {
      setInterval(() => {
        const show_animal = allAnimal[parseInt(Math.random()*(allAnimal.length))]
        let animals = this.data.animals;
        animals.push(show_animal);
        this.setData({
          animals
        });
      }, intervalTime);
    }
  },
  methods: {
    animationStart(e) {
    //  console.log('start', e);
    },

    animationEnd(e) {
      if (e.detail.animationName === 'forward') {
        this.setData({
          stopIndex: e.target.dataset.index
        })
        backIndexs.push(e.target.dataset.index);
        setTimeout(() => {
          this.setData({
            backwardIndex: backIndexs.unshift()
          })
        }, 500)
        // console.log(this.data.stopIndex);
      }
   }
  }
})