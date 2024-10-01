from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from itineraries.models import Trip, Accommodation, Activity
from faker import Faker
import random

class Command(BaseCommand):
    help = 'Generate sample trips, accommodations, and activities'

    def handle(self, *args, **kwargs):
        fake = Faker()
        user = User.objects.first()  # Get an existing user or create one

        # Generate trips
        for _ in range(5):
            trip = Trip.objects.create(
                user=user,
                destination=fake.city(),
                start_date=fake.date_this_year(),
                end_date=fake.date_this_year()
            )

            # Generate accommodations for each trip
            for _ in range(2):
                Accommodation.objects.create(
                    trip=trip,
                    name=fake.company(),
                    address=fake.address(),
                    check_in=fake.date_time_this_year(),
                    check_out=fake.date_time_this_year()
                )

            # Generate activities for each trip
            for _ in range(3):
                Activity.objects.create(
                    trip=trip,
                    description=fake.sentence(),
                    date=fake.date_this_year()
                )

        self.stdout.write(self.style.SUCCESS('Sample data created successfully'))
