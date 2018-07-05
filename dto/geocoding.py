class GeoCoding:
    def __init__(self, results, status):
        self.results = results
        self.status = status

class Result:
    def __init__(self, address_components, place_id):
    	self.place_id = place_id
    	self.address_components = address_components


class AddressComponent:
	def __init__(self, long_name, short_name, types):
		self.long_name = long_name
		self.short_name = short_name
		self.types = types

class Location:
	def __init__(self,lat,lng):
		self.latitude = lat
		self.longitude = lng


class CityModel:
	def __init__(self, placeid, city, state, country,latitude,longitude):
		self.placeid = placeid
		self.city = city
		self.state = state
		self.country = country
		self.latitude = latitude
		self.longitude =longitude

	def serialize(self):
		return{
			'place_id' : self.placeid,
			'city' : self.city,
			'state' : self.state,
			'country':self.country,
			'latitude':self.latitude,
			'longitude':self.longitude

		}



