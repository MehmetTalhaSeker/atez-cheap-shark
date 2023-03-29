Odev Listesi

Kullanilacak API => https://apidocs.cheapshark.com/#intro

1- Servis uzerinde ki endpointlerin hepsi entegre edilmesi gerekmektedir.
2- Ozellikler olarak;
2.1 - Bir oyun ismi ile aradigim zaman o oyun veritabanimda var ise en guncel degerleri ile guncellenmesi gerekmektedir.
2.2 - Bir oyun ismi ile aradigim zaman o oyun veritabanimda yok ise onun kaydi olusturulmasi gerekmektedir.
2.3 Oyun icin fiyati dustugu zaman bir alarm kurmak isterim
2.4 Aradigim oyunun en guncel ve en ucuz halini hangi platform(store) uzerinden bulmak isterim goruntulenmesi
2.5 Birden fazla oyunun ismi ile aradigim zaman onlarla alakali indirimleri gormek isterim
3. Gunluk olarak cron job yardimi ile listemdeki oyunlari guncellemek isterim.
4. Bir oyunun birden fazla indirimi oldugu magaza olabilir ve birden fazla magazada gosterilebilir seklinde senaryolari dusunerek veritabani dizayni yapmayi unutmayin arkadaslar. (lb4 relation komutu ile alakali okuyabilirsiniz, ornek olmasi adina => https://loopback.io/doc/en/lb4/todo-list-tutorial-relations.html).

Makaleler

- https://khalilstemmler.com/articles/enterprise-typescript-nodejs/use-dtos-to-enforce-a-layer-of-indirection/ (DTO - Data Transfer Object ornekleri ve neden kullanildigina dair)
- https://refactoring.guru/design-patterns (Tum kullanilan dizayn patternler) - Burada ozellikle singleton, builder, factory, observer, decorator, strategy olanlara bakip anlaminizda fayda var
-  Domain Driven Design (https://medium.com/microtica/the-concept-of-domain-driven-design-explained-3184c0fd7c3f)

Tasklar icin okunacaklar
- https://loopback.io/doc/en/lb4/REST-connector.html (Connector configuration icin)
- https://loopback.io/doc/en/lb4/Running-cron-jobs.html (CronJob icin)
- https://loopback.io/doc/en/lb2/Querying-data.html (Bir veriyi query yaparken kullanabilecekler icin)
-  https://loopback.io/doc/en/lb4/Relations.html (Model relationship)