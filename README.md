# Uzstādīšana

Nepieciešams: NodeJS LTS, PNPM

```sh
pnpm install
pnpm run dev
```

# Uzdevums

Spēles sākumā cilvēks-spēlētājs norāda spēlē izmantojamas skaitļu virknes garumu, kas var būt diapazonā no 15 līdz 25 skaitļiem. Spēles programmatūra gadījuma ceļā saģenerē skaitļu virkni atbilstoši uzdotajam garumam, tajā iekļaujot skaitļus no 1 līdz 9.

## Spēles apraksts

Spēles sākumā ir dota ģenerētā skaitļu virkne. Kopīgs punktu skaits ir 0 (šajā spēlē punkti netiek skaitīti katram spēlētājam atsevišķi). Spēlē arī tiek izmantota banka, kura sākotnēji vienāda ar 0. Spēlētāji izpilda gājienus secīgi. Gājiena laikā spēlētājs aizvieto jebkuru skaitļu pāri (divus blakus stāvošus skaitļus), pamatojoties uz šādiem principiem:

- ja divu blakus stāvošu skaitļu summa ir lielāka par 7, tad skaitļu pāri aizvieto ar 1 un kopīgajam punktu skaitam pieskaita 1 punktu;
- ja divu blakus stāvošu skaitļu summa ir mazāka par 7, tad skaitļu pāri aizvieto ar 3 un no kopīgā punktu skaita atņem 1 punktu;
- ja divu blakus stāvošu skaitļu summa ir vienāda ar 7, tad skaitļu pāri aizvieto ar 2 un spēles bankai pieskaita 1 punktu.

Spēle beidzas, kad skaitļu virknē paliek tikai viens skaitlis. Ja gan bankas punktu skaits, gan kopīgais punktu skaits ir pāra skaitlis, tad uzvar spēlētājs, kurš uzsāka spēli. Ja gan bankas punktu skaits, gan kopīgais punktu skaits ir nepāra skaitlis, tad uzvar otrais spēlētājs. Visos citos gadījumos ir neizšķirts rezultāts.

# Apraksts

Darba izpildei studējošo komanda saņem no mācībspēka spēles aprakstu.

Komanda drīkst mainīt spēles nosacījumus. Izmaiņas ir jāievieš it īpaši gadījumos, kad spēles laikā tiek iegūts stāvoklis, kas nav atrunāts sākotnējā spēles aprakstā, vai arī pie kaut kādiem nosacījumiem nav iespējams sasniegt definēto spēles beigu stāvokli. Spēles nosacījumus var arī mainīt gadījumos, ja sākotnējais spēles apraksts noved pie vienkārša spēles koka, kura var pilnībā ģenerēt, un līdz ar to nav iespējams apmierināt praktiskā darba prasības pret heiristiskā novērtējuma funkcijas izstrādi.
Veicamie uzdevumi

Programmatūrā obligāti ir jānodrošina šādas iespējas lietotājam:

- [ ] izvēlēties, kurš uzsāk spēli: cilvēks vai dators;
- [ ] izvēlēties, kuru algoritmu izmantos dators konkrētajā spēles reizē: Minimaksa algoritmu vai Alfa-beta algoritmu;
- [ ] izpildīt gājienus un redzēt izmaiņas spēles laukumā pēc gājienu (gan cilvēka, gan datora) izpildes;
- [ ] uzsākt spēli atkārtoti pēc kārtējās spēles pabeigšanas.

Programmatūrai ir jānodrošina grafiskā lietotāja saskarne (komandrindiņas spēles netiks pieņemtas). Šajā gadījumā runa nav par sarežģītu, 3D grafisko saskarni, bet gan par vizuālu elementu tādu kā izvēlnes, pogas, teksta lauki, ikonas, saraksti, u.c. izmantošanu.

Izstrādājot programmatūru, studentu komandai obligāti ir jārealizē:

- [ ] spēles koka daļas glabāšana datu struktūras veidā (klases, saistītie saraksti, utt.). Netiks pieņemti un vērtēti darbi, kuros datu struktūra netiks izveidota, bet tā vietā tiks izmantots mainīgo kopums;
- [ ] spēles koka ģenerēšana līdz noteiktajam līmenim atkarībā no spēles sarežģītības un studentu komandai pieejamiem skaitļošanas resursiem;
- [ ] heiristiskā novērtējuma funkcijas izstrāde un tās pielietošana laikā, kad datoram ir jāveic gājiens;
- [ ] Minimaksa algoritms un Alfa-beta algoritms (abiem ir jābūt realizētiem kā Pārlūkošana uz priekšu pār n-gājieniem);
- [ ] 10 eksperimenti ar katru no algoritmiem, fiksējot datora un cilvēka uzvaru skaitu, datora ģenerēto un novērtēto virsotņu skaitu, datora vidējo laiku gājiena izpildei.

Praktiskajā darbā nav izvirzīta prasība lietotāja saskarnē vizuāli atspoguļot spēles koku. Spēles kokam ir jābūt atspoguļotajam datu struktūrā, kuru apstrādā spēles algoritms, lai dators varētu veikt gājienus spēlē.

Tādējādi, izstrādājot darbu, studējošo komandai ir jāizpilda šādi soļi:

- [ ] jāsaņem spēle no mācībspēka;
- [ ] brīvi jāizvēlas programmēšanas vide/valoda;
- [ ] jāizveido datu struktūra spēles stāvokļu glabāšanai;
- [ ] jāprojektē, jārealizē un jātestē spēles algoritmi;
- [ ] jāveic eksperimenti ar abiem algoritmiem;
- [ ] jāsagatavo atskaite par izstrādāto spēli un tā ir jāiesniedz e-studiju kursā;
- [ ] jāveic komandas dalībnieku savstarpējā vērtēšana;
- [ ] jāpiesakās aizstāvēšanas laikam;
- [ ] jāaizstāv izstrādātais darbs.
