from djongo import models

class Trip(models.Model):
    destination = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    accommodation = models.CharField(max_length=200, blank=True, null=True)
    activities = models.TextField(blank=True, null=True)
    user = models.CharField(max_length=100)  # Placeholder for now, to link later to Google OAuth users

    def __str__(self):
        return self.destination
