import math
from dto.Coordinates import Coordinates

def GetCoordinateList(latitude,longitude,distance):
	CoordinatesList = [];
	radiusEarth = 3959.8728
	adjustedDistance = distance/radiusEarth
	myInter = iter(range(0,359))
	for(i in myInter):
		lat2 = math.asin(math.sin(ConvertToRadians(latitude)) * math.cos(adjustedDistance) + math.cos(ConvertToRadians(latitude)) * math.sin(adjustedDistance) * mat.cos(ConvertToRadians(i)))
		lon2 = ConvertToRadians(longitude) + math.atan2(math.sin(ConvertToRadians(i)) * math.sin(adjustedDistance) * math.cos(ConvertToRadians(latitude)), math.cos(adjustedDistance) - math.sin(ConvertToRadians(latitude)) * math.sin(ConvertToRadians(lat2))
		dLong = longitude - lon2
		y = math.sin(dLong) * math.cos(latitude)
		x = math.cos(lat2) * math.sin(latitude) - math.sin(lat2) * math.cos(latitude) * math.cos(dLong)
		d = math.atan2(y,x)
		finalBrg = d + math.pi
		backbrg  = d + 2 * math.pi
		cord = Coordinates(ConvertToDegree(lat2),ConvertToDegree(lon2))
		CoordinatesList.append(cord)
	return CoordinatesList


def ConvertToRadians(angle):
	return (math.pi / 180) * angle


def ConvertToDegree(angle):
	return (180/math.pi) * angle