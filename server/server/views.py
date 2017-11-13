from django.shortcuts import render

def base(request):
    """
    Return the base HTML document.

    """
    return render(request, 'index.html')