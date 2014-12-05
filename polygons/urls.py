from django.conf.urls import patterns, url


urlpatterns = patterns('polygons.views',
    url(r'^$', 'service_area_set', name="index"),
    url(r'^find/$', 'find_service_area', name="find"),
    url(r'^get_polygons/$', 'get_service_area', name="get_polygons"),
    url(r'^get_polygons/(?P<service_area>\d+)$', 'get_service_area', name="get_polygons"),

)
