import React, { Component } from "react";
import styled from "styled-components";
import { media } from "../common/utils";
import GithubSearch from "./GithubSearch";
import RepositoryDetails from "./RepositoryDetails";

const Styled = styled.div`
  width: 100vw;
  height: 100vh;

  main {
    margin-top: 4vh;
    padding-left: 3vw;
    padding-right: 3vw;
  }

  ${media.desktop`
    margin: 0 auto;
    width: 80vw;
    max-width: 1200px;

    main {
      padding: 0;
    }
  `};
`;

class App extends Component {
  state = {
    repository: null
  };

  updateSelectedRepo = repository => {
    this.setState({ repository });
  };

  render() {
    return (
      <Styled className="App">
        <header>
          <GithubSearch onRepoChange={this.updateSelectedRepo} />
        </header>
        <main>
          <RepositoryDetails repository={this.state.repository} />
        </main>
      </Styled>
    );
  }
}

export default App;
