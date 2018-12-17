import styled, { css } from 'styled-components'

import vars from '../styles/variables'

let basicGrid = css`
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  @media screen and (min-width: 60rem) {
    grid-template-columns: repeat(12, 1fr);
  }
`

let RootGrid = styled.div`
  ${basicGrid};

  @media screen and (min-width: 100rem) {
    grid-template-columns: repeat(18, 1fr);
  }
`

let ParentGrid = styled.div`
  ${basicGrid};

  @media screen and (min-width: 100rem) {
    grid-column: 4 / 16;
  }
`

let SubGrid = styled.div`
  grid-column: 1 / 7;
  ${({ fullWidth }) => (fullWidth ? one : two)}
`

let one = css`
  margin: 0 ${vars.spacing.medium};

  @media screen and (min-width: 60rem) {
    margin: 0;
    grid-column: 2 / 12;
  }

  @media screen and (min-width: 100rem) {
    grid-column: 1 / 13;
  }
`

let two = css`
  .context {
    background: ${vars.secondaryBlue};
    padding: ${`${vars.spacing.xxlarge} ${vars.spacing.medium}`};
  }

  > div:not(.context) {
    height: 100vw;
    background: ${vars.primaryBlue};
  }

  @media screen and (min-width: 60rem) {
    grid-column: 2 / 13;
    display: grid;
    grid-template-columns: repeat(11, 1fr);

    .context {
      grid-column: 7 / 13;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      padding: ${vars.spacing.xlarge} 0;

      p,
      ol {
        width: 25vw;
        padding: 0;
      }
    }

    > div:not(.context) {
      height: 50vw;
      grid-column: 1 / 7;
      position: sticky;
    }
  }

  @media screen and (min-width: 100rem) {
    grid-column: 1 / 13;
    grid-template-columns: repeat(12, 1fr);

    .context {
      grid-column: 7 / 14;
      display: flex;
      justify-content: center;
      align-items: center;

      p,
      ol {
        width: 16.66vw;
      }
    }

    > div:not(.context) {
      height: 33.33vw;
      grid-column: 1 / 7;
    }
  }
`

export default { RootGrid, ParentGrid, SubGrid }
