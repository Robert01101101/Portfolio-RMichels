---
slug: "clirioScanShare"
name:
  en: "Clirio Scan Share"
  de: "Clirio Scan Share"
projectType:
  en: "Unity App Feature + Website"
  de: "Unity App Feature + Website"
year: "2023"
company: "Clirio"
inDevelopment: false
roles: ["blazor", "back-end", "front-end"]
description:
  en: "Scan Share is a feature of the Clirio product suite, for sharing photogrammetry scans quickly, and displaying them in a webviewer."
  de: "Scan Share ist eine Funktion der Clirio-Produktreihe zum schnellen Teilen von Photogrammetrie-Scans und deren Anzeige in einem Webviewer."
links:
  - label: "Sample Share"
    url: "https://clirioview-viw-dev.azurewebsites.net/guest/f-aVQEv0LytBKHa8vARMx-Nl"
  - label: "Clirio View Desktop"
    url: "https://apps.microsoft.com/store/detail/clirio-view-desktop/9NB14S8DFWFP"
order: 2
---

<section class="sectionText">
    <h2>Übersicht</h2>
    <p>Mit der Clirio Scan Share-Funktion können Benutzer einen mit der Clirio Scan-App erfassten Photogrammetrie-Scan schnell teilen. Die Funktion besteht aus Freigabeoptionen in der in Unity entwickelten Clirio View-App und einem in Blazor und Three.js entwickelten Webviewer, über den geteilte Scans betrachtet werden können. Durch Drücken der Freigabe-Schaltfläche in einer der Clirio View-Apps öffnet sich ein Pop-up-Fenster zur Konfiguration der Freigabe. Der Benutzer hat die Möglichkeit, den Ablauf und den Passwortschutz festzulegen und zu verlangen, dass der Betrachter in den Arbeitsbereich eingeladen wurde. In diesem Fall muss sich der Empfänger mit seinem Clirio-Konto anmelden, um den Scan anzuzeigen.</p> 
    <p>Sobald der Benutzer mit den ausgewählten Optionen zufrieden ist, kann er den Link erstellen und ihn entweder in die Zwischenablage kopieren oder die Freigabefunktion verwenden, um die plattformeigenen Freigabeoptionen auszulösen. Unter iOS wird beispielsweise der Freigabedialog mit kompatiblen Apps wie Messenger geöffnet, während unter Windows die Mail-App geöffnet wird. Es gibt auch eine Option, mit der die Nutzer ein formatiertes, eingebettetes Iframe-Element für die Freigabe konfigurieren und generieren können.</p>
    <p>Der Webviewer, mit dem die Empfänger den Scan betrachten können, soll so einfach und zugänglich wie möglich sein. Der Scan kann aus verschiedenen Blickwinkeln betrachtet werden, es werden einige Metadaten und eine Maßstabslegende angezeigt, und es gibt einige Schaltflächen zum Ein- und Ausblenden von Elementen.</p>
  </section>


  
  <figure ignorecarousel>
    <iframe src="https://clirioview-viw-prd.azurewebsites.net/guest/MEVdEANk9_Zhr6tlm4ibd1Vn" style="width: 100%" class="clirioScanShareEmbed"></iframe>
    <figcaption>Ein interaktives Beispiel für eine eingebettete Scanshare. Klicken und ziehen Sie, um das Modell aus verschiedenen Blickwinkeln zu betrachten. Der scan ist auch erreichbar auf seiner eigenen <a href="https://clirioview-viw-prd.azurewebsites.net/guest/MEVdEANk9_Zhr6tlm4ibd1Vn" target="_blank">Seite</a>.</figcaption>
  </figure>


  
  <section class="sectionText">
    <h2>Entwicklung</h2>
    <p>Für die Entwicklung dieser Funktion gab es zwei Bereiche: die gemeinsame Nutzung der Benutzeroberfläche und der Logik der clientseitigen Anwendung und den Webviewer.</p>

    <h3>Sharing UI und Logik</h3>
    <p>Entwickelt mit C# in Unity, als Pop-up, das über die Beobachtungsdetails eines beliebigen Scans in der Clirio View App zugänglich ist. Die Benutzeroberfläche wurde in Figma in Zusammenarbeit mit Jordan Wischmann entworfen.<a href="https://www.linkedin.com/in/jordan-wischmann-32a4b380/" target="_blank">Jordan Wischmann</a>.</p>

    <h3>Webviewer</h3>
    <p>Entwickelt mit Blazor und Three.js. Backend Token-Sharing wurde implementiert von <a href="https://www.linkedin.com/in/timthibault/" target="_blank">Timothy Thibault</a>.</p>
  </section>


  
  <section class="sectionMedia">
    <figure ignorecarousel>
      <div class="mediaRow mediaRow-equalWidth">
        <figure onclick="viewImage(this)">
          <img src="/assets/img/clirioScanShare/lqip/scanShareClientSideUi.png">
          <figcaption>Share UI</figcaption>
        </figure>
        <figure onclick="viewImage(this)">
          <img src="/assets/img/clirioScanShare/lqip/scanShareClientSideUiEmbed.png">
          <figcaption>Embed UI</figcaption>
        </figure>
        <figure onclick="viewImage(this)">
          <img src="/assets/img/lqip/clirioScanShare.jpg" class="whiteFrame">
          <figcaption>Webviewer</figcaption>
        </figure>
      </div>
    </figure>
  </section>

  
  <section class="sectionText">
    <h2>Sharing UI und Logik</h2>
    <p>Die Benutzeroberfläche für die Freigabe hat mehrere Iterationen durchlaufen. Ursprünglich entwickelt mit <a href="https://learn.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/mrtk2/" target="_blank">MRTK2</a> mit wenigen Optionen, wurde die Funktion später um Funktionen wie Ablaufdatum, Passwortschutz und Einbettung erweitert. Im Jahr 2023 wurde die Benutzeroberfläche neu designed in Zusammenarbeit mit <a href="https://www.linkedin.com/in/jordan-wischmann-32a4b380/" target="_blank">Jordan Wischmann</a>, der Mockups in Figma entwarf, als die Clirio View App mirgriert wurde zu <a href="https://learn.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/mrtk3-overview/" target="_blank">MRTK3</a>.</p>
    <p><a href="https://www.linkedin.com/in/timthibault/" target="_blank">Timothy Thibault</a>. Das zurückgegebene Ergebnis enthält eine URL, die der Client dem Benutzer anzeigen und in die nativen Freigabeoptionen für jede Plattform aufnehmen kann.</p>
    <p>Die größte Herausforderung für mich war die Gestaltung der Benutzeroberfläche, da es eine Vielzahl von Optionen für den Benutzer gab. Dazu gehörte auch die Option, Freigaben privat zu machen, so dass Benutzer die Freigabe intern auf Teams in Arbeitsbereichen beschränken konnten, was ebenfalls einen zusätzlichen Authentifizierungsfluss im Webviewer erforderte. Die Vielzahl der Optionen erschwerte auch die Gestaltung einer kompakten Benutzeroberfläche. Ich nutzte dynamisches Design und Layouts, damit versteckte Optionen wie die Verlängerung des Gültigkeitszeitraums oder die Änderung des Passworts elegant ein- oder ausgeblendet werden konnten. Die Entwicklung der Logik war ein relativ einfacher Prozess, die größere Herausforderung war die Überlegung, wie die Funktion überhaupt funktionieren sollte. Nach jeder Benutzerinteraktion wird die Benutzeroberfläche aktualisiert, um der Freigabekonfiguration und allen anderen Zuständen zu entsprechen. Wenn es eine Freigabe gibt, die mit der Konfiguration übereinstimmt, wird dieser vorhandene Link angezeigt, andernfalls wird die Schaltfläche zum Erzeugen einer Freigabe angezeigt.</p>
    <p>Eine interessante Änderung meiner Herangehensweise an das Schreiben von Controllern wurde zum ersten Mal in diesem Feature getestet, nach einer Diskussion mit meinem Teamkollegen <a href="https://www.linkedin.com/in/toniostillman" target="_blank">Tonio Stillman</a>. <code>OnClick()</code> Event. Hier habe ich stattdessen alle Ereignis-Listener im Controller selbst gesetzt, alle entsprechenden Listener-Funktionen privat gehalten und die Einrichtung des Inspektors vereinfacht, so dass jede Schaltfläche nur einmal dem Controller zugewiesen wird und keine weitere Referenz benötigt wird. Dies macht die Einrichtung im Editor weniger fehleranfällig und wartbar, da es weniger Verständnis für den Code erfordert.</p>
  </section>

  
  <section class="sectionMedia">
    <figure ignorecarousel>
      <div class="mediaRow mediaRow-centered">
        <figure onclick="viewImage(this)">
          <img src="/assets/img/clirioScanShare/lqip/scanShareWalkthrough.jpg" lqip-gif class="whiteFrame">
          <figcaption>Share UX Walkthrough</figcaption>
        </figure>
      </div>
    </figure>
  </section>

  
  <section class="sectionText">
    <h2>Webviewer</h2>
    <p>Die Implementierung des Webviewers war die komplexere Geschichte, da es sich um eine eigenständige Anwendung handelt und die meisten Funktionen von Grund auf neu erstellt werden mussten. Der Viewer wurde in C# mit Blazor und JavaScript mit Three.js geschrieben und verwendet Tailwind CSS für das Styling. Ich hatte bereits in der Vergangenheit mit Three.js gearbeitet und genoss es, es wieder zu verwenden, und ein Großteil meiner Arbeit drehte sich darum, den Viewer korrekt einzurichten.</p>
    <p></p>
    <p>Zu den Herausforderungen bei der Einrichtung von Three.js gehörten das Hinzufügen von Unterstützung für das Laden der in der MTL-Datei definierten Texturdateien mit den korrekten SAS-Tokens, die Sicherstellung, dass verschiedene MTL-Dateiformate und Materialeigenschaften unterstützt und wie gewünscht angezeigt werden, und die Gestaltung eines dynamischen Viewers, der eine breite Palette von Modellgrößen und -formen auf einer Vielzahl von Geräten unterstützt.</p>
  </section>


   
  <section class="sectionMedia">
    <div class="divText">
      <h2>Code Beispiel</h2>
      <p></p>
    </div>
    <script src="https://gist.github.com/Robert01101101/ec153ae228a8ae3f6fe28b143073b669.js"></script>
  </section>
