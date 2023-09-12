# in education folder: urls.py  (education.urls)
from django.urls import path
from . import views as education_views

urlpatterns = [
    # POST  /educations/
    # GET   /educations/
    path('', education_views.EducationView.as_view(), name="education")
]