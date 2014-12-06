from django.contrib.gis.db import models


class ServiceArea(models.Model):
    """
        Represent the service area. using django gis for future purposes,
    this helps with the speed of the search and db lookups.
    """
    name = models.CharField(max_length=100, unique=True)
    # GeoDjango-specific: a geometry field (MultiPolygonField), and
    # overriding the default manager with a GeoManager instance.
    mpoly = models.MultiPolygonField()
    created = models.DateTimeField(auto_now_add=True)

    objects = models.GeoManager()

    class Meta:
        ordering = ["-created"]

    def __unicode__(self):
        return self.name
