from datetime import timezone
from django.utils.timezone import now

from django.db import models


class UserDetails(models.Model):
    salary = models.DecimalField('Salary', default=2000, decimal_places=2, max_digits=10)

    def __str__(self):
        return f'{self.salary}'


class Category(models.Model):
    types = (('savings', 'Savings'), ('payments', 'payments'))
    #user = models.ForeignKey('UserDetails')
    name = models.CharField(max_length=30)
    limit = models.DecimalField('Limit', decimal_places=2, max_digits=10)
    deleted = models.BooleanField(default=False)
    type = models.CharField(max_length=20, choices=types)
    # types = to options SAVINGS or PAIMENTS

    def __str__(self):
        return f'{self.name}, {self.type}, {self.limit}'

    def delete(self, using=None, keep_parents=False):
        self.deleted = True
        self.save()


class Payment(models.Model):
    date = models.DateField(default=now)
    price = models.DecimalField('Price', decimal_places=2, max_digits=10)
    title = models.CharField('Title', max_length=100)
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f'{self.date}, {self.price}, {self.title}'


class MonthDetails(models.Model):
    year = models.IntegerField()
    month = models.IntegerField()
    salary = models.DecimalField(decimal_places=2, max_digits=10)
    user = models.ForeignKey('UserDetails', on_delete=models.SET_NULL, null=True)

    class Meta:
        unique_together = (('year', 'month'),)