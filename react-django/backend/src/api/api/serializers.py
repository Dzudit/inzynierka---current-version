from rest_framework import serializers
from api.models import UserDetails, Category, Payment, MonthDetails
from django.contrib.auth.models import User


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ('id', 'salary')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'type', 'limit', 'deleted')

class PaymentSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many = False)
    class Meta:
        model = Payment
        fields = ('id', 'date', 'price', 'title', 'category') 

    def create(self, validated_data):
        tracks_data = validated_data.pop('category')
        album = Category.objects.create(**validated_data)
        for track_data in tracks_data:
            Track.objects.create(category=album, **track_data)
        return album              

class MonthDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthDetails
        fields = ("id", "month", "salary", "user")

class PaymentMonthSummarySingleSerializer(serializers.Serializer):
    name = serializers.CharField(read_only=True)
    month = serializers.IntegerField(read_only=True)
    limit = serializers.DecimalField(read_only=True, decimal_places=2, max_digits=10)
    payments = serializers.DecimalField(read_only=True, decimal_places=2, max_digits=10)


class PaymentsCategoriesYearSummarySerializer(serializers.Serializer):
    name = serializers.CharField(read_only=True)
    payments = serializers.DecimalField(read_only=True, decimal_places=2, max_digits=10)


class PaymentsSavingSummarySerializer(serializers.Serializer):
    month = serializers.IntegerField(read_only=True)
    salary = serializers.DecimalField(read_only=True, decimal_places=2, max_digits=10)
    payments = serializers.DecimalField(read_only=True, decimal_places=2, max_digits=10)
    savings = serializers.DecimalField(read_only=True, decimal_places=2, max_digits=10)

