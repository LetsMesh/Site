# in education folder: urls.py  (education.urls)
from django.urls import path
from . import views as education_views

urlpatterns = [
    # POST  /educations/
    # GET   /educations/
    path('', education_views.EducationView.as_view(), name="education"),

    # GET   /educations/:account_id/
    path("<int:account_id>/", education_views.EducationsDetailView.as_view(), name="user_educations")
]