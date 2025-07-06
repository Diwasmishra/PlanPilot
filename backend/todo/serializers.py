from rest_framework import serializers
from .models import Task, ContextEntry, Category

class ContextEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContextEntry
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    context_name = serializers.CharField(source='context.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['context_name', 'category_name', 'created_at']

    
