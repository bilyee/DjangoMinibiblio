from ninja import NinjaAPI, Schema
from django.shortcuts import get_object_or_404
from typing import List, Optional, Union, Literal
import datetime
 
from .models import *
 
api = NinjaAPI()

class ImatgeOut(Schema):
    id: int
    imatge: Optional[str]

    @staticmethod
    def resolve_imatge(obj):
        return obj.imatge.url if obj.imatge else None
 
class LlibreOut(Schema):
    id: int
    titol: str
    autor: str
    data_edicio: Optional[datetime.date]
    resum: Optional[str]
    imatge: Optional[str]
 
@api.get("/llibres", response=List[LlibreOut])
@api.get("/llibres/", response=List[LlibreOut])
def obtenir_libres(request):
    qs = Llibre.objects.all()
    return qs

@api.get("/llibres/{llibre_id}/imatges", response=List[ImatgeOut])
def obtenir_imatges_llibre(request, llibre_id: int):
    qs = ImatgeLlibre.objects.filter(llibre_id=llibre_id)
    return qs

def obtenir_libres(request):
    return [
        {
            'id': llibre.id,
            'titol': llibre.titol,
            'autor': llibre.autor,
            'data_edicio': llibre.data_edicio,
            'resum': llibre.resum,
            'imatge': llibre.imatge_principal.url if llibre.imatge_principal else None,
        }
        for llibre in Llibre.objects.all().order_by('id')
    ]