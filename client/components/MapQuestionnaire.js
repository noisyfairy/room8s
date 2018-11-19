import React, {Component} from 'react'

class MapQuestionnaire extends Component {
  render() {
    return (
      <div>
        <form>
          <h1>Where do you want to live?</h1>
          <div className="radio">
            <label>
              <input type="radio" value="option1" />
              Fidi
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="option2" />
              East Village
            </label>
          </div>
        </form>
      </div>
    )
  }
}

export default MapQuestionnaire
