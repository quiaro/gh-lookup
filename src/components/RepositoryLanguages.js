import React, { PureComponent } from "react";
import { PropTypes } from "prop-types";

async function getRepoLanguages(url) {
  const response = await fetch(url);
  const body = await response.json();
  return Object.keys(body);
}

class RepositoryLanguages extends PureComponent {
  static propTypes = {
    url: PropTypes.string
  };

  state = {
    languages: []
  };

  async componentDidMount() {
    const { url } = this.props;
    if (url) {
      const languages = await getRepoLanguages(url);
      this.setState({ languages });
    }
  }

  async componentDidUpdate(prevProps) {
    const { url } = this.props;
    if (url && url !== prevProps.url) {
      const languages = await getRepoLanguages(url);
      this.setState({ languages });
    }
  }

  render() {
    const { languages } = this.state;
    return (
      <>
        {languages.map(language => (
          <span key={language}>{language}</span>
        ))}
      </>
    );
  }
}

export default RepositoryLanguages;
