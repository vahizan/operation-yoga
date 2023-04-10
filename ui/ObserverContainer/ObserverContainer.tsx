import { ReactElement, useEffect, useRef } from "react";

interface Props {
  children: ReactElement;
  observerCallback: IntersectionObserverCallback;
  options: IntersectionObserver;
}

export const ObserverContainer = ({
  children,
  observerCallback,
  options,
}: Props) => {
  return <div />;
};

export default ObserverContainer;
