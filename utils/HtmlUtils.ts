export const setFocusHtmlElementFromClassName = (className: string): void => {
  const element = document.querySelector(`.${className}`) as HTMLElement;
  if (element) {
    element.focus();
  }
};
