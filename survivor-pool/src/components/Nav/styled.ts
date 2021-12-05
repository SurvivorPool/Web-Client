import styled from "styled-components";

import { device } from "@/utils/device";

export const Container = styled.div`
    width: 100%;
    height: 75px;
    display: flex;
    justify-content: flex-end;
    z-index: 6;
    position: fixed;
    top: 0;

    @media ${device.tablet} {
        position: absolute;
        top: 20px;
    }
`;
