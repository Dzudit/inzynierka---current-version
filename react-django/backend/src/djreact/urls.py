
from django.conf.urls import url, include
from django.contrib import admin

#to do Damian

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls')),
    url(r'api/', include('api.api.urls')),
    url(r'^username/', include('api.api.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls'))
]
