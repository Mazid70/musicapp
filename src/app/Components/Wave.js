import React from 'react';
import './styles.css';
const Wave = () => {
  return (
    <span className="flex items-end gap-[2px] h-8">
      {['၊', '|', '၊', '|', '။', '|', '၊', '|', '၊', '|', '|', '၊'].map(
        (bar, i) => (
          <span
            key={i}
            className="xl:text-2xl 2xl:text-4xl font-semibold text-transparent bg-gradient-to-b from-[#E33E9F] to-[#4D25AE] bg-clip-text animate-wave"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {bar}
          </span>
        )
      )}
    </span>
  );
};

export default Wave;