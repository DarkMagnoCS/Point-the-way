from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Trip
from .forms import TripForm

def trip_list(request):
    trips = Trip.objects.filter(user=request.user)
    return render(request, 'itineraries/trip_list.html', {'trips': trips})

def create_trip(request):
    if request.method == 'POST':
        form = TripForm(request.POST)
        if form.is_valid():
            trip = form.save(commit=False)
            trip.user = request.user
            trip.save()
            return redirect('trip_list')
    else:
        form = TripForm()
    return render(request, 'itineraries/trip_form.html', {'form': form})
