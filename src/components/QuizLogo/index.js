import styled from 'styled-components';

import React from 'react';
import PropTypes from 'prop-types';

function Logo({ className }) {
  return (  
    <img className={className} src="https://fontmeme.com/temporary/c4522b9cfda2471eebfd0e6c55d83f95.png" alt="Covid Logo" />
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
    margin: 0 60px 0 60px;
  }
`;

export default QuizLogo;