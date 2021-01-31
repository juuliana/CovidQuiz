import styled from 'styled-components';

const Loading = styled.div`

    border: 8px solid #000000;
    border-left-color: #00000010;
    height: 60px;
    width: 60px;
    border-radius: 50%;

    animation: spin 1s linear infinite;

    @keyframes spin {
        to{ transform: rotate(360deg);}
    }
`;

export default Loading;