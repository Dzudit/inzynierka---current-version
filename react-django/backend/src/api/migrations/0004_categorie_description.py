# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-11-17 22:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20181117_2242'),
    ]

    operations = [
        migrations.AddField(
            model_name='categorie',
            name='description',
            field=models.CharField(default='SOME STRING', max_length=120),
        ),
    ]
