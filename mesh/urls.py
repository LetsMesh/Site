from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

# API URLs: 
from mesh.exampleapi import urls as example_urls
from mesh.profiles import urls as profile_urls
from mesh.accounts import urls as account

from mesh.accounts import urls as accounts_urls
from mesh.accountSettings import urls as accountsettings_urls

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

'''


urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('admin/', admin.site.urls),
    path('example/', include(example_urls)),
    path('profiles/', include(profile_urls)),
    path('accounts/', include(accounts_urls)),
    path('settings/', include(accountsettings_urls))
]
