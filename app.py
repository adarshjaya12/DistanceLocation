from flask import Flask,render_template,request,jsonify,jsonimport googleserviceapp = Flask(__name__)app.debug = True@app.route('/')def index():    return render_template('index.html')@app.route('/autofillcities')def autocomplete():    inputResult = request.args.get('input')    result = googleservice.getAutoCompelte(inputResult)    return jsonify([e.serialize() for e in result])@app.route('/GetGeoLocation')def getGeoLocation():    latitude = request.args.get('latitude')    longitude = request.args.get('longitude')    result = googleservice.getCityModelFromGeo(latitude,longitude)    return jsonify(result.serialize())@app.route('/Submit')def submit():	cityDescription = request.args.get('cityDescription')	miles = request.args.get('miles')if __name__ == '__main__':    app.run(debug=True)