import requests

def fetch_flights(request):
    response = requests.get('https://api.skyscanner.net/apiservices/browsequotes/v1.0/{params}')
    flight_data = response.json()
    return render(request, 'flights.html', {'flights': flight_data})
