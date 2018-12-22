# Generated by Django 2.1.3 on 2018-12-21 19:03

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20181117_2248'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=100, verbose_name='Description')),
                ('limit', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Limit')),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Price')),
                ('title', models.CharField(max_length=100, verbose_name='Title')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, help_text='Unique ID for user', primary_key=True, serialize=False)),
                ('user_login', models.CharField(max_length=20, verbose_name='User')),
                ('password', models.CharField(max_length=30, verbose_name='Password')),
                ('email', models.EmailField(max_length=254, verbose_name='Email')),
                ('salary', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Salary')),
            ],
        ),
        migrations.AddField(
            model_name='category',
            name='payment',
            field=models.ManyToManyField(to='api.Payment'),
        ),
        migrations.AddField(
            model_name='category',
            name='user_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.User'),
        ),
    ]