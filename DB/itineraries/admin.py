from django.contrib import admin
from .models import Trip, Accommodation, Activity

@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ('user', 'destination', 'start_date', 'end_date')
    list_filter = ('user', 'start_date', 'end_date')
    search_fields = ('destination',)

@admin.register(Accommodation)
class AccommodationAdmin(admin.ModelAdmin):
    list_display = ('trip', 'name', 'check_in', 'check_out')
    list_filter = ('trip', 'check_in', 'check_out')
    search_fields = ('name', 'address')

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('trip', 'description', 'date')
    list_filter = ('trip', 'date')
    search_fields = ('description',)
