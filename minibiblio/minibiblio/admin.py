from django.contrib import admin
from .models import *
from django.contrib import admin
from django.utils.html import format_html

class ImatgeInLine(admin.TabularInline):
    readonly_fields = ('preview',)
    model = ImatgeLlibre
    extra = 2
    fields = ([])
    def preview(self, obj):
        if obj.imatge:
            return format_html('<img src="{}" width="100" style="object-fit: cover;" />', obj.imatge.url)
        return "No hi ha imatge"
    
    preview.short_description = 'Previsualització'
 
class LlibreAdmin(admin.ModelAdmin):
    # Afegeix el mètode a readonly_fields perquè es mostri en la pàgina d'edició
    readonly_fields = ('vista_previa_imatge',)
 
    # Defineix quins camps es mostren en el formulari d'edició
    # fields = ('nom', 'imatge', 'vista_previa_imatge')
 
    exclude = ()
    inlines = [ImatgeInLine,]
    def vista_previa_imatge(self, obj):
        if obj.imatge:
            # Retorna l'etiqueta HTML amb l'URL de la imatge
            return format_html('<img src="{}" width="150" style="object-fit: cover;" />', obj.imatge.url)
        return "No hi ha imatge"
 
    vista_previa_imatge.short_description = 'Previsualització'

# Register your models here.
admin.site.register(Llibre, LlibreAdmin)
admin.site.register(Usuari)