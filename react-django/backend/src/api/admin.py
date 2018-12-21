# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Categorie
from .models import UserDetails
from .models import Category
from .models import Payment

# Register your models here.
admin.site.register(Categorie)
admin.site.register(UserDetails)
admin.site.register(Category)
admin.site.register(Payment)
