from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Task, ContextEntry, Category
from .serializers import TaskSerializer, ContextEntrySerializer, CategorySerializer
from .utils import get_local_llm_suggestions
from datetime import datetime
import openai

@api_view(['GET', 'POST'])
def tasks_view(request):
    if request.method == 'GET':
        tasks = Task.objects.all().order_by('-created_at')
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        data = request.data.copy()
        task_name = data.get('name', '')
        task_description = data.get('description', '')
        task_context_text = data.get('context_text', '')

        suggestions = get_local_llm_suggestions(task_name, task_description, task_context_text)

        context_name = suggestions.get("context", "General")
        category_name = suggestions.get("category", "General")
        priority = suggestions.get("priority", "Medium")
        deadline_str = suggestions.get("deadline")

        context_obj, _ = ContextEntry.objects.get_or_create(name=context_name)
        category_obj, _ = Category.objects.get_or_create(name=category_name)

        data['context'] = context_obj.id
        data['category'] = category_obj.id
        data['priority'] = priority
        data['context_text'] = task_context_text
        data['completion_date'] = data.get('completion_date')  # ✅ New field

        if deadline_str:
            try:
                data['deadline'] = datetime.strptime(deadline_str, '%Y-%m-%d').date()
            except ValueError:
                pass

        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'PATCH', 'DELETE'])
def task_detail_view(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        data = request.data.copy() if request.data else {}

        task_name = data.get('name', task.name)
        task_description = data.get('description', task.description)
        task_context_text = data.get('context_text', task.context_text)

        suggestions = get_local_llm_suggestions(task_name, task_description, task_context_text)

        context_name = suggestions.get("context", "General")
        category_name = suggestions.get("category", "General")
        priority = suggestions.get("priority", "Medium")
        deadline_str = suggestions.get("deadline")

        context_obj, _ = ContextEntry.objects.get_or_create(name=context_name)
        category_obj, _ = Category.objects.get_or_create(name=category_name)

        data['context'] = context_obj.id
        data['category'] = category_obj.id
        data['priority'] = priority
        data['context_text'] = task_context_text
        data['completion_date'] = data.get('completion_date', task.completion_date)  # ✅

        if deadline_str:
            try:
                data['deadline'] = datetime.strptime(deadline_str, '%Y-%m-%d').date()
            except ValueError:
                pass

        serializer = TaskSerializer(task, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def contexts_view(request):
    if request.method == 'GET':
        contexts = ContextEntry.objects.all()
        serializer = ContextEntrySerializer(contexts, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ContextEntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'POST'])
def categories_view(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET'])
def openai_test_view(request):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": "Say hello from OpenAI"}],
            max_tokens=10,
        )
        result = response['choices'][0]['message']['content']
        return Response({"openai_response": result})
    except Exception as e:
        return Response({"error": str(e)}, status=500)
