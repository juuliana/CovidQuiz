import styled from 'styled-components';

import React from 'react';
import PropTypes from 'prop-types';

function Logo({ className }) {
  return (
    <a href="/">
      <img
        src="/CovidQuizLogo.png"
        alt="Logo"
        className={className}
      />
    </a>
  );
}

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

const QuizLogo = styled(Logo)`
  margin: auto;
  display: block;
  width: 250px;
  @media screen and (max-width: 500px) {
    margin: 0 30px 0 30px;
  }
`;

export default QuizLogo;