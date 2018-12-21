from rest_framework import serializers
from api.models import Categorie
from django.contrib.auth.models import User

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = ('id', 'title','description')