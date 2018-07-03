import requests,pdb,json,sys
google_url = "https://maps.googleapis.com/maps/api/"


def get_call(path):
	final_url = google_url+path
	r = requests.get(final_url)
	return r.json()

