import React from 'react';

export const Remove: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 16,
  width = 16,
  className = '',
}) => (
  <svg
    className={className}
    height={height}
    width={width}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M.4.4c.5-.5 1.4-.5 1.9 0L8 6.1 13.7.4c.5-.5 1.4-.5 1.9 0s.5 1.4 0 1.9L9.9 8l5.7 5.7c.5.5.5 1.4 0 1.9s-1.4.5-1.9 0L8 9.9l-5.7 5.7c-.5.5-1.4.5-1.9 0s-.5-1.4 0-1.9L6.1 8 .4 2.3C-.1 1.8-.1.9.4.4z"
      clipRule="evenodd"
    />
  </svg>
);

export const Logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 94.7,
  width = 300,
  className = '',
}) => (
  <svg
    className={className}
    height={height}
    width={width}
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0"
    y="0"
    viewBox="0 0 300 94.7"
    xmlSpace="preserve"
  >
    <path
      fill="#fff"
      d="m280.6 43.7 2.6 4.5 2.6 4.6-5.2-1.4-5.3 1.4 2.6-4.6zM37.4 55.2l2.6 4.6 2.7 4.5-5.3-1.4-5.3 1.4 2.7-4.5z"
    />
    <circle fill="#faf0ca" cx="145.5" cy="29.7" r="4.9" />
    <path
      fill="#faf0ca"
      d="M45.3 44.6h5.3v18.1h-5.3zM48 42c2 0 3.3-1.3 3.3-3 0-1.6-1.3-2.8-3.3-2.8-2 0-3.3 1.3-3.3 2.9 0 1.7 1.3 2.9 3.3 2.9zM63.3 63c2.4 0 4.4-.8 5.7-2.4v2.1h5v-25h-5.3v8.8c-1.3-1.5-3.2-2.2-5.4-2.2-5.1 0-9.1 3.6-9.1 9.3s3.9 9.4 9.1 9.4zm.9-14.4c2.6 0 4.6 1.9 4.6 5s-2 5-4.6 5c-2.6 0-4.7-1.9-4.7-5s2.1-5 4.7-5zM86.6 63c2.4 0 4.4-.8 5.7-2.4v2.1h5v-25H92v8.8c-1.3-1.5-3.2-2.2-5.4-2.2-5.1 0-9.1 3.6-9.1 9.3s4 9.4 9.1 9.4zm.9-14.4c2.6 0 4.6 1.9 4.6 5s-2 5-4.6 5c-2.6 0-4.7-1.9-4.7-5s2.1-5 4.7-5zM102.2 37.7h5.3v25h-5.3zM121.3 63c3.3 0 5.8-1 7.5-2.9l-2.8-3c-1.2 1.2-2.6 1.8-4.6 1.8-2.8 0-4.7-1.4-5.2-3.6H130c0-.4.1-1 .1-1.4 0-5.8-4.1-9.4-9.4-9.4-5.5 0-9.7 3.9-9.7 9.3 0 5.2 4 9.2 10.3 9.2zm-.6-14.7c2.4 0 4.1 1.5 4.5 3.8h-8.9c.3-2.4 2-3.8 4.4-3.8z"
    />
    <path
      fill="#faf0ca"
      d="M141.3 69c-1.8-.7-2.5-1.2-2.5-1.2-.7.3-1.4.5-2.2.5H23.4c-2.7 0-4.8-2.2-4.8-4.8v-2.3l.1-12.3 6.9 11.4H28l6.9-11.7V57l2.4-4.2 2.7 4.6V39.1h-4.5l-8.7 14.7L18 39.1h-4.5v24.3c0 5.4 4.4 9.8 9.8 9.8h113.2c3.3 0 6.2-1.6 8.1-4 .1.1-1.7.4-3.3-.2z"
    />
    <g>
      <path
        fill="#faf0ca"
        d="M168.2 53.7c2.4 0 4.4.8 6.1 2.7l3.5-3.2c-2.3-2.7-5.7-4.1-9.9-4.1-7.5 0-13 5.1-13 12.2s5.5 12.2 12.9 12.2c3.4 0 6.9-1 9.5-3v-9.6h-5v6.9c-1.4.7-2.8 1-4.2 1-4.5 0-7.7-3.1-7.7-7.6.1-4.5 3.2-7.5 7.8-7.5zM187.1 57.3v-2.4h-5V73h5.3v-8.6c0-3.5 1.9-5.1 4.8-5.1.4 0 .7 0 1.2.1v-4.9c-2.9.1-5 1-6.3 2.8zM204.9 54.6c-5.8 0-10 3.9-10 9.3s4.2 9.3 10 9.3 10-3.9 10-9.3-4.2-9.3-10-9.3zm0 14.4c-2.6 0-4.7-1.9-4.7-5s2-5 4.7-5 4.6 1.9 4.6 5-1.9 5-4.6 5zM231.4 63.9c0 3.3-1.8 4.9-4.2 4.9-2.3 0-3.7-1.3-3.7-4.4v-9.5h-5.3v10.3c0 5.6 3.2 8.2 7.8 8.2 2.2 0 4.2-.8 5.6-2.4v2h5V54.9h-5.3v9zM252.6 54.6c-2.5 0-4.6.8-6 2.4v-2.1h-5V73h5.3v-9c0-3.3 1.8-4.9 4.4-4.9 2.3 0 3.7 1.3 3.7 4.3V73h5.3V62.6c-.2-5.5-3.4-8-7.7-8zM273.5 38H163c-.7 1.1-1.5 2.1-2.4 3.1-.3.6-.7 1.3-1.1 1.9h114c2.2 0 4 1.4 4.6 3.4l2.4-4.2 2.7 4.8c-.3-5.1-4.6-9-9.7-9zM280.6 52.4l-2.2.6v3.8c-1.3-1.5-3.2-2.2-5.4-2.2-5.1 0-9.1 3.6-9.1 9.3s3.9 9.3 9.1 9.3c2.4 0 4.4-.8 5.7-2.4V73h4.8V53.1l-2.9-.7zM273.8 69c-2.6 0-4.7-1.9-4.7-5s2-5 4.7-5c2.6 0 4.6 1.9 4.6 5s-2 5-4.6 5z"
      />
    </g>
    <g>
      <path
        fill="#fff"
        d="M139.7 55.2c-1.8 1.4-3 3.7-2.8 6.3.2 3.3 2.8 6 6 6.6 4.3.7 8.2-2.5 8.4-6.8.1-2.2-.8-4.3-2.3-5.7-1.1 1.3-2.2 2.5-3 3.4-1 1.1-2.8 1-3.7-.2-.7-.9-1.5-2.1-2.6-3.6z"
      />
    </g>
    <g>
      <path
        fill="#faf0ca"
        d="M144.2 57.9h-.1c-.6 0-1.1-.3-1.5-.8-1.6-2-15.4-19.5-15-28.8.5-9.9 8.9-17.5 18.8-17 4.8.2 9.2 2.3 12.4 5.9s4.8 8.1 4.6 12.9c-.5 9.3-16 25.4-17.8 27.2-.4.4-.9.6-1.4.6zm1.3-42.5c-7.3 0-13.5 5.8-13.8 13.2-.2 3.1 2.3 8.7 6.8 15.8 2.2 3.5 4.5 6.6 5.9 8.4 5.2-5.6 14.7-17 15-22.8.4-7.6-5.5-14.1-13.1-14.5-.3-.1-.6-.1-.8-.1z"
      />
    </g>
  </svg>
);

export const Chat: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 300,
  width = 300,
  className = '',
}) => (
  <svg
    className={className}
    height={height}
    width={width}
    version="1.1"
    id="step2"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 300 300"
    xmlSpace="preserve"
  >
    <g>
      <path
        d="M125.6,191.2H76.9c-2.4,0-4.4,2-4.4,4.4c0,2.4,2,4.4,4.4,4.4h48.7c1.2,0,2.3-0.5,3.1-1.3
		c0.8-0.8,1.3-2,1.3-3.1c0-1.2-0.5-2.3-1.3-3.1C127.9,191.7,126.8,191.2,125.6,191.2z"
      />
      <path
        d="M76.9,178h26.6c2.4,0,4.4-2,4.4-4.4c0-2.4-2-4.4-4.4-4.4H76.9c-1.2,0-2.3,0.5-3.1,1.3c-0.8,0.8-1.3,2-1.3,3.1
		c0,1.2,0.5,2.3,1.3,3.1C74.6,177.5,75.7,178,76.9,178z"
      />
      <path
        d="M76.9,155.8h70.8c2.4,0,4.4-2,4.4-4.4c0-2.4-2-4.4-4.4-4.4H76.9c-1.2,0-2.3,0.5-3.1,1.3
		c-0.8,0.8-1.3,2-1.3,3.1v0c0,1.2,0.5,2.3,1.3,3.1S75.7,155.9,76.9,155.8z"
      />
      <path
        d="M76.9,133.7h44.3c2.4,0,4.4-2,4.4-4.4c0-2.4-2-4.4-4.4-4.4H76.9c-1.2,0-2.3,0.5-3.1,1.3
		c-0.8,0.8-1.3,2-1.3,3.1v0c0,1.2,0.5,2.3,1.3,3.1S75.7,133.7,76.9,133.7z"
      />
      <path
        d="M183.1,98.3L183.1,98.3l-123.9,0c-3.5,0-6.9,1.4-9.4,3.9c-2.5,2.5-3.9,5.9-3.9,9.4V247c0,2.8,1.1,5.5,3.1,7.5
		c2,2,4.7,3.1,7.5,3.1c3.5,0,6.7-1.7,8.6-4.6L81,230.4c1.7-2.4,4.4-3.8,7.2-3.8h94.9c3.5,0,6.9-1.4,9.4-3.9c2.5-2.5,3.9-5.9,3.9-9.4
		V111.6c0-3.5-1.4-6.9-3.9-9.4C190,99.7,186.6,98.3,183.1,98.3z M183.1,217.8H88.3c-5.8,0-11.2,2.8-14.5,7.6L57.9,248
		c-0.3,0.5-0.8,0.8-1.4,0.8c-1,0-1.7-0.8-1.7-1.8V111.6c0-2.4,2-4.4,4.4-4.4h123.9c2.4,0,4.4,2,4.4,4.4l0,101.8
		C187.5,215.8,185.6,217.8,183.1,217.8z"
      />
      <path
        d="M168.6,170.4c-0.8-0.8-2-1.3-3.1-1.3h-44.3c-2.4,0-4.4,2-4.4,4.4c0,2.4,2,4.4,4.4,4.4h44.3
		c1.2,0,2.3-0.5,3.1-1.3c0.8-0.8,1.3-2,1.3-3.1h0l0,0C169.8,172.4,169.4,171.2,168.6,170.4z"
      />
      <path
        d="M254.5,49.1c-2.5-2.5-5.9-3.9-9.4-3.9H121.2c-3.5,0-6.9,1.4-9.4,3.9c-2.5,2.5-3.9,5.9-3.9,9.4v35.4h8.9V58.5
		c0-2.4,2-4.4,4.4-4.4h123.9c2.4,0,4.4,2,4.4,4.4v139.8c0,1-0.8,1.8-1.7,1.8c-0.6,0-1.1-0.3-1.4-0.8v0l-15.8-22.6
		c-3.3-4.7-8.7-7.6-14.5-7.6v0h-15.2v8.9H216c2.9,0,5.6,1.4,7.3,3.8l15.8,22.6c1.9,2.9,5.2,4.6,8.6,4.6c2.8,0,5.5-1.1,7.5-3.1
		c2-2,3.1-4.7,3.1-7.5V58.5l0,0C258.4,55,257,51.6,254.5,49.1z"
      />
      <path
        d="M168.6,126.2c-0.8-0.8-2-1.3-3.1-1.3h-26.6c-2.4,0-4.4,2-4.4,4.4c0,2.4,2,4.4,4.4,4.4h26.6
		c1.2,0,2.3-0.5,3.1-1.3c0.8-0.8,1.3-2,1.3-3.1h0C169.8,128.1,169.4,127,168.6,126.2z"
      />
    </g>
  </svg>
);

export const Map: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 300,
  width = 300,
  className = '',
}) => (
  <svg
    className={className}
    height={height}
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 300 300"
  >
    <circle
      cx="82"
      cy="168.2"
      r="13.5"
      transform="rotate(-45.001 82.024 168.23)"
    />
    <path d="M266.2 84.8c0-26.6-21.6-48.2-48.2-48.2s-48.2 21.6-48.2 48.2c0 23.8 37.5 67.9 43.9 75.3v25.3h-39.4c-2.5 0-4.5 2-4.5 4.5v33.9c0 2.5 2 4.5 4.5 4.5h39.2v26.1h-127v-10.5c0-.2 0-.4-.1-.5 7-8 43.8-51.5 43.8-75.1 0-26.6-21.6-48.2-48.2-48.2s-48.2 21.6-48.2 48.2c0 23.6 36.8 67.1 43.8 75.1 0 .2-.1.3-.1.5v15c0 2.5 2 4.5 4.5 4.5h136c2.5 0 4.5-2 4.5-4.5v-35.1c0-2.5-2-4.5-4.5-4.5h-39.2v-24.9h39.4c2.5 0 4.5-2 4.5-4.5v-29.4c0-.3 0-.5-.1-.8 7.4-8.5 43.6-51.5 43.6-74.9zM82 129c21.6 0 39.2 17.6 39.2 39.2 0 16.8-25.8 50.7-39.2 66.5-13.4-15.8-39.2-49.7-39.2-66.5 0-21.6 17.6-39.2 39.2-39.2zm136-83.4c21.6 0 39.2 17.6 39.2 39.2 0 16.8-25.8 50.7-39.2 66.5-13.4-15.8-39.2-49.7-39.2-66.5 0-21.6 17.6-39.2 39.2-39.2z" />
    <circle
      cx="218"
      cy="84.8"
      r="13.5"
      transform="rotate(-80.781 217.976 84.782)"
    />
  </svg>
);

export const Phone: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 40,
  width = 40,
  className = '',
}) => (
  <svg
    className={className}
    height={height}
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 300 300"
  >
    <path d="M207.1 20.2H92.9c-14.8 0-26.8 12-26.8 26.8v214.4c0 14.8 12 26.8 26.8 26.8H207c14.8 0 26.8-12 26.8-26.8V47c.1-14.8-11.9-26.8-26.7-26.8zm16 241.1c0 8.9-7.2 16.1-16.1 16.1H92.9c-8.9 0-16.1-7.2-16.1-16.1V46.9c0-8.9 7.2-16.1 16.1-16.1H207c8.9 0 16.1 7.2 16.1 16.1v214.4z" />
    <path d="M150 230.2c-11.3 0-20.4 9.1-20.4 20.4S138.7 271 150 271c11.3 0 20.4-9.1 20.4-20.4 0-11.2-9.2-20.4-20.4-20.4zm0 30.1c-5.3 0-9.7-4.3-9.7-9.7 0-5.3 4.3-9.7 9.7-9.7 5.3 0 9.7 4.3 9.7 9.7s-4.3 9.7-9.7 9.7zm-8.8-209.6h17.5c2.9 0 5.4-2.4 5.4-5.4 0-2.9-2.4-5.4-5.4-5.4h-17.5c-2.9 0-5.4 2.4-5.4 5.4.1 3 2.5 5.4 5.4 5.4zm60.8 79.4-82.9-27.6c-2-.7-4.2-.1-5.7 1.3s-2 3.7-1.3 5.7l27.6 82.9c.7 2.1 2.6 3.6 4.8 3.8 2.2.2 4.3-.9 5.4-2.8L164 168c1.2-2.2.8-4.9-.9-6.7l-18-18c-2.2-2.2-2.2-5.7 0-7.9s5.7-2.2 7.9 0l18 18c1.8 1.8 4.5 2.1 6.7.9l25.4-14.1c1.9-1.1 3.1-3.2 2.8-5.4-.3-2.1-1.8-4-3.9-4.7z" />
  </svg>
);

export const Menu: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 16,
  width = 16,
  className = '',
}) => (
  <svg
    className={className}
    height={height}
    width={width}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14.4c-.9 0-1.6-.7-1.6-1.6s.7-1.6 1.6-1.6 1.6.7 1.6 1.6-.7 1.6-1.6 1.6zm0-4.8c-.9 0-1.6-.7-1.6-1.6S7.1 6.4 8 6.4s1.6.7 1.6 1.6S8.9 9.6 8 9.6zm0-4.8c-.9 0-1.6-.7-1.6-1.6S7.1 1.6 8 1.6s1.6.7 1.6 1.6S8.9 4.8 8 4.8z" />
  </svg>
);

export const ChatSmall: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = ({ height = 16, width = 16, className = '' }) => (
  <svg
    className={className}
    height={height}
    width={width}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M16 8.2c0 3.9-3.6 7-8 7-1.5 0-2.9-.4-4.1-1l-3.9 1 1.3-3.1C.5 11 0 9.6 0 8.2c0-3.9 3.6-7 8-7s8 3.1 8 7zm-11-1H3v2h2v-2zm8 0h-2v2h2v-2zm-6 0h2v2H7v-2z"
      clipRule="evenodd"
    />
  </svg>
);

// export const ----: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
//     height = 40,
//     width = 40,
//     className = "",
// }) => (
// ---
// );
