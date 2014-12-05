from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View
import json

from .forms import ServiceAreaForm, SelectServiceAreaForm
from .models import ServiceArea

class SetServiceArea(View):
    """
    Main view, show the map and receive a new service area and save it.
    """

    template_name = "index.html"

    def get(self, request):
        return render(request, self.template_name, {'form':ServiceAreaForm()})

    def post(self, request):
        json_data = json.loads(request.body)
        form = ServiceAreaForm(json_data)
        if form.is_valid():
            form.save()
            data = {'saved': "Service area Saved! please click on Next! to continue"}
        else:
            data = {'errors': form.errors.values()}
        return HttpResponse(json.dumps(data), content_type="application/json")

service_area_set = SetServiceArea.as_view()


class FindServiceArea(View):
    """
    Find view, show the map to be able to check if the user can find the service area.
    """

    template_name = "find.html"

    def get(self, request):
        areas = ServiceArea.objects.all()
        if areas:
            form = SelectServiceAreaForm(initial={'service_area':areas[0].pk})
        else:
            form = SelectServiceAreaForm()
        return render(request, self.template_name, {'form':form})

find_service_area = FindServiceArea.as_view()


class GetServiceArea(View):
    """
    Returns a json with the coords of the polygons of the service area.
    """

    def get(self, request):
        form = SelectServiceAreaForm(request.GET)
        if form.is_valid():
            sarea = form.cleaned_data.get('service_area')
            result = {'mpoly': sarea.mpoly.tuple}
            return HttpResponse(json.dumps(result), content_type="application/json")

get_service_area = GetServiceArea.as_view()
