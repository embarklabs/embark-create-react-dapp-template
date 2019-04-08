/*global web3*/
import React from 'react';
import EmbarkJS from './embarkArtifacts/embarkjs';
import config from './embarkArtifacts/config/blockchain';
import SimpleStorage from './embarkArtifacts/contracts/SimpleStorage';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    EmbarkJS.Blockchain.connect(config, (err) => {
      if (err) {
        throw err;
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
    if (this.state.loading) {
      return 'Loading...';
    }
    return (
      <React.Fragment>
        <h3>Value stored in SimpleStorage contract:</h3>
        {this.state.contractVal}
      </React.Fragment>
    );
  }
}

export default App;
