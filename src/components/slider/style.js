import styled from 'styled-components'
import style from '../../assets/global-style'

// .before  top: -300px; 背景上移导致下拉还可以有背景，但是因为轮播图和列表的容器是固定高度且父元素relative阻止溢出，所以背景不会溢出，上方头部上拉仍然没有背景
export const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  .before {
    position: absolute;
    top: -300px;
    height: 400px;
    width: 100%;
    background: ${style['theme-color']};
  }
  .slider-container {
    position: relative;
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;
    .slider-nav {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }
    .swiper-pagination-bullet-active {
      background: ${style['theme-color']};
    }
  }
`
