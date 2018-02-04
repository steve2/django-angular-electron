from django.contrib.auth.models import User
from rest_framework import serializers
from profiles.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    """
    Profile model serializer.
    """
    class Meta:
        model = Profile
        fields = ('about', 'from_location', 'live_location', 'birthdate', 'rank')

class UserSerializer(serializers.ModelSerializer):
    """
    Override the default User serializer.
    """
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'date_joined', 'last_login', 'profile')

    def update(self, instance, validated_data):
        """Updates the User with a nested Profile."""
        profile = instance.profile
        profile_data = validated_data.pop('profile')

        # Update the User object.
        # Note that we don't need to update 'last_login' or 'date_joined'.
        # We currently do not allow users to change their username.
        instance.email = validated_data.get('email')
        instance.save()

        # Update the Profile object separately.
        profile.about = profile_data.get('about', profile.about)
        profile.from_location = profile_data.get('from_location', profile.from_location)
        profile.live_location = profile_data.get('live_location', profile.live_location)
        profile.birthdate = profile_data.get('birthdate', profile.birthdate)
        profile.rank = profile_data.get('rank', profile.rank)
        profile.save()
        return instance