const neighborhoodIdxObj = {}

const neighborhoodIdxLookUp = function(data) {
  for (let neighborhood of data) {
    neighborhoodIdxObj[neighborhood.properties.neighborhood] = data
      .indexOf(neighborhood)
      .toString()
  }
}

if (this.props.mapData !== null) {
  neighborhoodIdxLookUp(this.props.mapData.features)
}

export default neighborhoodIdxObj
