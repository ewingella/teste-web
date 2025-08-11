# Fiche Avancée : CSS Grid

## 1. Contexte et Intérêt

CSS Grid Layout est le modèle de grille bidimensionnelle de référence en CSS, offrant un contrôle précis des placements et des dimensions pour des interfaces complexes et réactives. Contrairement à Flexbox, optimisé pour un seul axe, Grid gère simultanément lignes et colonnes, facilitant la conception de tout type de layout (dashboards, galerie, formulaires…).

## 2. Concepts Clés

- **L’unité `fr`** : représente une fraction de l’espace disponible dans le **grid container**. Après allocation des pistes à taille fixe (px, %, etc.), l’espace restant (hors `gap`) est réparti entre les unités `fr`. Par ex. `grid-template-columns: 1fr 2fr;` → la 2ᵉ colonne prend deux fois l’espace de la 1ʳᵉ.
  ```css
  .container {
    grid-template-columns: 150px 2fr repeat(2, 1fr) minmax(100px, auto);
    grid-template-rows: auto 1fr 200px;
  }
  ```
- **Fonctions avancées** :
  - `repeat(count, tracks)` : répète un motif de colonnes ou de lignes. Utile pour éviter de dupliquer du code.
    ```css
    /* équivalent à 1fr 1fr 1fr 1fr */
    grid-template-columns: repeat(4, 1fr);

    /* motif mixte */
    grid-template-rows: repeat(2, 100px 200px);
    ```
  - `minmax(min, max)` : définit une taille minimale et maximale pour une piste.
    ```css
    /* chaque colonne fera au moins 150px et au plus 1fr */
    grid-template-columns: repeat(3, minmax(150px, 1fr));
    ```
  - `fit-content(max)` : taille automatique jusqu’à une limite. Combine le comportement de `max-content` et une valeur `max`.
    ```css
    /* la colonne grandit selon son contenu mais ne dépasse pas 300px */
    grid-template-columns: fit-content(300px);
    ```
  - `max-content` : dimensionne la piste pour afficher le contenu sans le couper.
    ```css
    /* taille suffisante pour le contenu le plus large */
    grid-template-columns: max-content;
    ```
  - `min-content` : dimensionne la piste pour minimiser l’espace, sans overflow, en forçant le contenu à sa plus petite taille possible.
    ```css
    /* taille minimale sans provoquer de débordement */
    grid-template-columns: min-content;
    ```

### 3.3 grid-template-areas
La propriété `grid-template-areas` offre une façon visuelle et déclarative de nommer et de disposer les zones de la grille.

- **Syntaxe** :
  ```css
  .container {
    display: grid;
    grid-template-areas:
      "header header header"
      "nav    main   aside"
      "footer footer footer";
  }
  ```
  Chaque chaîne (entre guillemets) représente une ligne de la grille ; chaque mot correspond à la zone nommée pour une cellule. Les zones contiguës portant le même nom forment un `Grid Area` étendu.

- **Assignation aux items** :
  ```css
  .header { grid-area: header; }
  .nav    { grid-area: nav; }
  .main   { grid-area: main; }
  .aside  { grid-area: aside; }
  .footer { grid-area: footer; }
  ```
  Le nom attribué à chaque item doit correspondre à l’un des identifiants déclarés dans `grid-template-areas`.

- **Bonnes pratiques** :
  - Les zones déclarées doivent former un maillage rectangulaire ; évitez les formes non contiguës.
  - Utilisez un point (`.`) pour indiquer une cellule vide :
    ```css
    grid-template-areas:
      "header header"
      ".      sidebar"
      "footer footer";
    ```
  - Combinez `grid-template-areas` avec des noms de lignes personnalisés pour maximiser la lisibilité.

- **Exemple complet** :
  ```html
  <div class="page">
    <header>En-tête</header>
    <nav>Navigation</nav>
    <main>Contenu principal</main>
    <aside>Barre latérale</aside>
    <footer>Pied de page</footer>
  </div>
  ```
  ```css
  .page {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 16px;
    grid-template-areas:
      "header  header  header"
      "nav     main    aside"
      "footer  footer  footer";
  }
  ```
  Cette configuration place `header` sur toute la largeur, puis dispose `nav`, `main` et `aside` côte-à-côte, et termine par `footer` sur toute la largeur.

#### Annexe 3.2.1 — Raccourci `gap`

Le raccourci `gap` permet de définir `row-gap` et `column-gap` en une seule déclaration.

```css
/* même espacement pour lignes et colonnes */
.container { gap: 12px; }

/* 1ère valeur = lignes (vertical) ; 2e = colonnes (horizontal) */
.container { gap: 8px 24px; }
```

Notes :
- `row-gap` et `column-gap` restent utiles si vous ciblez un seul axe.
- Les alias historiques `grid-gap`, `grid-row-gap`, `grid-column-gap` sont dépréciés.
- `gap` fonctionne aussi avec **Flexbox** et accepte `px`, `rem`, `%`, `clamp()`…
- `gap` s’applique **entre** les pistes, pas sur les bords extérieurs du container.

#### Annexe 2.A — Schémas visuels : `fr`, `gap`, `minmax`, `fit-content`

> Objectif : visualiser la répartition de l’espace et l’effet des unités/fonctions avancées.

**Schéma A — Répartition avec `fr`**
```text
Container (largeur W)
┌──────────────────────────────────────────────┐
│         1fr         │         2fr           │
│  (≈ 1/3 de S)       │     (≈ 2/3 de S)      │
└──────────────────────────────────────────────┘
S = W − (pistes fixes) − (gaps)
```
```css
.container { grid-template-columns: 1fr 2fr; }
```
- La 2ᵉ colonne prend ~2× plus d’espace que la 1ʳᵉ.
- Les `fr` se partagent **uniquement l’espace restant** après déduction des tailles fixes et des `gap`.

**Schéma B — Fixe + `fr`**
```text
W = 900px, gap = 20px
┌──────────────────────────────────────────────┐
│ 150px fixe │  gap  │       1fr       │ 1fr  │
└──────────────────────────────────────────────┘
Espace restant S = 900 − 150 − 20 = 730px → chaque 1fr ≈ 365px
```
```css
.container { grid-template-columns: 150px 1fr 1fr; gap: 20px; }
```

**Schéma C — `gap` (entre pistes, pas aux bords)**
```text
┌──────col1──────┬─gap─┬──────col2──────┬─gap─┬──────col3──────┐
^                                                    ^
Bord du container (pas de gap ici)                   Bord du container
```
```css
.container { grid-template-columns: repeat(3, 1fr); gap: 16px; }
```

**Schéma D — `minmax()` avant/après seuil**
```text
3 colonnes: minmax(150px, 1fr)
Scenario narrow (W petit)
┌───────────────┬───────────────┬───────────────┐
│    150px      │     150px     │     150px     │  (collent au min)
└───────────────┴───────────────┴───────────────┘

Scenario wide (W grand)
┌──────────────────┬──────────────────┬──────────────────┐
│        1fr       │        1fr       │        1fr       │ (s’étirent)
└──────────────────┴──────────────────┴──────────────────┘
```
```css
.container { grid-template-columns: repeat(3, minmax(150px, 1fr)); }
```

**Schéma E — `fit-content(max)`**
```text
Contenu → «  Texte long…  »
┌───────────────col──────────────┐
│ texte s’étire jusqu’à max=300px│
└────────────────────────────────┘  (puis arrête de croître)
```
```css
.container { grid-template-columns: fit-content(300px) 1fr; }
```
- La piste grandit en fonction de son contenu **jusqu’à** la limite `max`.

**Schéma F — `min-content` vs `max-content`**
```text
max-content : largeur nécessaire pour ne rien couper
┌─────────────────────────────────────────────┐
│«UnMotTrèsTrèsLongSansCoupure»               │
└─────────────────────────────────────────────┘

min-content : largeur minimale sans overflow
┌─────────────┐
│«UnMotTrès…» │  (les règles de césure/overflow peuvent s’appliquer)
└─────────────┘
```
```css
.container { grid-template-columns: min-content 1fr max-content; }
```

#### Annexe 2.B — Snippets testables (Playground)

> Copiez-collez ces extraits dans un fichier `.html` pour tester. Chaque démo est autonome.

**Playground A — Répartition avec `fr`**
```html
<!doctype html>
<meta charset="utf-8" />
<title>Grid — fr</title>
<style>
  .demo { display:grid; grid-template-columns: 1fr 2fr; gap:12px; padding:12px; background:#f6f7f9; }
  .box { background:#dde3f1; padding:12px; border:1px solid #c7cee0; }
</style>
<div class="demo">
  <div class="box">1fr</div>
  <div class="box">2fr (≈ 2× la 1ʳᵉ)</div>
</div>
```

**Playground B — Mix fixe + `fr` + `gap`**
```html
<!doctype html>
<meta charset="utf-8" />
<title>Grid — fixed + fr + gap</title>
<style>
  .demo { width:900px; margin:auto; display:grid; grid-template-columns:150px 1fr 1fr; gap:20px; padding:12px; background:#f6f7f9; }
  .box { background:#e9f1dd; padding:12px; border:1px solid #d3e2bd; }
</style>
<div class="demo">
  <div class="box">150px fixe</div>
  <div class="box">1fr</div>
  <div class="box">1fr</div>
</div>
```

**Playground C — `gap` (une ou deux valeurs)**
```html
<!doctype html>
<meta charset="utf-8" />
<title>Grid — gap</title>
<style>
  .demo { display:grid; grid-template-columns:repeat(3, 1fr); padding:12px; background:#f6f7f9; }
  .demo.same { gap:16px; }
  .demo.diff { gap:8px 24px; } /* lignes 8px, colonnes 24px */
  .box { background:#ffe9d6; padding:12px; border:1px solid #ffcf9e; }
</style>
<h4>Même `gap` sur les deux axes</h4>
<div class="demo same">
  <div class="box">A</div><div class="box">B</div><div class="box">C</div>
</div>
<h4>`row-gap` ≠ `column-gap` via le raccourci</h4>
<div class="demo diff">
  <div class="box">A</div><div class="box">B</div><div class="box">C</div>
</div>
```

**Playground D — `minmax()` (réduisez/élargissez la fenêtre)**
```html
<!doctype html>
<meta charset="utf-8" />
<title>Grid — minmax</title>
<style>
  .demo { display:grid; grid-template-columns:repeat(3, minmax(150px, 1fr)); gap:12px; padding:12px; background:#f6f7f9; }
  .box { background:#f1ddf0; padding:12px; border:1px solid #e0c1df; }
</style>
<div class="demo">
  <div class="box">min 150px / max 1fr</div>
  <div class="box">min 150px / max 1fr</div>
  <div class="box">min 150px / max 1fr</div>
</div>
```

**Playground E — `fit-content(max)`**
```html
<!doctype html>
<meta charset="utf-8" />
<title>Grid — fit-content</title>
<style>
  .demo { display:grid; grid-template-columns: fit-content(300px) 1fr; gap:12px; padding:12px; background:#f6f7f9; }
  .box { background:#e6f7ff; padding:12px; border:1px solid #bfe7ff; }
  .long { white-space:nowrap; }
</style>
<div class="demo">
  <div class="box long">Texte trèèès long qui ne doit pas dépasser 300px…</div>
  <div class="box">Colonne fluide</div>
</div>
```

**Playground F — `min-content` vs `max-content`**
```html
<!doctype html>
<meta charset="utf-8" />
<title>Grid — min/max-content</title>
<style>
  .demo { display:grid; grid-template-columns: min-content 1fr max-content; gap:12px; padding:12px; background:#f6f7f9; }
  .box { background:#fff3f3; padding:12px; border:1px solid #ffd1d1; }
  .nowrap { white-space:nowrap; }
</style>
<div class="demo">
  <div class="box nowrap">UnMotTrèsTrèsLongSansCoupure</div>
  <div class="box">Colonne centrale fluide</div>
  <div class="box nowrap">UnMotTrèsTrèsLongSansCoupure</div>
</div>
```

**Playground G — `grid-template-areas` (layout simple)**
```html
<!doctype html>
<meta charset="utf-8" />
<title>Grid — template areas</title>
<style>
  .page { display:grid; grid-template-columns: 1fr 3fr 1fr; grid-template-rows: auto 1fr auto; gap:12px; padding:12px; background:#f6f7f9;
          grid-template-areas: "header header header" "nav main aside" "footer footer footer"; }
  header{ grid-area:header; background:#dff7e8; padding:12px; border:1px solid #b7e7c8; }
  nav   { grid-area:nav;    background:#e8e8ff; padding:12px; border:1px solid #cacaFF; }
  main  { grid-area:main;   background:#fffbe6; padding:12px; border:1px solid #f2e2a2; }
  aside { grid-area:aside;  background:#fdeef6; padding:12px; border:1px solid #f3c0dc; }
  footer{ grid-area:footer; background:#e6f2ff; padding:12px; border:1px solid #bfd8ff; }
</style>
<div class="page">
  <header>En‑tête</header>
  <nav>Navigation</nav>
  <main>Contenu principal</main>
  <aside>Aside</aside>
  <footer>Pied de page</footer>
</div>
```

**Playground H — `auto-fit` vs `auto-fill` (galerie responsive)**
```html
<!doctype html>
<meta charset="utf-8" />
<title>Grid — auto-fit vs auto-fill</title>
<style>
  .wrap { display:flex; gap:16px; padding:12px; background:#f6f7f9; }
  .gallery { display:grid; gap:12px; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); padding:12px; background:#fff; border:1px solid #eee; flex:1; }
  .gallery.fill { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
  .card { background:#f4f4f4; height:80px; border:1px dashed #ccc; display:flex; align-items:center; justify-content:center; }
</style>
<div class="wrap">
  <section class="gallery fit">
    <div class="card">auto-fit 1</div>
    <div class="card">auto-fit 2</div>
    <div class="card">auto-fit 3</div>
    <div class="card">auto-fit 4</div>
  </section>
  <section class="gallery fill">
    <div class="card">auto-fill 1</div>
    <div class="card">auto-fill 2</div>
    <div class="card">auto-fill 3</div>
    <div class="card">auto-fill 4</div>
  </section>
</div>
```

#### Annexe 2.C — Fichier unique (toutes les démos)

> Un seul fichier HTML contenant **tous** les playgrounds. Copiez-collez tel quel dans `grid-playgrounds.html` et ouvrez-le dans votre navigateur.

```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>CSS Grid — Playgrounds réunis</title>
  <style>
    :root { --bg:#f6f7f9; --bd:#e3e7ef; --pad:12px; }
    html, body { margin:0; padding:0; font:14px/1.4 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, sans-serif; background:#fff; }
    header { position:sticky; top:0; background:#fff; border-bottom:1px solid var(--bd); padding:10px var(--pad); z-index:10; }
    header h1 { margin:0 0 6px; font-size:18px; }
    nav { display:flex; flex-wrap:wrap; gap:8px; }
    nav a { text-decoration:none; padding:6px 10px; border:1px solid var(--bd); border-radius:6px; }
    main { padding:20px var(--pad) 60px; max-width:1000px; margin:auto; }
    section { margin:28px 0; padding:16px; border:1px solid var(--bd); border-radius:10px; background:#fff; }
    section h2 { margin-top:0; font-size:16px; }
    .hint { color:#444; font-size:12px; margin:8px 0 0; }
    .grid { background:var(--bg); padding:var(--pad); }
    .box { padding:var(--pad); border:1px solid #cfd6e4; background:#e9eef9; }

    /* A — fr */
    .demo-fr.grid { display:grid; grid-template-columns:1fr 2fr; gap:12px; }

    /* B — fixe + fr + gap */
    .demo-fixed-fr-gap.grid { display:grid; grid-template-columns:150px 1fr 1fr; gap:20px; width:min(900px, 100%); margin-inline:auto; }
    .demo-fixed-fr-gap .box { background:#e9f1dd; border-color:#d3e2bd; }

    /* C — gap une ou deux valeurs */
    .demo-gap.grid { display:grid; grid-template-columns:repeat(3, 1fr); }
    .demo-gap.same { gap:16px; }
    .demo-gap.diff { gap:8px 24px; }
    .demo-gap .box { background:#ffe9d6; border-color:#ffcf9e; }

    /* D — minmax */
    .demo-minmax.grid { display:grid; grid-template-columns:repeat(3, minmax(150px, 1fr)); gap:12px; }
    .demo-minmax .box { background:#f1ddf0; border-color:#e0c1df; }

    /* E — fit-content */
    .demo-fit.grid { display:grid; grid-template-columns:fit-content(300px) 1fr; gap:12px; }
    .demo-fit .box { background:#e6f7ff; border-color:#bfe7ff; }
    .nowrap { white-space:nowrap; }

    /* F — min/max-content */
    .demo-minmaxcontent.grid { display:grid; grid-template-columns:min-content 1fr max-content; gap:12px; }
    .demo-minmaxcontent .box { background:#fff3f3; border-color:#ffd1d1; }

    /* G — grid-template-areas */
    .demo-areas.grid { display:grid; grid-template-columns:1fr 3fr 1fr; grid-template-rows:auto 1fr auto; gap:12px;
      grid-template-areas:"header header header" "nav main aside" "footer footer footer"; }
    .demo-areas header{ grid-area:header; background:#dff7e8; border:1px solid #b7e7c8; padding:var(--pad); }
    .demo-areas nav   { grid-area:nav;    background:#e8e8ff; border:1px solid #cacaFF; padding:var(--pad); }
    .demo-areas main  { grid-area:main;   background:#fffbe6; border:1px solid #f2e2a2; padding:var(--pad); }
    .demo-areas aside { grid-area:aside;  background:#fdeef6; border:1px solid #f3c0dc; padding:var(--pad); }
    .demo-areas footer{ grid-area:footer; background:#e6f2ff; border:1px solid #bfd8ff; padding:var(--pad); }

    /* H — auto-fit vs auto-fill */
    .wrap { display:flex; gap:16px; flex-wrap:wrap; }
    .gallery { display:grid; gap:12px; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); flex:1 1 320px; border:1px solid var(--bd); padding:var(--pad); background:#fff; }
    .gallery.fill { grid-template-columns:repeat(auto-fill, minmax(140px, 1fr)); }
    .card { background:#f4f4f4; height:80px; border:1px dashed #ccc; display:flex; align-items:center; justify-content:center; }
    @media (max-width:640px){ nav a{ font-size:12px; padding:5px 8px; } }
  </style>
</head>
<body>
  <header>
    <h1>CSS Grid — Playgrounds réunis</h1>
    <nav>
      <a href="#demo-fr">A — fr</a>
      <a href="#demo-fixed-fr-gap">B — fixe + fr + gap</a>
      <a href="#demo-gap">C — gap</a>
      <a href="#demo-minmax">D — minmax</a>
      <a href="#demo-fit">E — fit-content</a>
      <a href="#demo-minmaxcontent">F — min/max-content</a>
      <a href="#demo-areas">G — template-areas</a>
      <a href="#demo-autofitfill">H — auto-fit vs auto-fill</a>
    </nav>
  </header>
  <main>
    <section id="demo-fr">
      <h2>A — Répartition avec <code>fr</code></h2>
      <div class="grid demo-fr">
        <div class="box">1fr</div>
        <div class="box">2fr (≈ 2× la 1ʳᵉ)</div>
      </div>
      <p class="hint">Astuce : redimensionnez la fenêtre pour observer la répartition de l’espace restant.</p>
    </section>

    <section id="demo-fixed-fr-gap">
      <h2>B — Mix fixe + <code>fr</code> + <code>gap</code></h2>
      <div class="grid demo-fixed-fr-gap">
        <div class="box">150px fixe</div>
        <div class="box">1fr</div>
        <div class="box">1fr</div>
      </div>
    </section>

    <section id="demo-gap">
      <h2>C — <code>gap</code> (une ou deux valeurs)</h2>
      <h3>Le même <code>gap</code> sur les deux axes</h3>
      <div class="grid demo-gap same">
        <div class="box">A</div><div class="box">B</div><div class="box">C</div>
      </div>
      <h3>Lignes ≠ Colonnes via le raccourci</h3>
      <div class="grid demo-gap diff">
        <div class="box">A</div><div class="box">B</div><div class="box">C</div>
      </div>
    </section>

    <section id="demo-minmax">
      <h2>D — <code>minmax(150px, 1fr)</code></h2>
      <div class="grid demo-minmax">
        <div class="box">min 150px / max 1fr</div>
        <div class="box">min 150px / max 1fr</div>
        <div class="box">min 150px / max 1fr</div>
      </div>
    </section>

    <section id="demo-fit">
      <h2>E — <code>fit-content(max)</code></h2>
      <div class="grid demo-fit">
        <div class="box nowrap">Texte trèèès long qui ne doit pas dépasser 300px…</div>
        <div class="box">Colonne fluide</div>
      </div>
    </section>

    <section id="demo-minmaxcontent">
      <h2>F — <code>min-content</code> vs <code>max-content</code></h2>
      <div class="grid demo-minmaxcontent">
        <div class="box nowrap">UnMotTrèsTrèsLongSansCoupure</div>
        <div class="box">Colonne centrale fluide</div>
        <div class="box nowrap">UnMotTrèsTrèsLongSansCoupure</div>
      </div>
    </section>

    <section id="demo-areas">
      <h2>G — <code>grid-template-areas</code> (layout simple)</h2>
      <div class="grid demo-areas">
        <header>En‑tête</header>
        <nav>Navigation</nav>
        <main>Contenu principal</main>
        <aside>Aside</aside>
        <footer>Pied de page</footer>
      </div>
    </section>

    <section id="demo-autofitfill">
      <h2>H — <code>auto-fit</code> vs <code>auto-fill</code> (galerie responsive)</h2>
      <div class="wrap">
        <section class="gallery fit">
          <div class="card">auto-fit 1</div>
          <div class="card">auto-fit 2</div>
          <div class="card">auto-fit 3</div>
          <div class="card">auto-fit 4</div>
        </section>
        <section class="gallery fill">
          <div class="card">auto-fill 1</div>
          <div class="card">auto-fill 2</div>
          <div class="card">auto-fill 3</div>
          <div class="card">auto-fill 4</div>
        </section>
      </div>
    </section>
  </main>
</body>
</html>
```

