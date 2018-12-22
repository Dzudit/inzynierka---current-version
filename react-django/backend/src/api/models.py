# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Categorie(models.Model):
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=120)

    def __str__(self):
        return self.title

import uuid 

# Create your models here.
class UserDetails(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, help_text='Unique ID for user')
    salary = models.DecimalField('Salary', decimal_places=2, max_digits=10) 

    def __str__(self):
        return f'{self.salary}'

class Category(models.Model):
    user_id=models.ForeignKey('UserDetails', on_delete=models.SET_NULL, null=True)
    description=models.CharField('Description',max_length=100)
    limit=models.DecimalField('Limit', decimal_places=2, max_digits=10)
    payment = models.ManyToManyField('Payment')
    #types = to options SAVINGS or PAIMENTS
    #deleted = true or false 

    def __str__(self):
        return f'{self.user_id}, {self.description}, {self.limit}, {self.limit}'
    
class Payment(models.Model):
    date = models.DateField()
    price = models.DecimalField('Price', decimal_places=2, max_digits=10)
    title = models.CharField('Title', max_length=100)
    
    def __str__(self):
        return f'{self.date}, {self.price}, {self.title}'     

#class MonthDetails
# relation to user (one to monay)
# month - data
# salary - in current month -- decimal

#saving goal
# relation to user(one to manay)
# amount of goal np. 25 tys
# relation to category (with type: saving)


