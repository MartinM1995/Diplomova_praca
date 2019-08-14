# Diplomova_praca
Názov:

Spracovanie technologických dát procesu skujňovania formou webovej aplikácie

resp.

Návrh a realizácia webovej aplikácie pre analýzu technologických dát o procese skujňovania



Popis:

- vytvorenie základu webovej aplikácie pre načítanie a spracovanie dát, 

- vstupy webovej aplikácie realizovať vo forme XLS súborov

- ??? uloženie načítaných dát do webovej databázy, resp. dátovej štruktúry  ???

- vytvoriť rozhranie webovej aplikácie (napr. prihlásenie, načítanie jednej tavby, vizualizácia dát, spracovanie dát ... )

- vizualizáciu načítaných dát




- vstupné dáta predstavujú merané technologické veličiny jednej tavby, napr. koncentrácia CO, CO2, objem spalín a pod. (max.20), ktoré sú merané každú sekundu

- spracovanie dát sa týka výpočtu parametrov procesu z meraných technologických veličín, napr. rýchlosť oduhličenia = d(CO+CO2)/dt

- výstupom webovej aplikácie sú merané technologické veličiny a vypočítané parametre

- na základe vytvorenej webovej aplikácie realizovať analýzu viacerých tavieb a určiť z meraných a vypočítaných dát bod ukončenia procesu, napr. rýchlosť oduhličenia pre konkrétne podmienky




spresnenie, resp. čo ďalej:

- vhodná/nevhodná tavba pre ďalšie spracovanie, resp. parameter s hodnotou 1/0, ktorý po zobrazení tavby môžem zadať

- možnosť zobrazenia priebehov CO + CO2
- ak CO  < 0 potom CO = 0
- ak CO2 < 0 potom CO2 = 0
- ak CO  > 100 potom CO = 100
- ak CO2 > 100 potom CO2 = 100
- ak CO + CO2 > 100 potom CO + CO2 = 100

- možnosť zobrazenia gradientu, gradient_i = (CO + CO2)i - (CO + CO2)i-1

- výpočet klzavého priemeru z gradientu, klzavý priemer = suma i až n (gradient_i / n)


pripomienky:

- os x - zobraziť hodnoty času: 1052, nie 1052s
       - popis: čas, s  
       - nastaviť vypis hodnôt po 100 s

- os y - zobraziť hodnoty koncentracie: 95
       - popis: koncentrácia, %  




