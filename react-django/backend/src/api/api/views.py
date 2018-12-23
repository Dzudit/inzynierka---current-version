from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.authtoken.models import Token

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from .serializers import UserSerializer
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
# 
