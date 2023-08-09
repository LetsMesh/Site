from django.urls import path
from . import views as occupation_views

urlpatterns = [
    
    # GET /occupations/
    # POST /occupations/
    path("", occupation_views.OccupationsView.as_view(), name="occupation"),

    # GET /occupations/:occupation_id
    # PATCH /occupations/:occupation_id
    path("<int:account_id>/", occupation_views.OccupationsDetailView.as_view(), 
    name="get_or_update_occupation")
]