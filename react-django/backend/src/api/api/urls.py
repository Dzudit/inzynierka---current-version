"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin

from api.api.views import UserDetailsUpdateView, UserDetailListView, CategoryListView, CategoryCreateView, \
    CategoryUpdateView, CategoryDeleteView, PaymentsListView, PaymentsCreateView, \
    PaymentsDeleteView, PaymentsSummaryCategoryPerMonth, PaymentsCategoryDuringYearView, PaymentsSavingSummaryView

urlpatterns = [
    url(r'user/(?P<pk>\d+)/update/', UserDetailsUpdateView.as_view(), name="list_update_users"),
    url(r'user/$', UserDetailListView.as_view(), name="list_users"),
    url(r'category/$', CategoryListView.as_view()),
    url(r'category/create/', CategoryCreateView.as_view()),
    url(r'category/(?P<pk>\d+)/delete/', CategoryDeleteView.as_view()),
    url(r'category/(?P<pk>\d+)/update/', CategoryUpdateView.as_view()),

    url(r'payments/$', PaymentsListView.as_view()),
    url(r'payments/create/', PaymentsCreateView.as_view()),
    url(r'payments/(?P<pk>\d+)/delete/', PaymentsDeleteView.as_view()),

    url(r'payments/summary/(?P<month>\d+)/', PaymentsSummaryCategoryPerMonth.as_view()),
    url(r'payments/summary/year/', PaymentsCategoryDuringYearView.as_view()),
    url(r'payments/summary/salary/', PaymentsSavingSummaryView.as_view()),
]