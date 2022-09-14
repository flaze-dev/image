import {RefObject, useEffect, useState} from "react";


export const useIntersectWithViewport = <T extends HTMLElement>(element: RefObject<T>) => {

  const [intersect, setIntersect] = useState<boolean>(false);

  const onViewportEnter = () => {
    setIntersect(true);
  }

  const onViewportLeave = () => {
    setIntersect(false);
  }

  useEffect(() => {
    if (element.current) {

      const observer = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
          const isIntersecting = entry.isIntersecting;
          isIntersecting && onViewportEnter();
          !isIntersecting && onViewportLeave();
        }
      });

      observer.observe(element.current);

      return () => {
        element.current && observer.unobserve(element.current);
        observer.disconnect();
      }
    }
  }, [element]);

  return intersect;
}