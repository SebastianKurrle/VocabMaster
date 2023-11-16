from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('user.urls')),
    path('api/', include('language_practice_room.urls')),
    path('api/', include('vocabulary_set.urls'))
]
