from django.urls import path
from . import views as occupation_views

urlpatterns = [
    
    # GET /occupations/
    # POST /occupations/
    path("", occupation_views.OccupationsView.as_view(), name="occupation"),

    # GET /occupations/:account_id
    # PATCH /occupations/:account_id
    path("<int:account_id>/", occupation_views.OccupationsDetailView.as_view(), 
    name="get_or_update_occupation")
]