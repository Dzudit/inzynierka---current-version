from django.urls import path
from .views import CategorieViewSet
from rest_framework.routers import DefaultRouter

# urlpatterns = [
#     path('', CategorieListView.as_view()),
#     path('create/', CategorieCreateView.as_view()),
#     path('<pk>', CategorieDetailView.as_view()),
#     path('<pk>/update/', CategorieUpdateView.as_view()),
#     path('<pk>/delete/', CategorieDeleteView.as_view()),
# ]

router = DefaultRouter()
router.register(r'', CategorieViewSet, basename='categorie')
urlpatterns = router.urls

#tu tez nie wiem co zrobic