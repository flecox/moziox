from django import forms
from django.contrib.gis.geos import Polygon, MultiPolygon
from .models import ServiceArea


class SelectServiceAreaForm(forms.Form):
    """
        Form to select the service area to play with in the "find" page.
    """
    service_area = forms.ModelChoiceField(queryset=ServiceArea.objects.all())


class ServiceAreaForm(forms.Form):
    """
        Form to save/edit a Service area.
    """

    name = forms.CharField(required=False)

    def clean_name(self):
        data = self.cleaned_data['name']
        if not data:
            raise forms.ValidationError("The Name can't be empty!")
        return data

    def clean(self):
        cleaned_data = super(ServiceAreaForm, self).clean()
        if 'mpoly' not in self.data or not self.data['mpoly']:
            raise forms.ValidationError("You need at least one Service Area")
        return cleaned_data

    def save(self, force_insert=False, force_update=False, commit=True):
        try:
            obj = ServiceArea.objects.get(name=self.data['name'])
        except:
            obj = ServiceArea(name=self.data['name'])
        polys = []
        for poly_data in self.data['mpoly']:
            #first node is last node
            poly_data.append(poly_data[0])
            poly = Polygon(poly_data)
            polys.append(poly)
        mpolys = MultiPolygon(polys)
        obj.mpoly = mpolys
        obj.save()
