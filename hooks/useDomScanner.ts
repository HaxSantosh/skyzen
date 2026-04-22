"use client";

import { useEffect, useState } from "react";

type ElementMap = {
  id: string;
  element: HTMLElement;
  label: string;
};

export const useDomScanner = () => {
  const [elements, setElements] = useState<ElementMap[]>([]);

  const scanDom = () => {
    const selectors = [
      "button",
      "a",
      "input",
      "textarea",
      "[role='button']",
      "[onclick]",
    ];

    const nodeList = document.querySelectorAll(selectors.join(","));

    let index = 0;

    const visibleElements: ElementMap[] = [];

    nodeList.forEach((el) => {
      const element = el as HTMLElement;

      const rect = element.getBoundingClientRect();

      // filter invisible elements
      if (
        rect.width === 0 ||
        rect.height === 0 ||
        window.getComputedStyle(element).visibility === "hidden"
      ) {
        return;
      }

      const label =
        element.innerText ||
        element.getAttribute("aria-label") ||
        element.getAttribute("placeholder") ||
        element.tagName;

      const id = String.fromCharCode(65 + index); // A, B, C...

      visibleElements.push({
        id,
        element,
        label: label.trim(),
      });

      index++;
    });

    setElements(visibleElements);
  };

  useEffect(() => {
    scanDom();

    // optional: re-scan on DOM changes
    const observer = new MutationObserver(() => {
      scanDom();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return {
    elements,
    rescan: scanDom,
  };
};