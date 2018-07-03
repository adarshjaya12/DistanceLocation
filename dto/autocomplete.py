class AutoComplete:
    def __init__(self,predictions,status):
        self.predictions = predictions
        self.status = status

class Prediction:
    def __init__(self,description ,id,matched_substrings,place_id,reference,structured_formatting,terms,types):
        self.description= description
        self.id= id
        self.matched_substrings= matched_substrings
        self.place_id= place_id
        self.reference= reference
        self.structured_formatting= structured_formatting
        self.terms= terms
        self.types= types


class AutoCompleteJson:
    def __init__(self,description,place_id):
        self.place_id = place_id
        self.description = description

    def serialize(self):
        return{
            'place_id': self.place_id,
            'description': self.description
        }

