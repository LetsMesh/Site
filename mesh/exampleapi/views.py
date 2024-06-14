from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

def index(request):
    if request.method == "GET":
        print(request)
        return HttpResponse("You Got Home.")


def hello_world(request):
    if request.method == "GET":
        print(request)
        return HttpResponse("Hello World!")
    
# This if for testing purposes and cleanup saved images from the testing requests
# warning: only use this if you know what you're doing with backblaze buckets
def check_buckets(request):
    if request.method == "GET":
        try:
            from mesh.profiles.views import initialize_backblaze_client
            backblaze_api, backblaze_bucket = initialize_backblaze_client()
            cleanup = request.GET.get('cleanup', 'false').lower() == 'true'

            files = []

            try:
                for file_version, folder_name in backblaze_bucket.ls():
                    files.append({
                        "file_id": file_version.id_,
                        "file_name": file_version.file_name,
                        "folder_name": folder_name
                    })
                    if cleanup:
                        backblaze_bucket.delete_file_version(file_version.id_, file_version.file_name)
            
            except Exception as e:
                
                # Handle the case where there are no files in the bucket
                files = [f'error: {e}']

            return JsonResponse({"files": files, "message": "these files were cleaned up" if cleanup else "bucket file list"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method."}, status=405)
