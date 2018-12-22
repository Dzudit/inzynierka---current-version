from django.urls import path
from .views import CategorieViewSet
from rest_framework.routers import DefaultRouter
from .views import CustomObtainAuthToken

#urlpatterns = [
#      path('', CustomObtainAuthToken.as_view()),
#     path('', CategorieListView.as_view()),
#     path('create/', CategorieCreateView.as_view()),
#     path('<pk>', CategorieDetailView.as_view()),
#     path('<pk>/update/', CtegorieUpdateView.as_view()),
#     path('<pk>/delete/', CategorieDeleteView.as_view()),
#]

#to do Damian
router = DefaultRouter()
router.register(r'', CategorieViewSet, basename='categorie')
urlpatterns = router.urls
