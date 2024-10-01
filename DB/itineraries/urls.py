from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('trips/', views.trip_list, name='trip_list'),
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]
