# mesh/urls.py

from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView

# API URLs: 
from mesh.exampleapi import urls as example_urls
from mesh.profiles import urls as profile_urls
from mesh.tags import urls as tags_urls
from mesh.confirmation import urls as confirmation_urls
from mesh.auth import urls as auth_urls
from mesh.accounts import urls as accounts_urls
from mesh.accountSettings import urls as accountsettings_urls
from mesh.occupations import urls as occupations_urls
from mesh.education import urls as education_urls
from mesh.conversation import urls as conversations_urls

'''
# How to Add URL -> Best Practices
-----------------------------------------
Add URLs suggested like below in the "example" 
To do this: 
 1. Ensure the API you want to add has a urls.py file. 
 2. Ensure the API you want to add has a views.py file. 
 3. Within the urls.py file of the API ensure the following: 
      -> includes the urls you want for the api. 
      -> organized to represent the kinds of urls. 
      -> specific kinds of urls
    An example of this can be observed in the urls.py example file. 
4. Add the urls here following the format of the example. 
    " path('url_or_api_base_name', include('api_folder_name.urls'))"
5. Test by running ` python manage.py runserver ` and going to the url
     by appending 'url_or_api_base_name' and any other arguments. 

Example Test:
    - Go to http://127.0.0.1:8000/example/ 
    This gives you a "You Got Home." 
    - Go to http://127.0.0.1:8000/example/helloworld/
    This gives you a "Hello World."


Be sure to keep the index.html template path at the end of urlpatterns
otherwise the other urls will not work.
'''


urlpatterns = [
    path('admin/', admin.site.urls),
    path('example/', include(example_urls)),
    path('auth/', include(auth_urls)),
    path('accounts/', include(accounts_urls)),
    path('account-settings/', include(accountsettings_urls)),
    path('profiles/', include(profile_urls)),
    path('tags/', include(tags_urls)),
    path('confirmation/', include(confirmation_urls)),
    path('occupations/', include(occupations_urls)),
    path('educations/', include(education_urls)),
    path('conversations/', include(conversations_urls)),
    re_path(r'.*', TemplateView.as_view(template_name='index.html')),
]
