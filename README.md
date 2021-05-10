# weatherly
Live weather forecasting system developed using API integration : weatherstack, mapbox
Weatherly app uses weatherStack API to fetch the global weather and geographical report data in the form of Javascript object notation (JSON) response.
The weatherStack accepts the request of location in the form the latitude and longitude JSON object therefore we have used mapBox API which converts the
given location into longitude and latitude first, besides we have set a middle ware which then hits the latitude and longitude as JSON request to the weather stack API 
to get the needed information.
