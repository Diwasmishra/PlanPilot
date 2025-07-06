from django.urls import path
from .views import tasks_view, task_detail_view, contexts_view, categories_view, openai_test_view

urlpatterns = [
    path('tasks/', tasks_view),                  # GET & POST (list/create)
    path('tasks/<int:pk>/', task_detail_view),  # GET, PATCH, DELETE
    path('contexts/', contexts_view),            # GET & POST
    path('categories/', categories_view),        # GET & POST
    path('openai-test/', openai_test_view, name='openai-test'),  # OpenAI test endpoint
]
