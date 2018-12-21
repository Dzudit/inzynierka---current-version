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
    #user_login=models.CharField('User',max_length=20)
    #password=models.CharField('Password', max_length=30)
    #email=models.EmailField('Email')
    salary = models.DecimalField('Salary', decimal_places=2, max_digits=10)
    
    def __str__(self):
        return f'{self.salary}'

class Category(models.Model):
    user_id=models.ForeignKey('UserDetails', on_delete=models.SET_NULL, null=True)
    description=models.CharField('Description',max_length=100)
    limit=models.DecimalField('Limit', decimal_places=2, max_digits=10)
    payment = models.ManyToManyField('Payment')
    
    def __str__(self):
        return f'{self.user_id}, {self.description}, {self.limit}, {self.limit}'
    
class Payment(models.Model):
    date = models.DateField()
    price = models.DecimalField('Price', decimal_places=2, max_digits=10)
    title = models.CharField('Title', max_length=100)
    
    def __str__(self):
        return f'{self.date}, {self.price}, {self.title}'        