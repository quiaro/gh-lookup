import React, { Component } from "react";
import styled from "styled-components";
import Downshift from "downshift";
import { PropTypes } from "prop-types";
import { debounce } from "../common/utils";
import DropDown from "./styled/DropDown";
import DropDownItem from "./styled/DropDownItem";
import ErrorMessage from "./styled/ErrorMessage";

const Styled = styled.div`
  position: relative;

  input {
    width: 100%;
    padding: 0.6rem 1rem;
    border: 1px solid #cbcbcb;
    font-size: 1.3rem;
    &.loading {
      background-color: lightyellow;
    }
  }
`;

export async function fetchFromGithub(endpoint) {
  const url = `https://api.github.com${endpoint}`;
  const response = await fetch(url);
  const body = await response.json();

  if (response.status === 404) {
    // No results found; keep the error from surfacing
    return [];
  } else if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

async function getReposByOrganizationOrUser(name) {
  const results = [];
  const [orgRepos, userRepos] = await Promise.all([
    fetchFromGithub(
      `/orgs/${name}/repos?type=all&access_token=adae62d697ef13ce0656004882c73119aee073c3`
    ),
    fetchFromGithub(
      `/users/${name}/repos?type=all&access_token=adae62d697ef13ce0656004882c73119aee073c3`
    )
  ]);
  // There may be duplicated repos so we'll filter those out with a map
  let repos = [...orgRepos, ...userRepos];
  repos = repos.map(repo => [repo.id, repo]);
  repos = new Map(repos);
  for (let value of repos.values()) {
    // Insert values in map back to results array for easy iteration with JSX
    results.push(value);
  }
  return results;
}

class GithubSearch extends Component {
  static propTypes = {
    onRepoChange: PropTypes.func.isRequired
  };

  state = {
    error: null,
    results: null,
    loading: false
  };

  onChange = debounce(async e => {
    const term = e.target.value;
    if (term.length >= 3) {
      // turn loading state on and then proceed with search
      this.setState({ error: null, loading: true });

      try {
        const repos = await getReposByOrganizationOrUser(term);
        this.setState({ results: repos, loading: false });
      } catch (error) {
        this.setState({ error, loading: false });
      }
    } else {
      // if search string is too small, clear currently selected item and empty search field
      this.props.onRepoChange(null);
      this.setState({ results: null, loading: false });
    }
  }, 350);

  render() {
    const { results, error } = this.state;
    const { onRepoChange } = this.props;

    return (
      <Styled>
        {error && (
          <ErrorMessage>
            Ooops ... something broke: {error.message}
          </ErrorMessage>
        )}
        <Downshift
          onChange={onRepoChange}
          itemToString={item => (item === null ? "" : item.full_name)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex
          }) => (
            <div>
              <input
                {...getInputProps({
                  type: "search",
                  placeholder:
                    "Search for repositories by username or organization",
                  id: "search",
                  className: this.state.loading ? "loading" : "",
                  onChange: e => {
                    e.persist();
                    this.onChange(e);
                  }
                })}
              />

              {isOpen && Array.isArray(results) && (
                <DropDown>
                  {results.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      {item.full_name}
                    </DropDownItem>
                  ))}
                  {!results.length && !this.state.loading && (
                    <DropDownItem>
                      No results found for {inputValue}
                    </DropDownItem>
                  )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </Styled>
    );
  }
}

export default GithubSearch;
