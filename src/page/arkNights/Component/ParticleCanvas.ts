import LogoImg from './LogoImg';
import Particle from './Particle';

// 画布类
class ParticleCanvas {
  canvasEle: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  ParticleArr: Particle[];
  mouseX?: number; // 鼠标X轴位置
  mouseY?: number; // 鼠标Y轴位置
  animateTime: number;
  context: CanvasRenderingContext2D | null;
  constructor(
    target: HTMLCanvasElement,
    animateTime: number,
    context: CanvasRenderingContext2D | null
  ) {
    // 设置画布 获取画布上下文
    this.canvasEle = target;
    this.ctx = target.getContext('2d') as CanvasRenderingContext2D;
    this.width = target.width;
    this.height = target.height;
    this.ParticleArr = [];
    this.context = context;
    // 监听鼠标移动
    this.canvasEle.addEventListener('mousemove', (e) => {
      const { left, top } = this.canvasEle.getBoundingClientRect();
      const { clientX, clientY } = e;
      this.mouseX = clientX - left;
      this.mouseY = clientY - top;
    });
    this.canvasEle.onmouseleave = () => {
      this.mouseX = 0;
      this.mouseY = 0;
    };
    this.animateTime = animateTime;
  }
  // 改变图片 如果已存在图片则根据情况额外操作
  changeImg(img: LogoImg) {
    if (this.ParticleArr.length) {
      // 获取新旧两个粒子数组与它们的长度
      let newPrtArr = img.particleData;
      let newLen = newPrtArr.length;
      let arr = this.ParticleArr;
      let oldLen = arr.length;
      // 调用change修改已存在粒子
      for (let idx = 0; idx < newLen; idx++) {
        const { totalX, totalY, color } = newPrtArr[idx];
        if (arr[idx]) {
          // 找到已存在的粒子 调用change 接收新粒子的属性
          arr[idx].change(totalX, totalY, color);
        } else {
          // 新粒子数组较大 生成缺少的粒子
          arr[idx] = new Particle(
            totalX,
            totalY,
            this.animateTime,
            color,
            this.width,
            this.height,
            this.context
          );
        }
      }
      // 新粒子数组较小 删除多余的粒子
      if (newLen < oldLen) this.ParticleArr = arr.splice(0, newLen);
      arr = this.ParticleArr;
      let tmp_len = arr.length;
      // 随机打乱粒子最终对应的位置 使切换效果更自然
      while (tmp_len) {
        // 随机的一个粒子 与 倒序的一个粒子
        let randomIdx = ~~(Math.random() * tmp_len--);
        let randomPrt = arr[randomIdx];
        let { totalX: tx, totalY: ty, color } = randomPrt;
        // 交换目标位置与颜色
        randomPrt.totalX = arr[tmp_len].totalX;
        randomPrt.totalY = arr[tmp_len].totalY;
        randomPrt.color = arr[tmp_len].color;
        arr[tmp_len].totalX = tx;
        arr[tmp_len].totalY = ty;
        arr[tmp_len].color = color;
      }
    } else {
      this.ParticleArr = img.particleData.map(
        (item) =>
          new Particle(
            item.totalX,
            item.totalY,
            this.animateTime,
            item.color,
            this.width,
            this.height,
            this.context
          )
      );
    }
  }
  drawCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ParticleArr.forEach((particle) => {
      particle.update(this.mouseX, this.mouseY);
      particle.draw();
    });
    window.requestAnimationFrame(() => this.drawCanvas());
  }
}
export default ParticleCanvas;
