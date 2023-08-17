from django.db import models

class Dish(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Order(models.Model):
    STATUS_CHOICES = (
        ('received', 'Received'),
        ('preparing', 'Preparing'),
        ('delivered', 'Delivered'),
    )

    customer_name = models.CharField(max_length=100)
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='received')

    def __str__(self):
        return f"Order for {self.customer_name} - {self.dish.name}"