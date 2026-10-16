Site: https://developer.mozilla.org

Metodo: GET
URL: https://developer.mozilla.org/api/v1/whoami
Código: 200 OK

JS
Metodo: POST
URL: https://developer.mozilla.org/pong/get
Código: 200 OK
CONTENT-TYPE: application/json

HTML
Metodo: GET
URL: https://developer.mozilla.org/pimg/aHR0cHM6Ly9zdGF0aWM0LmJ1eXNlbGxhZHMubmV0L3V1LzIvMTc5MTY0LzE3OTAzNDkwNjctMTk0MHg1MDBfSG9tZXBhZ2VfT2N0X1Rha2VvdmVyLmpwZw%3D%3D.KBVbfEOm53Pp2bINhXNsvIDg%2FCJg5sf8HPvDiqK3JYU%3D
Código: 200 OK
CONTENT-TYPE: image/jpeg

CSS
Metodo: GET
URL: https://developer.mozilla.org/static/client/3391.b611fbe2dc694a57.css
Código: 200 OK
CONTENT-TYPE: text/css



ERRO 404
Metodo: GET
URL: https://developer.mozilla.org/pt-BR/paodequeijo
Código: 404 not found
CONTENT-TYPE: text/html



FETCH/XHR
Metodo: POST
URL: https://rr3---sn-xhcg5uxa-jfcee.googlevideo.com/videoplayback?expire=1792175079&ei=hxfSavTuFYyZ-LAPpraKgAQ&ip=200.250.106.178&id=o-AJ13M65yt7-PEL9LScVtm8IQa5RYImtHWDncQwlgxKii&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=624&met=1792153479%2C&mh=Zy&mm=18%2C29&mn=sn-xhcg5uxa-jfcee%2Csn-2obg05-co&ms=aub%2Crdu&mv=m&mvi=3&pl=16&rms=aub%2Caub&ctier=L&initcwndbps=1219375&siu=1&spc=mpRQ_2NMlKJ7cKYVSC8BfMOH2narNcquWAbrnHL_q3AUEJgBe1lanT7m-mnwETnLhQ&svpuc=1&ns=bFyanmlmWcYwtoxSHyeEgTUZ&sabr=1&rqh=1&mt=1792153061&fvip=4&keepalive=yes&fexp=51565115%2C52184231%2C52227521%2C52279442&c=MWEB&n=fT0M_KnZb7g6Nw&sparams=expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cxpc%2Cctier%2Csiu%2Cspc%2Csvpuc%2Cns%2Csabr%2Crqh&sig=AE0s2JYwRAIge3Q0_bXThwuvi2IN2GSXBEiqECzV7q3v-pSUCrX0ezACIAIeuS4_U1AKa67gWzXyVtcUotkReyZ_cL67AxXfk4_l&lsparams=cps%2Cmet%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIhAOK8Jk9idhjcW8jxbzjp2QJiwOMEqhZgBcTXaW6t3Nn8AiBJPH1KtahZhjAdr3qnVx5JhAROZXIa3W79y1HG-fNAjQ%3D%3D&cpn=7dowJ-vhLIu0_yYO&cver=2.20261014.07.00&rn=3&alr=yes
Código: 200 OK
CONTENT-TYPE: application/vnd.yt-ump



O método para listagem de filmes para o CineTrack será o GET na rota https://CineTrack/api/listarFilmes/. No corpo da resposta vira com content-type text/js contendo os objetos filmes que se encaixam na listagem de filmes, que inicialmente virão em formato de Strings mas depois passarão por um PARSE e voltariam a ser objetos para serem exibidos na tela.