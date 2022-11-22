import { FC, useEffect, useRef, useState } from "react";
import LogoImg from "./Component/LogoImg";
import ParticleCanvas from "./Component/ParticleCanvas";
import styles from './index.module.scss'

const ArkNights: FC = () => {
  // 准备logo数据
  const [logos] = useState([
    { label: "kazimierz", url: "/src/assets/logo_kazimierz.png" },
    // { label: "rhine", url: "/src/assets/logo_rhine.png" },
    // { label: "rhodes", url: "/src/assets/logo_rhodes.png" },
    { label: "victoria", url: "/src/assets/logo_victoria.png" },
    // { label: "yan", url: "/src/assets/logo_yan.png" },
  ]);
  // 标记激活logo
  let activeLogo = useRef<{ name: string; src: string }>();
  // 获取canvas画布
  const canvas = useRef<HTMLCanvasElement | null>(null);
  // 获取上下文
  let context = useRef<CanvasRenderingContext2D | null>(null);
  /** canvas实体对象 */
  let particleCanvas = useRef<ParticleCanvas>();
  // 设置画布大小
  const width = 400;
  const height = 400;
  // 设置粒子动画时长
  const animateTime = 30;
  // const [logoImgs, setLogoImgs] = useState<LogoImg[]>([])
  const logoImgs: LogoImg[] = []
  if (context.current) {
    for (let item of logos) {
      logoImgs.push(new LogoImg(item.url, item.label, animateTime, width, height, context.current))
    }
  }
  // 激活logo
  function clickLogo(logoItem: LogoImg, prt_canvas?: ParticleCanvas) {
    if (prt_canvas) prt_canvas.changeImg(logoItem);
    activeLogo.current = logoItem;
  }
  useEffect(() => {
    if (canvas.current) {
      context.current = canvas.current.getContext("2d");
      particleCanvas.current = new ParticleCanvas(canvas.current, animateTime, context.current);
      particleCanvas.current.drawCanvas();
    }
  }, [canvas.current]);

  return (
    <>
      <div className={styles.canvas_containe}>
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
      <ul className={styles.logo_options_container}>
        {
          logoImgs.map((logoItem) => <li
            key={logoItem.name}
            className={['logo-item', activeLogo.current === logoItem ? 'active' : ''].join(' ')}
            onClick={() => clickLogo(logoItem, particleCanvas.current)}
            data-cursor="pointer"
          >
            <img src={logoItem.src} className={styles.item_picture} />
            <div className={styles.item_desc}>
              {logoItem.name}
            </div>
          </li>)
        }
      </ul >
    </>
  )
}
export default ArkNights