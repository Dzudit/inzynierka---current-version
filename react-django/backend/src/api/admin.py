# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Payment
from .models import UserDetails
from .models import MonthDetails
from .models import Category

# Register your models here.
admin.site.register(UserDetails)
admin.site.register(Payment)
admin.site.register(MonthDetails)
admin.site.register(Category)

