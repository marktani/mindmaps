import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      english: '',
      farsi: '',
      status: 'WELCOME TO THE AWESOME APP',
      isLoading: false,
      pairs: [],
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/get-pairs', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(r => r.json())
      .then(data => {
        this.setState({ pairs: data.pairs })
      })
  }

  render() {
    return (
      <div>
        <input
          name="english"
          value={this.state.english}
          placeholder="English"
          onChange={e => this.setState({ english: e.target.value })}
        />

        <input
          name="farsi"
          style={{ direction: 'rtl' }}
          value={this.state.farsi}
          placeholder="فارسی"
          onChange={e => this.setState({ farsi: e.target.value })}
        />

        <button
          disabled={this.state.isLoading}
          onClick={() => {
            this.setState({
              isLoading: true,
            })
            fetch('http://localhost:5000/add-pair', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              body: JSON.stringify({
                value1: this.state.english,
                language1: 'en-US',
                value2: this.state.farsi,
                language2: 'fa-IR',
              }),
            })
              .then(r => r.json())
              .then(data => {
                if (data.id) {
                  this.setState({
                    status: 'Added new word pair',
                    english: '',
                    farsi: '',
                    isLoading: false,
                    pairs: [...this.state.pairs, {id: '-', value1: this.state.english, value2: this.state.farsi}],
                  })
                } else {
                  this.setState({
                    status: 'Something unexpected happened!',
                    isLoading: false,
                  })
                }
              })
              .catch(e => {
                console.log(e)
                this.setState({
                  status: 'Something unexpected happened!',
                  isLoading: false,
                })
              })
          }}
        >
          Add Word
        </button>

        <div>{this.state.status}</div>
        <br />
        <br />
        <hr />
        <div>
          {this.state.pairs.map((pair, index) => (
            <div key={index}>
              [{pair.id}] {pair.value1} - {pair.value2}
            </div>
          ))}
        </div>


<react-multiselect data={this.state.pairs} selectedData={(selectedNodes) => {

}} > </react-multiselect>

      </div>
    )
  }
}

export default App
