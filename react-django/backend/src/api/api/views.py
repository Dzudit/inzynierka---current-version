from rest_framework import viewsets
from api.models import Categorie
from .serializers import CategorieSerializer
from django.contrib.auth.models import User

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

# class CategorieListView(ListAPIView):
#     queryset = Categorie.objects.all()
#     serializer_class = CategorieSerializer

# class CategorieDetailView(RetrieveAPIView):
#     queryset = Categorie.objects.all()
#     serializer_class = CategorieSerializer

# class CategorieCreateView(CreateAPIView):
#     queryset = Categorie.objects.all()
#     serializer_class = CategorieSerializer

# class CategorieUpdateView(UpdateAPIView):
#     queryset = Categorie.objects.all()
#     serializer_class = CategorieSerializer

# class CategorieDeleteView(DestroyAPIView):
#     queryset = Categorie.objects.all()
#     serializer_class = CategorieSerializer        
                
class CategorieViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = CategorieSerializer
    queryset = Categorie.objects.all()

# nie wiem jak zrobic zeby to dzialalo czy to tak sie robi?
class CustomObtainAuthToken(ObtainAuthToken):
    def get(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'username': token.username})