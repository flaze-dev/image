import {animate, motion, MotionStyle, useMotionTemplate, useMotionValue} from "framer-motion";
import {useIntersectWithViewport} from "lib/hooks/useIntersectWithViewport";
import {CSSProperties, useEffect, useRef, useState} from "react";


interface Props {
  src?: string;
  width: number;
  height: number;
  unload?: boolean;

  className?: string;
  onClick?: () => void;
}


const ImageComponent = (props: Props) => {

  // Ref
  const containerElement = useRef<HTMLDivElement>(null);
  const intersecting = useIntersectWithViewport(containerElement);

  // State
  const [src, setSrc] = useState<string | null>();
  const [visible, setVisible] = useState<boolean>(false);

  // Animation
  const opacity = useMotionValue(0);
  const grayscale = useMotionValue(100);

  useEffect(() => {
    const opacityControls = animate(opacity, visible ? 1 : 0);
    const grayscaleControls = animate(grayscale, visible ? 0 : 100);

    return () => {
      opacityControls.stop();
      grayscaleControls.stop();
    };
  }, [visible]);

  // Fetching
  const prefetch = () => {
    const image = new Image();

    image.addEventListener("load", () => {
      setSrc(image.src);
      setVisible(true);
    });

    image.addEventListener("error", () => {
      console.error(`@ImageComponent: load error for '${image.src}'`);
    });

    // TODO: REMOVE AFTER DEVELOPMENT (SIMULATE LOADING DELAY)
    image.src = props.src || "";
  }

  const unload = () => {
    if (!props.unload) {
      return;
    }

    setSrc(null);
    setVisible(false);
  }

  // Effects
  useEffect(() => {
    intersecting && prefetch();
    !intersecting && unload();

  }, [intersecting]);

  // Render
  const renderBackgroundImage = () => {
    const filter = useMotionTemplate`grayscale(${grayscale}%)`;

    const backgroundImageStyle: MotionStyle = {
      position: "absolute",
      inset: "0",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundImage: `url(${src})`,
      filter,
      opacity,
    };

    return <motion.div style={backgroundImageStyle}/>
  }

  const renderContainer = () => {

    const containerStyle: CSSProperties = {
      position: "relative",
      overflow: "hidden",
      width: props.width,
      height: props.height,
    };

    return <div ref={containerElement} style={containerStyle} className="bg-gray-100">
      {renderBackgroundImage()}
    </div>
  }

  const render = () => {
    return renderContainer();
  }

  return render();
};

export default ImageComponent;
