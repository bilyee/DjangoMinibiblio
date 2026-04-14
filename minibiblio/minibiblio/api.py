from ninja import NinjaAPI, Schema
from django.shortcuts import get_object_or_404
from typing import List, Optional, Union, Literal
import datetime
 
from .models import *
 
api = NinjaAPI()
 
class LlibreOut(Schema):
    id: int
    titol: str
    autor: str
    data_edicio: datetime.date
    resum: Optional[str]
    imatge: Optional[str]
 
@api.get("/llibres", response=List[LlibreOut])
@api.get("/llibres/", response=List[LlibreOut])
def obtenir_libres(request):
    return [
        {
            'id': llibre.id,
            'titol': llibre.titol,
            'autor': llibre.autor,
            'data_edicio': llibre.data_edicio,
            'resum': llibre.resum,
            'imatge_principal': llibre.imatge_principal.url if llibre.imatge_principal else None,
        }
        for llibre in Llibre.objects.all().order_by('id')
    ]