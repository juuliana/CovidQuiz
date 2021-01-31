import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #00000070;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 4px;

  img {
    width: 200px;
    margin-left: 100px;
  }

  a {
    color: white;
    text-decoration: none;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
    span {
      text-decoration: underline;
    }
  }
`;

export default function Footer(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FooterWrapper {...props}>
      <a href="https://coronavirus.saude.gov.br/" target="_blank">
        <img src="https://portalarquivos.saude.gov.br/images/png/2020/April/14/logo.png" alt="Logo Ministerio" />
      </a>
    </FooterWrapper>
  );
}