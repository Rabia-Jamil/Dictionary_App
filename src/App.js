import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state = { 
     word : '',
     definition: '',
   }

   handleWordChange = (event) => {
    this.setState({ [event.target.name] : event.target.value})
   }

  fetchDefinition =  (e) => {
    e.preventDefault();
    const { word } = this.state
    const url = '/search?word=' + word
     fetch(url).then((response) => {
      return response.json()
    })
    .then((data) => {
      if(data.error === null){
        console.log("error!", data.error)
      }
        this.setState({
          definition: data.data.definition
        })
        console.log("Data", data)
    })
    .catch((e) => {
      console.log(" Error occurred! ", e)
    })
  }

  render() { 
    //console.log(this.state.definition)
    return ( 
      <div className="container">
      <div className="row">
        <div className="col col-sm-4 offset-sm-4">
        <div className="card" >
            <div className="card-body">
              <h5 className="card-title">Dictionary</h5>
              <form onSubmit={this.fetchDefinition}>
                <div className="form-group">
                  <label>Enter a word to find its meaning!</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="InputWord"
                    name="word"
                    value= {this.state.word} 
                    onChange= {this.handleWordChange}
                    placeholder="Enter Word"
                  />
                </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-block"
                    style={{marginTop: "10px"}}>
                      Definition
                  </button>
                
              </form>
              <p>{this.state.definition}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
     );
  }
}
 
export default App;
