# 云音乐项目

## 知识点

- absolute top bottom 可以自动拉伸高度并固定，数值不同高度也不同
- relative 下的 absolute 不会溢出

- useEffect 在渲染后运行所以肯定可以拿到 ref，ref 可以通过回调函数的参数拿到组件节点来进行处理
- 组件包裹 memo，建议在开发后进行性能测试再处理，所有组件都包裹会徒增性能损耗
- 在将数据变成状态前进行 immer 处理
