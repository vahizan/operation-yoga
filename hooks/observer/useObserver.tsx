import { MutableRefObject, RefObject, useEffect, useRef } from "react";

interface Props {
  observerCallback: IntersectionObserverCallback;
  options: {
    root: Element | Document | null;
    rootMargin: string;
    thresholds: ReadonlyArray<number>;
  };
}

export function useObserver<T>({ observerCallback, options }: Props): {
  containerRef: RefObject<T>;
} {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, options);
    if (containerRef.current) {
      observer.observe(containerRef.current as unknown as Element);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current as unknown as Element);
      }
    };
  }, [containerRef, options]);

  return { containerRef };
}

export default useObserver;
