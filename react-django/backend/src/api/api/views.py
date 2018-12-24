import datetime

from django.db.models import Sum
from django.http import JsonResponse
from django.utils.timezone import now
from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import UserDetails, MonthDetails, Category, Payment
from .serializers import CategorySerializer, UserDetailSerializer, MonthDetailsSerializer, \
    PaymentSerializer, PaymentMonthSummarySingleSerializer, \
    PaymentsCategoriesYearSummarySerializer, PaymentsSavingSummarySerializer


class UserDetailListView(generics.ListCreateAPIView):
    serializer_class = UserDetailSerializer
    queryset = UserDetails.objects.all()


class UserDetailsUpdateView(generics.RetrieveUpdateAPIView):
    allowed_methods = ('PUT', 'POST')
    serializer_class = UserDetailSerializer
    queryset = UserDetails.objects.all()
    permission_classes = (permissions.AllowAny,)

    def put(self, request, *args, **kwargs):
        response = super(UserDetailsUpdateView, self).put(request, *args, **kwargs)
        user_details = self.get_object()
        month = datetime.date.today().month
        year = datetime.date.today().year
        obj = MonthDetails.objects.filter(
            user=user_details,
            month=month,
            year=year,
        )

        if obj:
            obj.salary = user_details.salary
            obj.save()
            MonthDetails.objects.filter(user=user_details,
                                        month__gte=month,
                                        year=year).update(salary=user_details.salary)
        else:
            MonthDetails.objects.create(
                user=user_details,
                year=year,
                month=month,
                salary=user_details.salary,

            )
        return response


class CategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class CategoryCreateView(generics.CreateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class CategoryUpdateView(generics.UpdateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class CategoryDeleteView(generics.DestroyAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class PaymentsListView(generics.ListAPIView):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()


class PaymentsCreateView(generics.CreateAPIView):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()


class PaymentsUpdateView(generics.UpdateAPIView):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()


class PaymentsDeleteView(generics.DestroyAPIView):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()


class PaymentsSummaryCategoryPerMonth(APIView):
    def get(self, request, month):
        payments = []
        for category in Category.objects.all():
            payments.append(
                {
                    "name": category.name,
                    "month": month,
                    "limit": category.limit,
                    "payments": Payment.objects.filter(category=category,
                                                       category__type="payments",
                                                       date__month=month).aggregate(Sum('price'))['price__sum']
                }
            )

        serialized = PaymentMonthSummarySingleSerializer(payments, many=True)
        return Response(serialized.data)


class PaymentsCategoryDuringYearView(APIView):

    def get(self, request):
        payments = []

        for category in Category.objects.all():
            payments.append(
                {
                    "name": category.name,
                    "payments": Payment.objects.filter(category=category,
                                                       date__year=datetime.date.today().year
                                                       ).aggregate(Sum("price"))['price__sum']
                }
            )

        serialized = PaymentsCategoriesYearSummarySerializer(payments, many=True)
        return Response(serialized.data)


class PaymentsSavingSummaryView(APIView):
    def get(self, request):
        payments = []

        for month in range(1, 12):
            try:
                salary = MonthDetails.objects.get(month=month).salary
            except MonthDetails.DoesNotExist:
                salary = 0
                payments.append(
                    {
                        "month": month,
                        "salary": salary,
                        "payments": Payment.objects.filter(
                            category__type='payments',
                            date__month=month,
                        ).aggregate(Sum("price"))["price__sum"],
                        "savings": Payment.objects.filter(
                            category__type="savings",
                            date__month=month
                        ).aggregate(Sum("price"))["price__sum"]
                    }
                )

        serialized = PaymentsSavingSummarySerializer(payments, many=True)
        return Response(serialized.data)