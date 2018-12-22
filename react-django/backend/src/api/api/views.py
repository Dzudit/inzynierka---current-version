from rest_framework import viewsets
from api.models import Categorie
from .serializers import CategorieSerializer

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

#tutaj potrzedbje dodac cos co mi zwric token