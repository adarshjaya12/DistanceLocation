
class Coordinates:
	def __init__(self,lat,longi):
		self.lat = lat
		self.long = longi

	def serialize(self):
		return{
			'lat':self.lat,
			'long':self.long
		}
