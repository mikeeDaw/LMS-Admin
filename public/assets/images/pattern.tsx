import React from "react";

const Pattern = () => {
  return (
    <svg
      id="patternId"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-xl"
    >
      <defs>
        <pattern
          id="a"
          patternUnits="userSpaceOnUse"
          width="20"
          height="20"
          patternTransform="scale(3) rotate(0)"
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="hsla(0, 0%, 22%, 1)"
          />
          <path
            d="M-10-10A10 10 0 00-20 0a10 10 0 0010 10A10 10 0 010 0a10 10 0 00-10-10zM10-10A10 10 0 000 0a10 10 0 0110 10A10 10 0 0120 0a10 10 0 00-10-10zM30-10A10 10 0 0020 0a10 10 0 0110 10A10 10 0 0140 0a10 10 0 00-10-10zM-10 10a10 10 0 00-10 10 10 10 0 0010 10A10 10 0 010 20a10 10 0 00-10-10zM10 10A10 10 0 000 20a10 10 0 0110 10 10 10 0 0110-10 10 10 0 00-10-10zM30 10a10 10 0 00-10 10 10 10 0 0110 10 10 10 0 0110-10 10 10 0 00-10-10z"
            strokeWidth="1"
            stroke="hsla(122, 54%, 32%, 1)"
            fill="none"
          />
        </pattern>
      </defs>
      <rect
        width="800%"
        height="800%"
        transform="translate(0,-33)"
        fill="url(#a)"
      />
    </svg>
  );
};

export default Pattern;
