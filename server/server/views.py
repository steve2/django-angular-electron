# from django.shortcuts import render
from django.views.generic import TemplateView
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.twitch.views import TwitchOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_auth.registration.views import SocialLoginView


class IndexTemplate(TemplateView):
    """
    The base template for our AngularJS application client.
    """
    template_name = 'index.html'
