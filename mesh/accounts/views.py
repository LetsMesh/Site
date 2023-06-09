from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

@csrf_exempt
def bio_view(request):
    if request.method == "POST":
        data = request.POST
        if 'biography' not in data:
              return JsonResponse({'error': 'Invalid request. Missing biography field.'}, status=400)
        else:
            print(data.get('biography'))
            # Save Biography to Database
            return JsonResponse({'message': 'biography saved successfully'})
    return JsonResponse({'error': 'Method not allowed'}, status=405)