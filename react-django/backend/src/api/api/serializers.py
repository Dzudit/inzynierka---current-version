from rest_framework import serializers
from api.models import UserDetails, Category, Payment, MonthDetails, SavingGoals
from django.contrib.auth.models import User


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ('id', 'salary')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'type', 'user', 'limit', 'deleted')


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('id', 'date', 'price', 'title')


class MonthDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthDetails
        fields = ("id", "month", "salary", "user")


class SavingGoalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavingGoals
        fields = ("id", "goal", "category", "user")


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

