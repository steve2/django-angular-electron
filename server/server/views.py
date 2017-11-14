from django.shortcuts import render
from django.views.generic import TemplateView

class IndexTemplate(TemplateView):
    """
    The base template for our AngularJS application client.

    """
    template_name = 'index.html'