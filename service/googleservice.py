import googleapi,apiclient
from dto.autocomplete import AutoComplete,AutoCompleteJson,Prediction
from dto.geocoding import GeoCoding,Result,AddressComponent,CityModel,Location

def getAutoCompelte(text):
	autoUrl = googleapi.AUTO_COMPLETE.format(text)
	result =  apiclient.get_call(autoUrl)
	autoObject = AutoComplete(**result)
	resultList = [];
	for place in  autoObject.predictions:
		prediction = Prediction(**place)
		x = AutoCompleteJson(prediction.description,prediction.place_id)
		resultList.append(x);

	return resultList

def getLatAndLong(address):
	autoUrl = googleapi.GEO_CODING.format(address)
	result = apiclient.get_call(autoUrl)
	geoCoding = GeoCoding(**result)
	location = geoCoding.results[0]["geometry"]["location"]
	return Location(**location)

def getCityModelFromGeo(lat,longi):
	autoUrl = googleapi.REVERSE_GEO_CODING.format(lat,longi)
	result = apiclient.get_call(autoUrl)
	geoCoding = GeoCoding(**result)
	address_compList = [AddressComponent(**comp) for comp in geoCoding.results[0]["address_components"]]
	cityFilter = next(x for x in address_compList for y in x.types  if y == "sublocality" or y == "sublocality_level_1" or y == "locality" )
	stateFilter = next(x for x in address_compList for y in x.types  if y == "administrative_area_level_1" )
	countryFilter = next(x for x in address_compList for y in x.types if y == "country")
	place_id = geoCoding.results[0]["place_id"]
	lati = geoCoding.results[0]["geometry"]["location"].lat
	longi = geoCoding.results[0]["geometry"]["location"].lng
	return CityModel(place_id,cityFilter.long_name,stateFilter.short_name,countryFilter.short_name,lati,longi)
