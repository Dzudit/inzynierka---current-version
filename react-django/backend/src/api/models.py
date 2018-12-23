# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models


import uuid 

# Create your models here.
class UserDetails(models.Model):
    salary = models.DecimalField('Salary', decimal_places=2, max_digits=10) 

    def __str__(self):
        return f'{self.salary}'

class Category(models.Model):
    types = (('payements', 'Payments'), ('savings', 'Savings'))
    user_id=models.ForeignKey('UserDetails', on_delete=models.SET_NULL, null=True)
    description=models.CharField('Description',max_length=100)
    limit=models.DecimalField('Limit', decimal_places=2, max_digits=10)
    types = models.CharField(choices=types, max_length=20)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user_id}, {self.description}, {self.limit}, {self.limit}'
    
class Payment(models.Model):
    #nie usuwac kiedy kategoria przestaje istniec
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    date = models.DateField()
    price = models.DecimalField('Price', decimal_places=2, max_digits=10)
    title = models.CharField('Title', max_length=100)
    
    def __str__(self):
        return f'{self.date}, {self.price}, {self.title}'     

class MonthDetails(models.Model):
    salary_date = models.DateField()
    salary = models.DecimalField(decimal_places=2, max_digits=10)
    user = models.ForeignKey('UserDetails', on_delete=models.CASCADE)

    @property
    def month(self):
        return self.salary_date.month

class SavingGoals(models.Model):
    user = models.ForeignKey('UserDetails', on_delete=models.CASCADE)
    goal = models.DecimalField(decimal_places=2, max_digits=10)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)

