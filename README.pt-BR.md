<div align="center">

[English](README.md) · **Português (Brasil)** · [Español](README.es.md)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="media/aioncore-logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="media/aioncore-logo-light.svg">
  <img alt="AionCore" src="media/aioncore-logo-light.svg" width="340">
</picture>

### Ache o Cubo Oculto, veja o DPS do grupo e não perca nenhum chamado.<br>Um app grátis para o Aion 2 no Windows.

[![Versão](https://img.shields.io/github/v/release/filvoch/AionCoreUpdate?label=vers%C3%A3o&color=1a9bbd)](https://github.com/filvoch/AionCoreUpdate/releases/latest)
![Windows 10 | 11](https://img.shields.io/badge/Windows-10%20%7C%2011-0078D6?logo=windows&logoColor=white)
![Grátis](https://img.shields.io/badge/pre%C3%A7o-gr%C3%A1tis-2ea44f)

<a href="https://github.com/filvoch/AionCoreUpdate/releases/latest/download/AionCore-Setup.exe"><img alt="Baixar o AionCore para Windows (AionCore-Setup.exe)" src="https://img.shields.io/badge/Baixar_para_Windows-AionCore--Setup.exe-1a9bbd?style=for-the-badge&logo=windows&logoColor=white"></a>

<sub>Instalador de uns 160 MB · se atualiza sozinho · [Todas as versões](https://github.com/filvoch/AionCoreUpdate/releases) · [Site](https://aioncore.app)</sub>

<img alt="Captura de tela do Radar de Cubos com norte fixo: você no centro com uma seta para onde você olha, três Cubos Ocultos em volta, o mais perto destacado com uma linha, e o texto &quot;Cube 38 m northeast&quot; e &quot;+2 more · ahead, to the right&quot; (app em inglês, dados simulados)" src="media/shot-radar.jpg" width="820">

</div>

> [!NOTE]
> O medidor precisa do [Npcap](https://npcap.com), e o Aion 2 deve estar em **modo janela** ou **janela sem bordas**. Veja [Instale em 3 passos](#instale-em-3-passos).

## Radar de Cubos Ocultos

Uma janelinha que abre sozinha quando o jogo mostra um Cubo Oculto perto de você e some quando não há nenhum.

- **Automático.** Já vem ligado, abre quando aparece um cubo ainda fechado e se esconde uns 3 segundos depois que o último some. O ✕ esconde só os cubos atuais; o próximo abre o radar de novo.
- **Norte fixo**, como o minimapa do jogo, com uma seta para onde você olha. Prefere que o mapa gire? Escolha **Gira com você**.
- **Vários cubos ao mesmo tempo.** O cubo da vez ganha o ponto maior e a linha; os outros ficam menores e o texto mostra "+N outros".
- **Veja o jogo atrás.** A opacidade do radar vai de 30% a 100%.
- **Avisos que dizem para onde ir:** quando você está a menos de 80, 50, 25 e 10 m, se o cubo está à sua direita, à frente ou atrás, e quando outro jogador já abriu.
- **Próximo ponto.** Depois que um cubo é aberto, o aviso indica o ponto conhecido mais perto, como "~240 m ao nordeste". O medidor traz 3.722 pontos onde cubos já nasceram (direção e distância ainda estão sendo conferidas no jogo).

Tudo fica em **Configurações › Avisos e eventos**. O radar mostra só os cubos que o jogo envia. O jogo só informa a sua posição quando você usa uma habilidade ou dash; sem uma posição recente, o radar mostra "Cubo detectado" e pede para você se mexer.

<p align="center"><img alt="Demonstração animada do Radar de Cubos: um Cubo Oculto a nordeste, à sua frente, se aproxima conforme você anda até ele, de 85 m até 18 m (dados simulados)" src="media/demo.gif" width="720"></p>

## Medidor de DPS do grupo

- **O grupo inteiro numa olhada:** uma linha por jogador, com dano, DPS e parte de cada um. Abas **HPS** e **Recebido** para cura e dano recebido. Escopo **Eu**, **Grupo**, **Raid** ou **Automático**.
- **Cada habilidade aberta:** clique no nome e veja golpes, crítico, costas, multi-hit, média, mínimo e máximo, gráfico e log.
- **Tempos do chefe:** HP do chefe em números, **Derrota em** (estimativa pela velocidade com que o HP cai) e **Fúria em** para chefes com tempo de fúria conhecido.
- **Toda luta guardada no seu PC:** **Histórico**, resumo de cada luta, **Comparar lutas**, **Corridas de chefes**, recapitulação da morte e exportar em JSON, CSV ou PNG.
- **Grupo flutuante:** a vida do seu grupo numa janela pequena.
- **Cinco visuais:** Faixas, Clássico, Denso, Painel e Vidro.

<p align="center"><img alt="Captura de tela do AionCore Meter no visual Faixas numa luta de chefe: no alto o HP do chefe com Derrota em e Fúria em, e embaixo uma linha por jogador, seis jogadores, com dano, DPS e parte (app em inglês, dados simulados, nomes inventados)" src="media/shot-meter.jpg" width="400"></p>

## Avisos fora do jogo e Painel da sala

Deu alt-tab ou minimizou o jogo? Convites de grupo e de Expedição, chamados para entrar e pedidos de entrada aparecem por cima de qualquer janela. Clique e o AionCore traz o jogo para a frente. Ele nunca clica nem aceita nada por você.

O **Painel da sala** mostra quem está na sala, o GS e o poder de combate de cada um e quem está pronto.

<table>
  <tr>
    <td width="50%"><img alt="Captura de tela de três avisos fora do jogo empilhados: chamado para entrar, convite de Expedição e convite de grupo, cada um com classe, nível, GS, poder de combate e servidor do jogador (app em inglês, dados simulados, nomes inventados)" src="media/shot-alerts.jpg"></td>
    <td width="50%"><img alt="Captura de tela do Painel da sala: quatro membros com GS, poder de combate, nível e quem está pronto, uma vaga aberta e dois pedidos para entrar (app em inglês, dados simulados, nomes inventados)" src="media/shot-room.jpg"></td>
  </tr>
  <tr>
    <td align="center"><sub>Avisos fora do jogo</sub></td>
    <td align="center"><sub>Painel da sala</sub></td>
  </tr>
</table>

<sub>Avisos fora do jogo e Painel da sala são recursos de apoiador. Veja [Grátis, com apoio opcional](#grátis-com-apoio-opcional).</sub>

## Mecânicas de chefe

- **Painel de mecânicas:** o que o chefe faz e o que você deve fazer, por DG. Grátis. A cobertura cresce a cada versão, e mecânica ainda não conferida no jogo vem marcada.
- **Avisos de mecânica na tela:** o aviso antes do golpe. Apoiadores primeiro, todo mundo a partir de **10 de novembro de 2026**.

## Painel, Início e atalhos

- **Painel:** horários dos chefes de campo lidos do jogo, eventos e um alerta alguns minutos antes de nascerem os seus chefes de campo favoritos.
- **Início:** uma tela por cima do jogo com o YouTube e o medidor.
- **Atalhos globais** (Ctrl+Alt) que funcionam por cima do jogo. Troque em **Início › Atalhos**.

App e site em 6 idiomas: EN, PT-BR, ES, DE, FR, RU (DE, FR e RU são tradução por máquina, ainda em revisão).

## Veja em ação

Com som e controles (50 s, dados simulados):

https://github.com/user-attachments/assets/f17309fa-6686-4871-b4fb-590bde3b01d0

## Instale em 3 passos

Requisitos: Windows 10 (1809 ou mais novo) ou 11, 64 bits.

1. [Baixe o instalador](https://github.com/filvoch/AionCoreUpdate/releases/latest/download/AionCore-Setup.exe) e execute. Se o Windows mostrar "O Windows protegeu o computador", veja [as perguntas frequentes](#perguntas-frequentes).
2. Instale o [Npcap](https://npcap.com) uma vez, marcando *Install Npcap in WinPcap API-compatible Mode* e *Support loopback traffic*. O medidor usa o Npcap para ler o tráfego de rede do jogo.
3. Abra o AionCore pelo atalho. No Aion 2, use **modo janela** ou **janela sem bordas**: overlays não aparecem sobre tela cheia exclusiva.

O AionCore se atualiza sozinho: consulta este repositório, confere a assinatura digital do instalador e só instala com o Aion 2 fechado. Suas configurações e o histórico de lutas ficam guardados entre as versões.

## Grátis, com apoio opcional

O AionCore é grátis, sem anúncios. Você pode ajudar com qualquer valor no Ko-fi. Um pagamento único de **US$ 15 ou mais, em dólar** (o item da loja do Ko-fi ou uma doação única) faz de você **Apoiador por 12 meses** (sem renovação automática). Valores menores são um agradecimento, sem benefícios. Você recebe **1 ano do selo de Apoiador**, **as atualizações primeiro** e **alguns recursos exclusivos para quem ajuda a manter o AionCore**. **Tudo o que já saiu grátis continua grátis para sempre.**

O que o apoiador tem hoje: avisos fora do jogo, Painel da sala, temas de cor do medidor, acabamento Vidro sobre os visuais Denso, Painel e Faixas, e acesso antecipado aos avisos de mecânica de chefe (até 10/11/2026) e aos avisos da barra de guarda do chefe (até 11/11/2026).

[Apoie o AionCore](https://aioncore.app/apoie/)

## Seus dados

Suas lutas ficam no seu PC. Enviar lutas ao [aioncore.app](https://aioncore.app) (ranking e páginas de luta) é opcional, precisa de conta e vem desligado. Detalhes na [política de privacidade](https://aioncore.app/privacidade/).

## Perguntas frequentes

<details>
<summary><b>Dá ban?</b></summary>

O medidor lê o tráfego de rede do seu PC e o título da janela do jogo. Não altera arquivos nem a memória do jogo. Mesmo assim, nenhuma ferramenta desse tipo pode garantir o que a política do jogo decide: o risco do uso é seu.
</details>

<details>
<summary><b>Quais servidores e regiões funcionam?</b></summary>

Feito e testado no Aion 2 Global (servidores da América do Sul). Em outras regiões (Taiwan, Coreia) pode funcionar, mas ainda não é garantido.
</details>

<details>
<summary><b>O medidor é preciso?</b></summary>

Ele conta o que o jogo envia. Em alguns casos o medidor não enxerga tudo, e ele avisa quando não está lendo o jogo. O site explica como ele mede: [precisão](https://aioncore.app/precisao/).
</details>

<details>
<summary><b>Precisa rodar como administrador?</b></summary>

Não. O AionCore instala só para o seu usuário e nunca pede permissão de administrador por conta própria. Se o seu Npcap foi instalado com a opção *Restrict Npcap driver's access to Administrators only*, o medidor mostra o botão **Reabrir como administrador** (vale só daquela vez). Para nunca precisar, reinstale o Npcap sem marcar essa opção.
</details>

<details>
<summary><b>O medidor some quando o jogo está na frente.</b></summary>

O jogo está em **Tela cheia** exclusiva, e o Windows não mostra janelas por cima dela. Nas opções de vídeo do Aion 2, troque para **Janela sem bordas**.
</details>

<details>
<summary><b>O Windows ou o antivírus avisou ao instalar.</b></summary>

O instalador não tem certificado pago de assinatura de código, então o Windows não conhece o editor e mostra "O Windows protegeu o computador". Clique em **Mais informações** e depois em **Executar assim mesmo**. Um antivírus pode pedir confirmação pelo mesmo motivo. Para conferir que o arquivo é o original, compare o SHA-256 que está em `latest.json` (nos Assets da versão) com o resultado de:

```powershell
Get-FileHash .\AionCore-Setup.exe
```
</details>

<details>
<summary><b>O que sai do meu PC?</b></summary>

As lutas só saem do PC se você ligar o envio (opcional, desligado por padrão). O medidor baixa os ícones das habilidades da CDN do jogo e consulta este repositório para saber se há versão nova. A atualização automática nunca instala com o Aion 2 aberto.
</details>

<details>
<summary><b>Como desinstalo? Perco meus dados?</b></summary>

*Configurações do Windows › Aplicativos instalados › AionCore*. O desinstalador pergunta se apaga também seus dados (histórico, configurações); por padrão, mantém. Instalar uma versão nova por cima também mantém tudo.
</details>

<details>
<summary><b>É oficial? O código é aberto?</b></summary>

Não e não. O AionCore é um projeto independente, feito por um jogador, sem afiliação nem endosso da NCSOFT. O código-fonte não é público: este repositório guarda só os instaladores publicados e esta página.
</details>

## Bugs e contato

Abra uma [issue](https://github.com/filvoch/AionCoreUpdate/issues) ou escreva para contato@aioncore.app. No app: **Configurações › Ajuda e comunidade**.

## Créditos

AionCore por **Guilherme Filvoch (Simavi)**.
Projeto de fã independente, sem vínculo com a NCSOFT. Aion 2 e seus ícones, nomes e artes pertencem à NCSOFT e a seus licenciantes.
