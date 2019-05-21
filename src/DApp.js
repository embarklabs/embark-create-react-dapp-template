/*global web3*/
import React, {Fragment} from 'react';
import EmbarkJS from './embarkArtifacts/embarkjs';
import SimpleStorage from './embarkArtifacts/contracts/SimpleStorage';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: ''
    };
  }

  componentDidMount() {
    EmbarkJS.onReady((err) => {
      if (err) {
        this.setState({
          loading: false,
          error: 'Error while loading the Dapp: ' + err.message || err
        });
      }
      SimpleStorage.methods.get().call().then((contractVal) => {
        this.setState({
          loading: false,
          contractVal
        });
      });
    });
  }


  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    }
    if (this.state.loading) {
      return <p>Loading...</p>;
    }
    return (
      <Fragment>
        <h3>Value stored in SimpleStorage contract:</h3>
        {this.state.contractVal}
      </Fragment>
    );
  }
}

export default App;
