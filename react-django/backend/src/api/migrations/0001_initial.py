# Generated by Django 2.1.3 on 2018-12-24 08:50

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('limit', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Limit')),
                ('deleted', models.BooleanField(default=False)),
                ('type', models.CharField(choices=[('savings', 'Savings'), ('payments', 'payments')], max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='MonthDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField()),
                ('month', models.IntegerField()),
                ('salary', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=django.utils.timezone.now)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Price')),
                ('title', models.CharField(max_length=100, verbose_name='Title')),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.Category')),
            ],
        ),
        migrations.CreateModel(
            name='UserDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('salary', models.DecimalField(decimal_places=2, default=2000, max_digits=10, verbose_name='Salary')),
            ],
        ),
        migrations.AddField(
            model_name='monthdetails',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.UserDetails'),
        ),
        migrations.AlterUniqueTogether(
            name='monthdetails',
            unique_together={('year', 'month')},
        ),
    ]
