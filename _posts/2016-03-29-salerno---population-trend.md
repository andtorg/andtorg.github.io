---
layout: post
title: "Salerno Population Trend"
description: ""
category: "lue"
tags: [d3, javascript]
custom_css: salerno-population/stylesheet
custom_js:
- d3.min
- salerno-population/script
---
{% include JB/setup %}

(English translation to come)

## Visualizzazione
Il grafico mostra l'andamento della popolazione salernitana fra il 1982 e il 2015, fonte [Istat](http://demo.istat.it/). Per ciascun
anno di rilevazione, la popolazione è divisa per età (asse x) e per sesso, indicato da colori di grande fantasia. Ogni barra è data
dalla sovrapposizione fra maschi e femmine, così da mostrare in maniera più chiara la differente numerosità di genere per età.

In effetti questa è una rappresentazione alternativa rispetto alla nota [piramide demografica](https://en.wikipedia.org/wiki/Population_pyramid).

Una nota sui dati: bravo Istat, ma non bravissimo. Il sito prima citato consente una consultazione non complicata, ma manca di funzionalità drag & drop
e nessun webservice, anche se [altrove](http://www.istat.it/it/strumenti/web-service) è possibile, previo accreditamento e _ip fisso_(!), 
che quindi esclude la quasi totalità dell'utenza domestica che normalmente è dotata di ip dinamico. Vvabbè ma la sera avete sky e premium: 
che dovete farvene dei numeri? Tuttavia ci sono un bel po' di informazioni: è interessante, ad esempio, anche il bilancio demografico, che oltre 
ai numeri secchi per maschi/femmine, indica anche il modo con cui essi si modificano: quanti nati, quanti morti, chi se n'è andato, chi è venuto, etc. 
Aspetti importanti anche alla luce delle dinamiche di immigrazione, di bisogni connessi ad una popolazione che invecchia (es: arrivo
di badanti).

I dati sono stati scaricati in molteplici files formato csv e quindi ripuliti, conformati e distillati usando il sempre splendido
[Pentaho Data Integration](http://community.pentaho.com/projects/data-integration/), in modo da ottenere 
un unico file dato in pasto a uno dei fantastici _magic methods_ di D3 (qualche parola in più, e doverosi credits, nell'ultimo paragrafo).


## Emigrazione e vecchiaia
Solo quell'abitudine particolarmente meridionale, di bellavistiana impronta, impedisce di disperare difronte ai numeri: la città
ha perso circa 25.000 abitanti (16%) nell'arco temporale considerato ed è diventata più anziana. Il lato positivo è che stiamo più larghi,
benchè quando poi dobbiamo spostarci riusciamo comunque a produrre un discreto traffico privato: nel nostro piccolo ci facciamo rispettare.
E pur essendo un Comune da luogo comune meteorologico (sta sempre il sole), abbiamo per la mobilità in bici un approccio ... come posso definirlo...   
No, ecco, semplicemente non abbiamo alcun approccio, e nemmeno piste ciclabili a dire il vero. 
 
Mi riservo un supplemento di analisi per quando (e se) riuscirò a mettere le mani su dati relativi alla composizione dei nuclei familiari e al numero di immobili 
poichè uno degli aspetti più singolari che in questi ultimi anni abbiamo osservato è l'aumento dei fabbricati alzati (per tacere dei garage scavati). 
Come dire: vuoti a rendere. 

Alle volte mi vengono in mente le anime morte di Gogol.

Nel frattempo si continuano a magnificare le sorti di questa appendice d'Europa, _"forse seconda solo a Berlino come dinamismo"_ (devo veramente 
riportare la fonte della citazione? Hint: non è Crozza). 

I più attenti avranno notato che fra il '91 e il '92 è successo qualcosa di grave agli ottantacinquenni. E' stato un meteorite. 

Scherzo. Ci sono due spiegazioni, entrambe molto plausibili.

* a) L'Istat fino a quella data aveva come ultima classe di età "85 e oltre". Poi ha allungato su "100 e oltre".
* b) Fino a quella data a Salerno gli anziani morivano di noia. Nell'ambito di un ambizioso programma di _welfare della terza età_
si è iniziato ad aprire numerosi cantieri, destinati all'incompiutezza, onde costituire un'abbondante scorta di materiale osservativo 
di cui una popolazione argentata è sempre ghiotta.

Se dovessi esprimere un'opinione non documentata, io mi butterei sulla b).

## D3
Veniamo alle cose belle. La visualizzazione è stata realizzata con [D3](https://d3js.org/), una libreria javascript che consente 
di costruire il DOM html come espressione dei dati. A parte la bellezza e la potenza esplicativa che si coglie già con questo modesto
esempio, voglio solo dire che l'utilizzo del [paradigma funzionale](https://it.wikipedia.org/wiki/Programmazione_funzionale), 
implicito in molti metodi D3, è _fascinating_, come ovviamente direbbe
Spock, ma può nuocere gravemente ad una mente abituata agli oggetti. Consiglio java nei giorni pari, javascript nei dispari, la domenica in montagna.
Se però amate Python, avete la mia stima incondizionata.

Particolare grazie a quel demonio di [Mick Bostock](https://github.com/mbostock) per avere creato la libreria e questa particolarmente ispirante 
[piramide demografica](http://bl.ocks.org/mbostock/4062085) che ho saccheggiato senza ritegno.

Il codice sottostante al grafico lo trovate [qui](https://github.com/andtorg/andtorg.github.io/blob/master/assets/d3-posts/salerno-population/script.js).
Poteva essere più elegante e meno spaghettoso, ne sono consapevole, ma tenevo la verdura sul fuoco.
 
Lunga vita e prosperità.