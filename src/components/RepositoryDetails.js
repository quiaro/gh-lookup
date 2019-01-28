import React from "react";
import styled from "styled-components";
import { PropTypes } from "prop-types";
import { media } from "../common/utils";
import RepositoryLanguages from "./RepositoryLanguages";

const Styled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr 1fr;
  grid-gap: 1.5rem 0;

  ${media.tablet`
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
    grid-gap: 1rem 2rem;
  `};

  h1 {
    grid-column: 1 / span 2;
    grid-row-start: 1 / 2;
  }

  dt {
    align-self: end;
    text-align: center;
    padding: 1rem 0 0.6rem;
    font-weight: bold;
    background-color: #f9f9f9;
    border-bottom: 2px solid #f2f2f2;
  }

  dd {
    text-align: center;
    background-color: #f9f9f9;
    padding: 0.6rem 0 1rem;

    span {
      display: block;
      margin-top: 0.6rem;
    }
  }

  dt:nth-child(1) {
    grid-column: 1;
    grid-row: 1;
  }
  dt:nth-child(3) {
    grid-column: 2;
    grid-row: 1;
  }
  dt:nth-child(5) {
    grid-column: 3;
    grid-row: 1;
  }

  dd:nth-child(2) {
    grid-column: 1;
    grid-row: 2;
  }
  dd:nth-child(4) {
    grid-column: 2;
    grid-row: 2;
  }
  dd:nth-child(6) {
    grid-column: 3;
    grid-row: 2;
  }

  .details {
    grid-column: 1;
    grid-row: 2;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto 1fr;

    ${media.tablet`
      grid-column: 1;
      grid-row: 2;
    `};
  }

  .owner {
    grid-column: 1;
    grid-row: 3;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;

    ${media.tablet`
      grid-column: 2;
      grid-row: 2;
    `};
  }
`;

const RepositoryDetails = ({ repository }) =>
  repository ? (
    <Styled>
      <h1>{repository.name}</h1>
      <dl className="details">
        <dt>Languages</dt>
        <dd>
          <RepositoryLanguages url={repository.languages_url} />
        </dd>
        <dt>Stars</dt>
        <dd>{repository.stargazers_count}</dd>
        <dt>Watchers</dt>
        <dd>{repository.watchers_count}</dd>
      </dl>
      <dl className="owner">
        <dt>Owner</dt>
        <dd>{repository.owner.login}</dd>
        <dt>Type</dt>
        <dd>{repository.owner.type}</dd>
      </dl>
    </Styled>
  ) : null;

RepositoryDetails.propTypes = {
  repository: PropTypes.shape({
    name: PropTypes.string.isRequired,
    languages_url: PropTypes.string,
    stargazers_count: PropTypes.number.isRequired,
    watchers_count: PropTypes.number.isRequired,
    owner: PropTypes.shape({
      login: PropTypes.string,
      type: PropTypes.oneOf(["User", "Organization"])
    }).isRequired
  })
};

export default RepositoryDetails;
