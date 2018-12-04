arreglo = [1,2 ,3 ,4 ,5 ,6]
arreglo.append(7)
arreglo.pop()
if 9 in arreglo:
    print(len(arreglo))
elif 8 in arreglo:
    print(arreglo)
else:
    print('hello word')

for number in arreglo:
    print('number : ' + str(number)) #solo se puede concatenar con string, no int 

while arreglo[5] <= 5:
    print('while <---')