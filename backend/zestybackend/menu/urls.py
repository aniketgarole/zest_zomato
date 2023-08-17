from django.urls import path
from .views import DishList, DishDetail, OrderList, OrderDetail

urlpatterns = [
    path('dishes/', DishList.as_view(), name='dish-list'),
    path('dishes/<int:pk>/', DishDetail.as_view(), name='dish-detail'),
    path('orders/', OrderList.as_view(), name='order-list'),
    path('orders/<int:pk>/', OrderDetail.as_view(), name='order-detail'),
]