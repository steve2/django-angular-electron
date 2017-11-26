from django.contrib.auth import get_user_model
from rest_framework import serializers
# from allauth.socialaccount.models import SocialAccount
from profiles.serializers import ProfileSerializer


# Get Django UserModel.
# USER_MODEL = get_user_model()


# class SocialAccountSerializer(serializers.ModelSerializer):
#     """
#     Social account serializer for "allauth" library.
#     """
#     extra_data = serializers.JSONField()
#     class Meta:
#         model = SocialAccount
#         fields = ('user', 'provider', 'uid', 'last_login', 'date_joined',
#                   'extra_data')
#         read_only_fields = ('user', 'provider', 'uid',
#                             'last_login', 'date_joined',)
        


# class UserDetailsSerializer(serializers.ModelSerializer):
#     """
#     User model with profile.
#     """
#     profile = ProfileSerializer(read_only=True)
#     socialaccount_set = SocialAccountSerializer(read_only=True, many=True)

#     class Meta:
#         model = USER_MODEL
#         fields = ('pk', 'username', 'email', 'date_joined',
#                   'first_name', 'last_name', 'profile',
#                   'last_login', 'socialaccount_set')
#         read_only_fields = ('email',)
