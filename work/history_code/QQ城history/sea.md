```css
/* @keyframes sea-forward-first{
  25% {
​    top: -60rpx;
  }
  50% {
​    top: -50rpx;
  }
  75% {
​    top: -40rpx;
  }
  100% {
​    top: -30rpx;
​    display: none;
  }
}
@keyframes sea-forward-second {
  25% {
​    top: -90rpx;
  }
  50% {
​    top: -60rpx;
  }
  75% {
​    top: -40rpx;
  }
  100% {
​    top: -30rpx;
​    display: none;
  }
} */
```

1.动画开始时事件：animationStart

2.动画重复运动事件： animationIteration

3.动画结束事件：animationEnd

```
@keyframes sea-forward-first {
  0% {
    top: -50rpx;
    z-index: 10;
  }
  25% {
    top: -30rpx;
    z-index: 10;
  }
  50% {
    top: -50rpx;
    z-index: 11;
  }
  75%{
    top: -70rpx;
    z-index: 11;
  }
  100% {
    top: -90rpx;
    z-index: 11;
  }
}
@keyframes sea-forward-second {
  0%  {
    top: -90rpx;
    z-index: 11;
  }
  25% {
    top: -70rpx;
    z-index: 11;
  }
  50% {
    top: -50rpx;
    z-index: 10;
  }
  75% {
    top: -30rpx;
    z-index: 10;
  }
  100% {
    top: -50rpx;
    z-index: 10;
  }
}
```

```
@keyframes sea-forward-first {
  0% {
    top: -90rpx;
    /* z-index: 8; */
    z-index: 9;
    opacity: 0.7;
  }
  12% {
    top: -70rpx;
    /* z-index: 8; */
    z-index: 9;
    opacity: 0.9;
  }
  24% {
    top: -50rpx;
    /* z-index: 8; */
    z-index: 9;
  }
  /* 消失 */
  36% {
    top: -70rpx;
    z-index: 6;
    /* opacity: 0.1; */
  }
  60% {
    top: -110rpx;
    z-index: 6;
  }
  84% {
    top: -150rpx;
    z-index: 6;
  }
  90% {
    top: -120rpx;
    z-index: 8;
    opacity: 0.1;
  }
  100% {
    top: -90rpx;
    z-index: 8;
    opacity: 0.7;
  }
}
@keyframes sea-forward-second {
  0% {
    top: -150rpx;
    /* z-index: 9; */
    z-index: 8;
    opacity: 0.7;
  }
  14% {
    top: -130rpx;
    /* z-index: 9; */
    z-index: 8;
    opacity: 0.9;
  }
  42% {
    top: -90rpx;
    /* z-index: 8; */
    z-index: 8;
  }
  70% {
    top: -50rpx;
    /* z-index: 8; */
    z-index: 8;
  }
  /* 消失 */
  84% {
    top: -70rpx;
    z-index: 6;
    /* opacity: 0.1; */
  }
  90% {
    top: -110rpx;
    z-index: 6;
    /* opacity: 0; */
  }
  100% {
    top: -150rpx;
    z-index: 8;
    opacity: 0.7;
  }
}
.sea-wave-bg {
  position: fixed;
  left: 0;
  top: -30rpx;
  z-index: 7;
  width: 100%;
}
.sea-wave-first {
  position: fixed;
  left: 0;
  /* top: -90rpx; */
  /* z-index: 8; */
  width: 100%;
  animation: sea-forward-first infinite 20s linear;
}
.sea-wave-second {
  position: fixed;
  left: 0;
  /* top: -150rpx; */
  /* z-index: 9; */
  width: 100%;
  animation: sea-forward-second infinite 15s linear;
}

```

