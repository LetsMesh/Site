from django.urls import path
from . import views as occupation_views

urlpatterns = [
    
    # GET /occupations/
    # POST /occupations/
    # PATCH /occupations/
    path("", occupation_views.OccupationsView.as_view(), name="occupations"),

    # GET /occupations/:account_id
    path("<int:account_id>/", occupation_views.OccupationsDetailView.as_view(), 
    name="user_occupations")
]