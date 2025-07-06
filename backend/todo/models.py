from django.db import models

class ContextEntry(models.Model):
    name = models.CharField(max_length=100, default='General')

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100, default='General')

    def __str__(self):
        return self.name

class Task(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)
    context = models.ForeignKey(ContextEntry, on_delete=models.CASCADE, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    context_text = models.TextField(blank=True, null=True)

    # Priority and deadline
    priority = models.CharField(
        max_length=20,
        choices=[('High', 'High'), ('Medium', 'Medium'), ('Low', 'Low')],
        default='Medium',
        blank=True
    )
    deadline = models.DateField(null=True, blank=True)

    # ✅ New fields
    created_at = models.DateField(auto_now_add=True)       # auto-set on creation
    completion_date = models.DateField(null=True, blank=True)  # manual input

    def __str__(self):
        return self.name
