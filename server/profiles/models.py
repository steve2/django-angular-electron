from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    """Personal profile that corresponds with each User."""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    about = models.TextField(max_length=512, blank=True)
    location = models.CharField(max_length=32, blank=True)
    birthdate = models.DateField(null=True, blank=True)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Create a Profile when a User is created."""
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """Save a Profile when the User instance is saved."""
    try:
        user_profile = instance.profile
    except:
        user_profile = None
    if user_profile is not None:
        user_profile.save()
