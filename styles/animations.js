import { keyframes } from "styled-components";

const bounce = keyframes`
    0%, 20%, 60%, 100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
    40% {
        -webkit-transform: translateY(-5px);
        transform: translateY(-5px);
    }
    80% {
        -webkit-transform: translateY(-2px);
        transform: translateY(-2px);
    }
`;

const popIn = keyframes`
   0% {
        opacity: 0;
        transform: translateY(-4rem) scale(.8);
   }
    100% {
        opacity: 1;
        transform: none;
    }
`;

const animations = {
  bounce,
};

export default animations;
