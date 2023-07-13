from django.views import View
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from .models import Education
from mesh.education.serializer import EducationSerializer
from mesh.exceptions import InvalidJsonFormat, MissingRequiredFields, BaseCustomExcepton

class EducationView(APIView):
    def post(self, request):
        try:
            data = JSONParser().parse(request)
            serializer = EducationSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            else:
                return Response(serializer.errors, status=400)

        except InvalidJsonFormat as e:
            return Response({'error': str(e)}, status=400)
        
        except MissingRequiredFields as e:
            return Response({'error': str(e)}, status=400)
        
        except Exception as e:
            return Response({'error': str(e)}, status=400)
