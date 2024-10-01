from django.db import models
from django.contrib.auth.models import User

class Trip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    destination = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"{self.destination} ({self.start_date} - {self.end_date})"

class Accommodation(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='accommodations')
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    check_in = models.DateTimeField()
    check_out = models.DateTimeField()

    def __str__(self):
        return self.name

class Activity(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='activities')
    description = models.CharField(max_length=255)
    date = models.DateField()

    def __str__(self):
        return self.description
