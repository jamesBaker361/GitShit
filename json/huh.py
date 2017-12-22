import json

h=open('cocks.json','r+')

b={'a':6,'345':'abc'}

h.write(json.JSONEncoder().encode(b))