const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({accessToken: process.env.MAPBOX_TOKEN})

geocodingClient
  .forwardGeocode({
    query: 'Paris, France',
    bbox: [2.14, 48.72, 2.55, 48.96]
  })
  .send()
  .then(response => {
    const match = response.body
  })
