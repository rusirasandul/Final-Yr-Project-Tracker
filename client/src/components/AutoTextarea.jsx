import React, { useLayoutEffect, useRef } from 'react';

// Textarea that grows/shrinks to fit its content so no inner scrolling is needed.
export default function AutoTextarea({ value, minRows = 3, className = '', ...props }) {
  const ref = useRef(null);

  const resize = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  useLayoutEffect(resize, [value]);
  useLayoutEffect(() => {
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <textarea
      ref={ref}
      rows={minRows}
      value={value}
      className={`${className} resize-none overflow-hidden`}
      {...props}
    />
  );
}
