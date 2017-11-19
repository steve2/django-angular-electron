# from django.shortcuts import render
from django.views.generic import TemplateView
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView


class IndexTemplate(TemplateView):
    """
    The base template for our AngularJS application client.
    """
    template_name = 'index.html'


class FacebookLogin(SocialLoginView):
    """
    Facebook social auth view.
    """
    adapter_class = FacebookOAuth2Adapter